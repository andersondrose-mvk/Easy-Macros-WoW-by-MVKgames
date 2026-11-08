local ADDON_NAME, FMC = ...

local function copyDefaults(source, destination)
    for key, value in pairs(source) do
        if type(value) == "table" then
            destination[key] = type(destination[key]) == "table" and destination[key] or {}
            copyDefaults(value, destination[key])
        elseif destination[key] == nil then
            destination[key] = value
        end
    end
end

function FMC:InitializeDatabase()
    ForeverMacroCreatorDB = type(ForeverMacroCreatorDB) == "table" and ForeverMacroCreatorDB or {}
    copyDefaults(self.DEFAULTS, ForeverMacroCreatorDB)
    self.db = ForeverMacroCreatorDB
end

function FMC:Print(message)
    DEFAULT_CHAT_FRAME:AddMessage("|cff2eaaeBForever Macro Creator:|r " .. tostring(message))
end

function FMC:CreateBackdrop(frame, fill, border)
    frame:SetBackdrop({
        bgFile = "Interface\\Buttons\\WHITE8x8",
        edgeFile = "Interface\\Buttons\\WHITE8x8",
        edgeSize = 1,
    })
    frame:SetBackdropColor(unpack(fill))
    frame:SetBackdropBorderColor(unpack(border))
end

function FMC:CreateLabel(parent, size, color, justify)
    local label = parent:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    label:SetFont(STANDARD_TEXT_FONT, size or 11, "")
    label:SetTextColor(unpack(color or self.COLORS.text))
    label:SetJustifyH(justify or "LEFT")
    label:SetJustifyV("MIDDLE")
    return label
end

function FMC:GetSpellName(spellID, fallback)
    if C_Spell and C_Spell.GetSpellName then
        local ok, name = pcall(C_Spell.GetSpellName, spellID)
        if ok and name then return name end
    end
    if GetSpellInfo then
        local ok, name = pcall(GetSpellInfo, spellID)
        if ok and name then return name end
    end
    return fallback
end

function FMC:GetSpellIcon(spellID)
    if C_Spell and C_Spell.GetSpellTexture then
        local ok, icon = pcall(C_Spell.GetSpellTexture, spellID)
        if ok and icon then return icon end
    end
    if GetSpellTexture then
        local ok, icon = pcall(GetSpellTexture, spellID)
        if ok and icon then return icon end
    end
    if GetSpellInfo then
        local ok, _, _, icon = pcall(GetSpellInfo, spellID)
        if ok and icon then return icon end
    end
    return "Interface\\Icons\\INV_Misc_QuestionMark"
end

function FMC:GetItemIcon(itemID)
    if C_Item and C_Item.GetItemIconByID then
        local ok, icon = pcall(C_Item.GetItemIconByID, itemID)
        if ok and icon then return icon end
    end
    if GetItemIcon then
        local ok, icon = pcall(GetItemIcon, itemID)
        if ok and icon then return icon end
    end
    return "Interface\\Icons\\INV_Potion_54"
end

function FMC:LoadMacroUI()
    if MacroFrame then return true end
    if C_AddOns and C_AddOns.LoadAddOn then pcall(C_AddOns.LoadAddOn, "Blizzard_MacroUI")
    elseif UIParentLoadAddOn then pcall(UIParentLoadAddOn, "Blizzard_MacroUI")
    elseif LoadAddOn then pcall(LoadAddOn, "Blizzard_MacroUI") end
    return MacroFrame ~= nil
end

function FMC:GetMacroEditBox()
    if MacroFrameText then return MacroFrameText end
    if MacroFrame and MacroFrame.MacroText then return MacroFrame.MacroText end
    if MacroFrame and MacroFrame.Text then return MacroFrame.Text end
    return nil
end

function FMC:OpenMacroWindow()
    if not self:LoadMacroUI() then
        self:Print("Blizzard's Macro window could not be loaded.")
        return false
    end
    if MacroFrame_Show then pcall(MacroFrame_Show)
    elseif ShowMacroFrame then pcall(ShowMacroFrame)
    elseif ShowUIPanel then pcall(ShowUIPanel, MacroFrame)
    else MacroFrame:Show() end
    if not MacroFrame:IsShown() then MacroFrame:Show() end
    return true
end

function FMC:InsertIntoBlizzard(code)
    if InCombatLockdown and InCombatLockdown() then
        self:Print("Macro text cannot be changed during combat.")
        return false
    end
    if not self:OpenMacroWindow() then return false end
    local editBox = self:GetMacroEditBox()
    if MacroFrame and (not MacroFrame.selectedMacro or MacroFrame.selectedMacro == 0) then
        self:Print("Create or select a Blizzard macro first, then try again.")
        return false
    end
    if not editBox then
        self:Print("Select or create a Blizzard macro first, then try again.")
        return false
    end
    if editBox:IsShown() == false then
        self:Print("Select or create a Blizzard macro first, then try again.")
        return false
    end
    editBox:SetText(code or "")
    editBox:SetFocus()
    editBox:SetCursorPosition(string.len(code or ""))
    self:Print("Macro code inserted into Blizzard's editor.")
    return true
end

function FMC:SelectPreviewText()
    if not self.codeBox then return end
    self.codeBox:SetFocus()
    self.codeBox:HighlightText(0, -1)
    self:Print("Press Ctrl+C to copy the selected code.")
end

function FMC:InferCategory(name)
    local text = string.lower(name or "")
    if text:find("heal") or text:find("renew") or text:find("rejuven") or text:find("regrowth") or text:find("mend") then return "HEALING" end
    if text:find("shield") or text:find("armor") or text:find("protection") or text:find("block") or text:find("ward") then return "DEFENSIVE" end
    if text:find("shot") or text:find("bolt") or text:find("missile") or text:find("blast") or text:find("fireball") then return "RANGED" end
    if text:find("totem") then return "TOTEMS" end
    if text:find("form") or text:find("shape") then return "FORMS" end
    if text:find("pet") or text:find("demon") or text:find("voidwalker") or text:find("imp") then return "PET" end
    if text:find("stun") or text:find("fear") or text:find("root") or text:find("sleep") or text:find("polymorph") then return "CONTROL" end
    return "LEARNED"
end

function FMC:ScanLearnedSpells(classToken)
    local _, playerClass = UnitClass("player")
    if classToken ~= playerClass then return {} end
    local learned, seen = {}, {}
    local bank = Enum and Enum.SpellBookSpellBank and Enum.SpellBookSpellBank.Player
    for index = 1, 500 do
        local name, spellID, icon
        if C_SpellBook and C_SpellBook.GetSpellBookItemName and bank then
            local ok, value = pcall(C_SpellBook.GetSpellBookItemName, index, bank)
            if ok then name = value end
            if name and C_SpellBook.GetSpellBookItemInfo then
                local ok, info = pcall(C_SpellBook.GetSpellBookItemInfo, index, bank)
                if ok and info then spellID = info.spellID or info.actionID end
            end
        elseif GetSpellBookItemName then
            local ok, value = pcall(GetSpellBookItemName, index, BOOKTYPE_SPELL or "spell")
            if ok then name = value end
            if name and GetSpellBookItemInfo then
                local okInfo, _, id = pcall(GetSpellBookItemInfo, index, BOOKTYPE_SPELL or "spell")
                if okInfo then spellID = id end
            end
        end
        if not name then break end
        local key = string.lower(name)
        if not seen[key] then
            seen[key] = true
            icon = spellID and self:GetSpellIcon(spellID) or nil
            learned[#learned + 1] = {
                title = name,
                class = classToken,
                category = self:InferCategory(name),
                icon = icon,
                spellID = spellID,
                description = "Automatically discovered from your spellbook.",
                code = "#showtooltip\n/cast " .. name,
                discovered = true,
            }
        end
    end
    return learned
end
