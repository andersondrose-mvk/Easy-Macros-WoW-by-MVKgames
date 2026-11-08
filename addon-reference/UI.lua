local ADDON_NAME, FMC = ...

local PANEL_WIDTH = 650
local PANEL_HEIGHT = 530
local RESULT_ROWS = 5
local RESULT_ROW_HEIGHT = 48

local function setColor(texture, color, alpha)
    texture:SetColorTexture(color[1], color[2], color[3], alpha or color[4] or 1)
end

function FMC:CreateButton(parent, text, width, height, onClick)
    local button = CreateFrame("Button", nil, parent, "BackdropTemplate")
    button:SetSize(width, height)
    self:CreateBackdrop(button, self.COLORS.raised, self.COLORS.border)
    button.label = self:CreateLabel(button, 10, self.COLORS.text, "CENTER")
    button.label:SetPoint("CENTER")
    button.label:SetText(text)
    button:SetScript("OnEnter", function(selfButton)
        selfButton:SetBackdropColor(unpack(FMC.COLORS.hover))
        selfButton:SetBackdropBorderColor(unpack(FMC.COLORS.accent))
    end)
    button:SetScript("OnLeave", function(selfButton)
        selfButton:SetBackdropColor(unpack(FMC.COLORS.raised))
        selfButton:SetBackdropBorderColor(unpack(selfButton.selected and FMC.COLORS.accent or FMC.COLORS.border))
    end)
    if onClick then button:SetScript("OnClick", onClick) end
    return button
end

function FMC:CreatePanel(parent)
    local panel = CreateFrame("Frame", nil, parent, "BackdropTemplate")
    self:CreateBackdrop(panel, self.COLORS.panel, self.COLORS.border)
    return panel
end

function FMC:CreateWindow()
    if self.frame then return self.frame end
    local frame = CreateFrame("Frame", "ForeverMacroCreatorFrame", UIParent, "BackdropTemplate")
    frame:SetSize(PANEL_WIDTH, PANEL_HEIGHT)
    frame:SetFrameStrata("DIALOG")
    frame:SetClampedToScreen(true)
    frame:SetScale(self.db.scale or 1)
    frame:SetAlpha(self.db.alpha or 1)
    self:CreateBackdrop(frame, self.COLORS.background, self.COLORS.border)
    frame:Hide()
    self.frame = frame

    local shadow = frame:CreateTexture(nil, "BACKGROUND", nil, -8)
    shadow:SetPoint("TOPLEFT", -8, 8)
    shadow:SetPoint("BOTTOMRIGHT", 8, -8)
    shadow:SetColorTexture(0, 0, 0, 0.38)

    local header = self:CreatePanel(frame)
    header:SetPoint("TOPLEFT", 1, -1)
    header:SetPoint("TOPRIGHT", -1, -1)
    header:SetHeight(37)
    local headerIcon = header:CreateTexture(nil, "ARTWORK")
    headerIcon:SetTexture("Interface\\Icons\\INV_Misc_Note_01")
    headerIcon:SetSize(25, 25)
    headerIcon:SetPoint("LEFT", 8, 0)
    headerIcon:SetTexCoord(0.07, 0.93, 0.07, 0.93)
    local title = self:CreateLabel(header, 13, self.COLORS.text)
    title:SetPoint("LEFT", headerIcon, "RIGHT", 8, 4)
    title:SetText("FOREVER MACRO CREATOR")
    local subtitle = self:CreateLabel(header, 9, self.COLORS.muted)
    subtitle:SetPoint("LEFT", headerIcon, "RIGHT", 8, -9)
    subtitle:SetText("SEARCH • SELECT • INSERT")

    local autoButton = self:CreateButton(header, "AUTO: ON", 66, 25, function()
        FMC.db.autoOpen = not FMC.db.autoOpen
        FMC:UpdateAutoButton()
    end)
    autoButton:SetPoint("RIGHT", -39, 0)
    self.autoButton = autoButton
    local close = self:CreateButton(header, "×", 27, 25, function() FMC:HideWindow() end)
    close:SetPoint("RIGHT", -6, 0)
    close.label:SetFont(STANDARD_TEXT_FONT, 16, "")

    local searchPanel = self:CreatePanel(frame)
    searchPanel:SetPoint("TOPLEFT", 8, -45)
    searchPanel:SetPoint("TOPRIGHT", -8, -45)
    searchPanel:SetHeight(30)
    local searchIcon = searchPanel:CreateTexture(nil, "ARTWORK")
    searchIcon:SetTexture("Interface\\Common\\UI-Searchbox-Icon")
    searchIcon:SetSize(15, 15)
    searchIcon:SetPoint("LEFT", 8, 0)
    local search = CreateFrame("EditBox", nil, searchPanel)
    search:SetPoint("LEFT", searchIcon, "RIGHT", 7, 0)
    search:SetPoint("RIGHT", -58, 0)
    search:SetHeight(24)
    search:SetAutoFocus(false)
    search:SetFont(STANDARD_TEXT_FONT, 11, "")
    search:SetTextColor(unpack(self.COLORS.text))
    search:SetText(self.db.search or "")
    search:SetScript("OnEscapePressed", function(selfEdit) selfEdit:ClearFocus() end)
    search:SetScript("OnEnterPressed", function(selfEdit) selfEdit:ClearFocus() end)
    search:SetScript("OnTextChanged", function(selfEdit, userInput)
        if not userInput then return end
        FMC.db.search = selfEdit:GetText() or ""
        FMC.resultOffset = 0
        FMC:RefreshResults()
    end)
    self.searchBox = search
    local clearSearch = self:CreateButton(searchPanel, "CLEAR", 48, 22, function()
        search:SetText("")
        search:SetFocus()
    end)
    clearSearch:SetPoint("RIGHT", -3, 0)

    local classPanel = self:CreatePanel(frame)
    classPanel:SetPoint("TOPLEFT", 8, -82)
    classPanel:SetPoint("BOTTOMLEFT", 8, 8)
    classPanel:SetWidth(108)
    local classHeading = self:CreateLabel(classPanel, 9, self.COLORS.muted)
    classHeading:SetPoint("TOPLEFT", 8, -8)
    classHeading:SetText("CLASSES")
    self.classButtons = {}
    for index, classToken in ipairs(self.CLASS_ORDER) do
        local button = self:CreateButton(classPanel, string.upper(self.CLASS_NAMES[classToken]), 94, 30, function()
            FMC:SetSelectedClass(classToken)
        end)
        button:SetPoint("TOPLEFT", 7, -23 - ((index - 1) * 34))
        button.classToken = classToken
        local color = self.CLASS_COLORS[classToken]
        button.label:SetTextColor(color[1], color[2], color[3])
        button.accent = button:CreateTexture(nil, "ARTWORK")
        button.accent:SetPoint("TOPLEFT", 1, -1)
        button.accent:SetPoint("BOTTOMLEFT", 1, 1)
        button.accent:SetWidth(3)
        setColor(button.accent, color)
        self.classButtons[index] = button
    end

    local categoryPanel = self:CreatePanel(frame)
    categoryPanel:SetPoint("TOPLEFT", classPanel, "TOPRIGHT", 6, 0)
    categoryPanel:SetPoint("BOTTOMLEFT", classPanel, "BOTTOMRIGHT", 6, 0)
    categoryPanel:SetWidth(137)
    local categoryHeading = self:CreateLabel(categoryPanel, 9, self.COLORS.muted)
    categoryHeading:SetPoint("TOPLEFT", 8, -8)
    categoryHeading:SetText("CATEGORIES")
    self.categoryButtons = {}
    for index = 1, 14 do
        local button = self:CreateButton(categoryPanel, "", 123, 25, function(selfButton)
            if selfButton.category then FMC:SetSelectedCategory(selfButton.category) end
        end)
        button:SetPoint("TOPLEFT", 7, -23 - ((index - 1) * 28))
        button.label:ClearAllPoints()
        button.label:SetPoint("LEFT", 9, 0)
        button.label:SetPoint("RIGHT", -5, 0)
        button.label:SetJustifyH("LEFT")
        button.accent = button:CreateTexture(nil, "ARTWORK")
        button.accent:SetPoint("TOPLEFT", 1, -1)
        button.accent:SetPoint("BOTTOMLEFT", 1, 1)
        button.accent:SetWidth(3)
        self.categoryButtons[index] = button
    end

    local resultPanel = self:CreatePanel(frame)
    resultPanel:SetPoint("TOPLEFT", categoryPanel, "TOPRIGHT", 6, 0)
    resultPanel:SetPoint("BOTTOMRIGHT", -8, 8)
    self.resultPanel = resultPanel
    local resultHeading = self:CreateLabel(resultPanel, 9, self.COLORS.muted)
    resultHeading:SetPoint("TOPLEFT", 8, -8)
    resultHeading:SetText("MACRO LIBRARY")
    self.resultHeading = resultHeading
    local resultCount = self:CreateLabel(resultPanel, 9, self.COLORS.muted, "RIGHT")
    resultCount:SetPoint("TOPRIGHT", -8, -8)
    self.resultCount = resultCount

    local listArea = CreateFrame("Frame", nil, resultPanel)
    listArea:SetPoint("TOPLEFT", 7, -24)
    listArea:SetPoint("TOPRIGHT", -7, -24)
    listArea:SetHeight(RESULT_ROWS * RESULT_ROW_HEIGHT)
    listArea:EnableMouseWheel(true)
    listArea:SetScript("OnMouseWheel", function(_, delta)
        FMC:ScrollResults(delta < 0 and 1 or -1)
    end)
    self.resultRows = {}
    for index = 1, RESULT_ROWS do
        local row = CreateFrame("Button", nil, listArea, "BackdropTemplate")
        row:SetPoint("TOPLEFT", 0, -((index - 1) * RESULT_ROW_HEIGHT))
        row:SetPoint("TOPRIGHT", 0, -((index - 1) * RESULT_ROW_HEIGHT))
        row:SetHeight(44)
        self:CreateBackdrop(row, self.COLORS.raised, self.COLORS.border)
        row.accent = row:CreateTexture(nil, "ARTWORK")
        row.accent:SetPoint("TOPLEFT", 1, -1)
        row.accent:SetPoint("BOTTOMLEFT", 1, 1)
        row.accent:SetWidth(4)
        row.icon = row:CreateTexture(nil, "ARTWORK")
        row.icon:SetSize(32, 32)
        row.icon:SetPoint("LEFT", 8, 0)
        row.icon:SetTexCoord(0.07, 0.93, 0.07, 0.93)
        row.title = self:CreateLabel(row, 11, self.COLORS.text)
        row.title:SetPoint("TOPLEFT", row.icon, "TOPRIGHT", 8, -3)
        row.title:SetPoint("RIGHT", -7, 0)
        row.meta = self:CreateLabel(row, 9, self.COLORS.muted)
        row.meta:SetPoint("BOTTOMLEFT", row.icon, "BOTTOMRIGHT", 8, 3)
        row.meta:SetPoint("RIGHT", -7, 0)
        row:SetScript("OnClick", function(selfRow)
            if selfRow.entry then FMC:SelectEntry(selfRow.entry) end
        end)
        row:SetScript("OnEnter", function(selfRow)
            selfRow:SetBackdropColor(unpack(FMC.COLORS.hover))
            if selfRow.entry then
                GameTooltip:SetOwner(selfRow, "ANCHOR_RIGHT")
                GameTooltip:SetText(selfRow.entry.title, unpack(FMC.COLORS.text))
                GameTooltip:AddLine(selfRow.entry.description or "", 0.72, 0.76, 0.84, true)
                GameTooltip:AddLine("Click to preview this macro.", 0.25, 0.86, 0.46)
                GameTooltip:Show()
            end
        end)
        row:SetScript("OnLeave", function(selfRow)
            selfRow:SetBackdropColor(unpack(FMC.COLORS.raised))
            GameTooltip:Hide()
        end)
        self.resultRows[index] = row
    end

    local up = self:CreateButton(resultPanel, "▲", 24, 22, function() FMC:ScrollResults(-1) end)
    up:SetPoint("TOPRIGHT", -7, -265)
    local down = self:CreateButton(resultPanel, "▼", 24, 22, function() FMC:ScrollResults(1) end)
    down:SetPoint("TOPRIGHT", -7, -290)

    local detail = self:CreatePanel(resultPanel)
    detail:SetPoint("TOPLEFT", 7, -265)
    detail:SetPoint("BOTTOMRIGHT", -37, 7)
    self.detailPanel = detail
    local selectedTitle = self:CreateLabel(detail, 11, self.COLORS.text)
    selectedTitle:SetPoint("TOPLEFT", 8, -7)
    selectedTitle:SetPoint("RIGHT", -70, 0)
    selectedTitle:SetText("Select a macro")
    self.selectedTitle = selectedTitle
    local charCount = self:CreateLabel(detail, 9, self.COLORS.muted, "RIGHT")
    charCount:SetPoint("TOPRIGHT", -8, -8)
    charCount:SetText("0 / 255")
    self.charCount = charCount

    local codeBackground = self:CreatePanel(detail)
    codeBackground:SetPoint("TOPLEFT", 7, -25)
    codeBackground:SetPoint("TOPRIGHT", -7, -25)
    codeBackground:SetHeight(72)
    if codeBackground.SetClipsChildren then codeBackground:SetClipsChildren(true) end
    local codeBox = CreateFrame("EditBox", nil, codeBackground)
    codeBox:SetMultiLine(true)
    codeBox:SetAutoFocus(false)
    codeBox:SetMaxLetters(self.MACRO_LIMIT)
    codeBox:SetFont("Fonts\\ARIALN.TTF", 11, "")
    codeBox:SetTextColor(unpack(self.COLORS.text))
    codeBox:SetPoint("TOPLEFT", 7, -5)
    codeBox:SetPoint("BOTTOMRIGHT", -7, 5)
    codeBox:SetScript("OnEscapePressed", function(selfEdit) selfEdit:ClearFocus() end)
    codeBox:SetScript("OnTextChanged", function(selfEdit)
        local count = string.len(selfEdit:GetText() or "")
        FMC.charCount:SetText(string.format("%d / %d", count, FMC.MACRO_LIMIT))
        local color = count >= FMC.MACRO_LIMIT and FMC.COLORS.danger or FMC.COLORS.muted
        FMC.charCount:SetTextColor(color[1], color[2], color[3])
    end)
    self.codeBox = codeBox

    local selectCode = self:CreateButton(detail, "SELECT CODE", 91, 25, function() FMC:SelectPreviewText() end)
    selectCode:SetPoint("BOTTOMLEFT", 7, 7)
    local insert = self:CreateButton(detail, "INSERT INTO BLIZZARD", 142, 25, function()
        FMC:InsertIntoBlizzard(FMC.codeBox:GetText() or "")
    end)
    insert:SetPoint("BOTTOMRIGHT", -7, 7)
    insert:SetBackdropBorderColor(unpack(self.COLORS.accent))

    frame:SetScript("OnShow", function()
        FMC.db.shown = true
        FMC:AnchorToMacroFrame()
        FMC:RefreshAll()
    end)
    frame:SetScript("OnHide", function() FMC.db.shown = false end)
    self:UpdateAutoButton()
    self:RefreshAll()
    return frame
end

function FMC:AnchorToMacroFrame()
    if not self.frame then return end
    self.frame:ClearAllPoints()
    if MacroFrame and MacroFrame:IsShown() then
        local macroRight = MacroFrame:GetRight()
        local uiRight = UIParent:GetRight() or (GetScreenWidth and GetScreenWidth()) or PANEL_WIDTH
        local availableRight = macroRight and (uiRight - macroRight) or 0
        if self.db.anchorSide == "LEFT" or (self.db.anchorSide == "AUTO" and availableRight < PANEL_WIDTH + 12) then
            self.frame:SetPoint("TOPRIGHT", MacroFrame, "TOPLEFT", -8, 0)
        else
            self.frame:SetPoint("TOPLEFT", MacroFrame, "TOPRIGHT", 8, 0)
        end
    else
        self.frame:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
    end
end

function FMC:ShowWindow(openBlizzard)
    self:CreateWindow()
    if openBlizzard then self:OpenMacroWindow() end
    self:AnchorToMacroFrame()
    self.frame:Show()
end

function FMC:HideWindow()
    if self.frame then self.frame:Hide() end
end

function FMC:ToggleWindow()
    self:CreateWindow()
    if self.frame:IsShown() then self:HideWindow() else self:ShowWindow(true) end
end

function FMC:UpdateAutoButton()
    if not self.autoButton then return end
    self.autoButton.label:SetText(self.db.autoOpen and "AUTO: ON" or "AUTO: OFF")
    local color = self.db.autoOpen and self.COLORS.good or self.COLORS.muted
    self.autoButton.label:SetTextColor(color[1], color[2], color[3])
end

function FMC:SetSelectedClass(classToken)
    self.db.selectedClass = classToken
    self.db.selectedCategory = "ALL"
    self.resultOffset = 0
    self:RefreshAll()
end

function FMC:SetSelectedCategory(category)
    self.db.selectedCategory = category
    self.resultOffset = 0
    self:RefreshCategories()
    self:RefreshResults()
end

function FMC:RefreshClasses()
    for _, button in ipairs(self.classButtons or {}) do
        button.selected = button.classToken == self.db.selectedClass
        button:SetBackdropBorderColor(unpack(button.selected and self.COLORS.accent or self.COLORS.border))
    end
end

function FMC:RefreshCategories()
    local categories = self:GetCategories(self.db.selectedClass)
    local valid = false
    for _, category in ipairs(categories) do if category == self.db.selectedCategory then valid = true end end
    if not valid then self.db.selectedCategory = "ALL" end
    for index, button in ipairs(self.categoryButtons or {}) do
        local category = categories[index]
        if category then
            local color = self.CATEGORY_COLORS[category] or self.COLORS.accent
            button.category = category
            button.label:SetText(self.CATEGORY_NAMES[category] or category)
            button.label:SetTextColor(color[1], color[2], color[3])
            setColor(button.accent, color)
            button.selected = category == self.db.selectedCategory
            button:SetBackdropBorderColor(unpack(button.selected and self.COLORS.accent or self.COLORS.border))
            button:Show()
        else
            button.category = nil
            button:Hide()
        end
    end
end

function FMC:RefreshResults()
    if not self.resultRows then return end
    self.filteredEntries = self:GetEntries(self.db.selectedClass, self.db.selectedCategory, self.db.search)
    local maxOffset = math.max(0, #self.filteredEntries - RESULT_ROWS)
    self.resultOffset = math.max(0, math.min(self.resultOffset or 0, maxOffset))
    self.resultCount:SetText(tostring(#self.filteredEntries) .. " FOUND")
    for index, row in ipairs(self.resultRows) do
        local entry = self.filteredEntries[self.resultOffset + index]
        if entry then
            local color = self.CATEGORY_COLORS[entry.category] or self.COLORS.accent
            local classColor = self.CLASS_COLORS[entry.class] or self.COLORS.text
            row.entry = entry
            row.icon:SetTexture(entry.icon or "Interface\\Icons\\INV_Misc_QuestionMark")
            row.title:SetText(entry.title)
            row.title:SetTextColor(classColor[1], classColor[2], classColor[3])
            row.meta:SetText((self.CLASS_NAMES[entry.class] or entry.class) .. "  •  " .. (self.CATEGORY_NAMES[entry.category] or entry.category))
            setColor(row.accent, color)
            row:SetBackdropBorderColor(unpack(self.selectedEntry == entry and self.COLORS.accent or self.COLORS.border))
            row:Show()
        else
            row.entry = nil
            row:Hide()
        end
    end
end

function FMC:ScrollResults(direction)
    local maxOffset = math.max(0, #(self.filteredEntries or {}) - RESULT_ROWS)
    self.resultOffset = math.max(0, math.min((self.resultOffset or 0) + direction, maxOffset))
    self:RefreshResults()
end

function FMC:SelectEntry(entry)
    self.selectedEntry = entry
    self.selectedTitle:SetText(entry.title or "Selected Macro")
    local color = self.CATEGORY_COLORS[entry.category] or self.COLORS.accent
    self.selectedTitle:SetTextColor(color[1], color[2], color[3])
    self.codeBox:SetText(entry.code or "")
    self.codeBox:SetCursorPosition(0)
    self:RefreshResults()
end

function FMC:RefreshAll()
    if not self.frame then return end
    self:RefreshClasses()
    self:RefreshCategories()
    self:RefreshResults()
    self:UpdateAutoButton()
end
