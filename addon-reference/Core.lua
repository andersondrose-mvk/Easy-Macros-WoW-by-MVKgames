local ADDON_NAME, FMC = ...

function FMC:SetupMacroFrameHooks()
    if self.macroHooksInstalled or not MacroFrame then return end
    self.macroHooksInstalled = true
    MacroFrame:HookScript("OnShow", function()
        if FMC.db and FMC.db.autoOpen then
            C_Timer.After(0, function()
                FMC:ShowWindow(false)
            end)
        elseif FMC.frame and FMC.frame:IsShown() then
            FMC:AnchorToMacroFrame()
        end
    end)
    MacroFrame:HookScript("OnHide", function()
        if FMC.frame and FMC.frame:IsShown() then FMC:HideWindow() end
    end)
    if MacroFrame:IsShown() and self.db.autoOpen then self:ShowWindow(false) end
end

function FMC:HandleSlash(message)
    local command, value = string.match(string.lower(message or ""), "^(%S*)%s*(.-)$")
    if command == "" or command == "toggle" then
        self:ToggleWindow()
    elseif command == "show" then
        self:ShowWindow(true)
    elseif command == "hide" then
        self:HideWindow()
    elseif command == "auto" then
        self.db.autoOpen = not self.db.autoOpen
        self:UpdateAutoButton()
        self:Print("Automatic side-panel opening is now " .. (self.db.autoOpen and "enabled." or "disabled."))
    elseif command == "left" or command == "right" or command == "auto-side" then
        self.db.anchorSide = command == "auto-side" and "AUTO" or string.upper(command)
        self:AnchorToMacroFrame()
        self:Print("Panel side set to " .. self.db.anchorSide .. ".")
    elseif command == "scale" then
        local scale = tonumber(value)
        if not scale or scale < 0.70 or scale > 1.30 then
            self:Print("Use /fmc scale 0.70-1.30")
            return
        end
        self.db.scale = scale
        if self.frame then self.frame:SetScale(scale) self:AnchorToMacroFrame() end
    elseif command == "reset" then
        self.db.search = ""
        self.db.selectedCategory = "ALL"
        self.db.anchorSide = "AUTO"
        self.db.scale = 1
        if self.searchBox then self.searchBox:SetText("") end
        if self.frame then self.frame:SetScale(1) end
        self:AnchorToMacroFrame()
        self:RefreshAll()
        self:Print("Window settings reset.")
    else
        self:Print("/fmc show | hide | toggle | auto | left | right | auto-side | scale 0.70-1.30 | reset")
    end
end

local events = CreateFrame("Frame")
events:RegisterEvent("ADDON_LOADED")
events:RegisterEvent("PLAYER_LOGIN")
events:RegisterEvent("SPELLS_CHANGED")
events:SetScript("OnEvent", function(_, event, arg1)
    if event == "ADDON_LOADED" then
        if arg1 == ADDON_NAME then
            FMC:InitializeDatabase()
            local _, playerClass = UnitClass("player")
            if not FMC.CLASS_NAMES[FMC.db.selectedClass] then
                FMC.db.selectedClass = FMC.CLASS_NAMES[playerClass] and playerClass or "WARRIOR"
            end
            FMC:BuildLibrary()
            FMC:CreateWindow()
            SLASH_FOREVERMACROCREATOR1 = "/fmc"
            SLASH_FOREVERMACROCREATOR2 = "/forevermacro"
            SlashCmdList.FOREVERMACROCREATOR = function(message) FMC:HandleSlash(message) end
        elseif arg1 == "Blizzard_MacroUI" and FMC.db then
            FMC:SetupMacroFrameHooks()
        end
    elseif event == "PLAYER_LOGIN" then
        FMC:LoadMacroUI()
        FMC:SetupMacroFrameHooks()
    elseif event == "SPELLS_CHANGED" and FMC.db then
        FMC:BuildLibrary()
        if FMC.frame and FMC.frame:IsShown() then FMC:RefreshAll() end
    end
end)

function ForeverMacroCreator_OnAddonCompartmentClick()
    if FMC and FMC.ToggleWindow then FMC:ToggleWindow() end
end

function ForeverMacroCreator_OnAddonCompartmentEnter(button)
    if not FMC then return end
    GameTooltip:SetOwner(button, "ANCHOR_LEFT")
    GameTooltip:SetText(FMC.DISPLAY_NAME, 0.18, 0.66, 0.92)
    GameTooltip:AddLine("Open the Blizzard Macro window and searchable macro library.", 0.82, 0.85, 0.90, true)
    GameTooltip:AddLine("Click to toggle", 0.25, 0.86, 0.46)
    GameTooltip:Show()
end

function ForeverMacroCreator_OnAddonCompartmentLeave()
    GameTooltip:Hide()
end
