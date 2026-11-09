local ADDON_NAME, FMC = ...

local abilities = {}
local specials = {}
local consumables = {}

local function addAbility(classToken, category, spellID, title, style, description)
    abilities[#abilities + 1] = {
        class = classToken, category = category, spellID = spellID, title = title,
        style = style or "cast", description = description or "Standard ability macro.",
    }
end

local function addSpecial(classToken, category, spellID, title, code, description)
    specials[#specials + 1] = {
        class = classToken, category = category, spellID = spellID, title = title,
        code = code, description = description,
    }
end

local function addConsumable(category, itemID, title, description)
    consumables[#consumables + 1] = {
        class = "CONSUMABLES", category = category, itemID = itemID, title = title,
        code = "#showtooltip " .. title .. "\n/use " .. title,
        description = description or "Uses this item from your bags.",
    }
end

-- Warrior
addAbility("WARRIOR", "MELEE", 100, "Charge", "attack")
addAbility("WARRIOR", "MELEE", 78, "Heroic Strike", "attack")
addAbility("WARRIOR", "MELEE", 772, "Rend", "attack")
addAbility("WARRIOR", "MELEE", 7384, "Overpower", "attack")
addAbility("WARRIOR", "MELEE", 694, "Mocking Blow", "attack", "Forces the target to attack you briefly.")
addAbility("WARRIOR", "MELEE", 5308, "Execute", "attack")
addAbility("WARRIOR", "MELEE", 1680, "Whirlwind", "attack")
addAbility("WARRIOR", "CONTROL", 1715, "Hamstring", "attack")
addAbility("WARRIOR", "CONTROL", 6552, "Pummel", "attack")
addAbility("WARRIOR", "CONTROL", 72, "Shield Bash", "attack")
addAbility("WARRIOR", "ABILITIES", 355, "Taunt")
addAbility("WARRIOR", "ABILITIES", 1161, "Challenging Shout")
addAbility("WARRIOR", "ABILITIES", 6343, "Thunder Clap", "attack")
addAbility("WARRIOR", "ABILITIES", 20252, "Intercept", "attack")
addAbility("WARRIOR", "DEFENSIVE", 2565, "Shield Block")
addAbility("WARRIOR", "DEFENSIVE", 871, "Shield Wall")
addAbility("WARRIOR", "DEFENSIVE", 18499, "Berserker Rage")
addAbility("WARRIOR", "DEFENSIVE", 20230, "Retaliation")
addAbility("WARRIOR", "ABILITIES", 1719, "Recklessness")
addAbility("WARRIOR", "UTILITY", 2457, "Battle Stance")

-- Paladin
addAbility("PALADIN", "MELEE", 20271, "Judgement", "attack")
addAbility("PALADIN", "MELEE", 26573, "Consecration", "attack")
addAbility("PALADIN", "RANGED", 879, "Exorcism")
addAbility("PALADIN", "RANGED", 2812, "Holy Wrath")
addAbility("PALADIN", "HEALING", 635, "Holy Light", "mouseover")
addAbility("PALADIN", "HEALING", 19750, "Flash of Light", "mouseover")
addAbility("PALADIN", "HEALING", 633, "Lay on Hands", "mouseover")
addAbility("PALADIN", "DEFENSIVE", 498, "Divine Protection")
addAbility("PALADIN", "DEFENSIVE", 642, "Divine Shield")
addAbility("PALADIN", "DEFENSIVE", 1022, "Blessing of Protection", "mouseover")
addAbility("PALADIN", "UTILITY", 1044, "Blessing of Freedom", "mouseover")
addAbility("PALADIN", "UTILITY", 4987, "Cleanse", "mouseover")
addAbility("PALADIN", "CONTROL", 853, "Hammer of Justice")
addAbility("PALADIN", "CONTROL", 2878, "Turn Undead")
addAbility("PALADIN", "BUFFS", 21084, "Seal of Righteousness")
addAbility("PALADIN", "BUFFS", 25780, "Righteous Fury")
addAbility("PALADIN", "BUFFS", 19740, "Blessing of Might", "mouseover")
addAbility("PALADIN", "BUFFS", 19742, "Blessing of Wisdom", "mouseover")

-- Hunter
addAbility("HUNTER", "RANGED", 75, "Auto Shot")
addAbility("HUNTER", "RANGED", 3044, "Arcane Shot")
addAbility("HUNTER", "RANGED", 5116, "Concussive Shot")
addAbility("HUNTER", "RANGED", 1978, "Serpent Sting")
addAbility("HUNTER", "RANGED", 2643, "Multi-Shot")
addAbility("HUNTER", "RANGED", 19434, "Aimed Shot")
addAbility("HUNTER", "MELEE", 2973, "Raptor Strike", "attack")
addAbility("HUNTER", "MELEE", 2974, "Wing Clip", "attack")
addAbility("HUNTER", "MELEE", 1495, "Mongoose Bite", "attack")
addAbility("HUNTER", "UTILITY", 781, "Disengage")
addAbility("HUNTER", "UTILITY", 5384, "Feign Death")
addAbility("HUNTER", "PET", 883, "Call Pet")
addAbility("HUNTER", "PET", 2641, "Dismiss Pet")
addAbility("HUNTER", "PET", 982, "Revive Pet")
addAbility("HUNTER", "PET", 136, "Mend Pet", "mouseover")
addAbility("HUNTER", "CONTROL", 1499, "Freezing Trap")
addAbility("HUNTER", "UTILITY", 1130, "Hunter's Mark")
addAbility("HUNTER", "UTILITY", 6197, "Eagle Eye")
addAbility("HUNTER", "BUFFS", 5118, "Aspect of the Cheetah")
addAbility("HUNTER", "BUFFS", 13163, "Aspect of the Monkey")

-- Rogue
addAbility("ROGUE", "MELEE", 1752, "Sinister Strike", "attack")
addAbility("ROGUE", "MELEE", 53, "Backstab", "attack")
addAbility("ROGUE", "MELEE", 2098, "Eviscerate", "attack")
addAbility("ROGUE", "MELEE", 8676, "Ambush", "attack")
addAbility("ROGUE", "MELEE", 1943, "Rupture", "attack")
addAbility("ROGUE", "MELEE", 5171, "Slice and Dice", "attack")
addAbility("ROGUE", "MELEE", 8647, "Expose Armor", "attack")
addAbility("ROGUE", "CONTROL", 1776, "Gouge", "attack")
addAbility("ROGUE", "CONTROL", 1766, "Kick", "attack")
addAbility("ROGUE", "CONTROL", 408, "Kidney Shot", "attack")
addAbility("ROGUE", "CONTROL", 6770, "Sap")
addAbility("ROGUE", "CONTROL", 1833, "Cheap Shot", "attack")
addAbility("ROGUE", "CONTROL", 2094, "Blind")
addAbility("ROGUE", "UTILITY", 1784, "Stealth")
addAbility("ROGUE", "UTILITY", 1856, "Vanish")
addAbility("ROGUE", "UTILITY", 2983, "Sprint")
addAbility("ROGUE", "DEFENSIVE", 5277, "Evasion")
addAbility("ROGUE", "DEFENSIVE", 1966, "Feint")

-- Priest
addAbility("PRIEST", "RANGED", 585, "Smite")
addAbility("PRIEST", "RANGED", 8092, "Mind Blast")
addAbility("PRIEST", "RANGED", 589, "Shadow Word: Pain")
addAbility("PRIEST", "RANGED", 15407, "Mind Flay")
addAbility("PRIEST", "HEALING", 2050, "Lesser Heal", "mouseover")
addAbility("PRIEST", "HEALING", 2054, "Heal", "mouseover")
addAbility("PRIEST", "HEALING", 2060, "Greater Heal", "mouseover")
addAbility("PRIEST", "HEALING", 2061, "Flash Heal", "mouseover")
addAbility("PRIEST", "HEALING", 139, "Renew", "mouseover")
addAbility("PRIEST", "DEFENSIVE", 17, "Power Word: Shield", "mouseover")
addAbility("PRIEST", "UTILITY", 527, "Dispel Magic", "mouseover")
addAbility("PRIEST", "UTILITY", 552, "Abolish Disease", "mouseover")
addAbility("PRIEST", "UTILITY", 586, "Fade")
addAbility("PRIEST", "CONTROL", 8122, "Psychic Scream")
addAbility("PRIEST", "CONTROL", 9484, "Shackle Undead")
addAbility("PRIEST", "BUFFS", 1243, "Power Word: Fortitude", "mouseover")
addAbility("PRIEST", "BUFFS", 588, "Inner Fire")
addAbility("PRIEST", "BUFFS", 14752, "Divine Spirit", "mouseover")

-- Shaman
addAbility("SHAMAN", "RANGED", 403, "Lightning Bolt")
addAbility("SHAMAN", "RANGED", 421, "Chain Lightning")
addAbility("SHAMAN", "RANGED", 8042, "Earth Shock")
addAbility("SHAMAN", "RANGED", 8050, "Flame Shock")
addAbility("SHAMAN", "RANGED", 8056, "Frost Shock")
addAbility("SHAMAN", "MELEE", 17364, "Stormstrike", "attack")
addAbility("SHAMAN", "BUFFS", 8017, "Rockbiter Weapon")
addAbility("SHAMAN", "BUFFS", 8232, "Windfury Weapon")
addAbility("SHAMAN", "HEALING", 331, "Healing Wave", "mouseover")
addAbility("SHAMAN", "HEALING", 8004, "Lesser Healing Wave", "mouseover")
addAbility("SHAMAN", "HEALING", 1064, "Chain Heal", "mouseover")
addAbility("SHAMAN", "BUFFS", 324, "Lightning Shield")
addAbility("SHAMAN", "UTILITY", 2645, "Ghost Wolf")
addAbility("SHAMAN", "UTILITY", 370, "Purge")
addAbility("SHAMAN", "UTILITY", 526, "Cure Poison", "mouseover")
addAbility("SHAMAN", "UTILITY", 2870, "Cure Disease", "mouseover")
addAbility("SHAMAN", "TOTEMS", 8071, "Stoneskin Totem")
addAbility("SHAMAN", "TOTEMS", 2484, "Earthbind Totem")
addAbility("SHAMAN", "TOTEMS", 3599, "Searing Totem")
addAbility("SHAMAN", "TOTEMS", 1535, "Fire Nova Totem")
addAbility("SHAMAN", "TOTEMS", 5394, "Healing Stream Totem")
addAbility("SHAMAN", "TOTEMS", 5675, "Mana Spring Totem")
addAbility("SHAMAN", "TOTEMS", 8177, "Grounding Totem")
addAbility("SHAMAN", "TOTEMS", 8512, "Windfury Totem")

-- Mage
addAbility("MAGE", "RANGED", 133, "Fireball")
addAbility("MAGE", "RANGED", 116, "Frostbolt")
addAbility("MAGE", "RANGED", 5143, "Arcane Missiles")
addAbility("MAGE", "RANGED", 2136, "Fire Blast")
addAbility("MAGE", "RANGED", 2948, "Scorch")
addAbility("MAGE", "RANGED", 1449, "Arcane Explosion")
addAbility("MAGE", "RANGED", 10, "Blizzard")
addAbility("MAGE", "RANGED", 2120, "Flamestrike")
addAbility("MAGE", "RANGED", 120, "Cone of Cold")
addAbility("MAGE", "CONTROL", 122, "Frost Nova")
addAbility("MAGE", "CONTROL", 118, "Polymorph")
addAbility("MAGE", "CONTROL", 2139, "Counterspell")
addAbility("MAGE", "UTILITY", 1953, "Blink")
addAbility("MAGE", "UTILITY", 12051, "Evocation")
addAbility("MAGE", "DEFENSIVE", 1463, "Mana Shield")
addAbility("MAGE", "DEFENSIVE", 11426, "Ice Barrier")
addAbility("MAGE", "DEFENSIVE", 45438, "Ice Block")
addAbility("MAGE", "BUFFS", 1459, "Arcane Intellect", "mouseover")
addAbility("MAGE", "BUFFS", 168, "Frost Armor")
addAbility("MAGE", "BUFFS", 7302, "Ice Armor")
addAbility("MAGE", "BUFFS", 604, "Dampen Magic", "mouseover")
addAbility("MAGE", "BUFFS", 1008, "Amplify Magic", "mouseover")

-- Warlock
addAbility("WARLOCK", "RANGED", 686, "Shadow Bolt")
addAbility("WARLOCK", "RANGED", 348, "Immolate")
addAbility("WARLOCK", "RANGED", 172, "Corruption")
addAbility("WARLOCK", "RANGED", 980, "Curse of Agony")
addAbility("WARLOCK", "RANGED", 1490, "Curse of the Elements")
addAbility("WARLOCK", "RANGED", 704, "Curse of Recklessness")
addAbility("WARLOCK", "RANGED", 702, "Curse of Weakness")
addAbility("WARLOCK", "RANGED", 689, "Drain Life")
addAbility("WARLOCK", "RANGED", 1120, "Drain Soul")
addAbility("WARLOCK", "ABILITIES", 1454, "Life Tap")
addAbility("WARLOCK", "CONTROL", 5782, "Fear")
addAbility("WARLOCK", "CONTROL", 710, "Banish")
addAbility("WARLOCK", "CONTROL", 6789, "Death Coil")
addAbility("WARLOCK", "CONTROL", 5484, "Howl of Terror")
addAbility("WARLOCK", "UTILITY", 6201, "Create Healthstone")
addAbility("WARLOCK", "UTILITY", 693, "Create Soulstone")
addAbility("WARLOCK", "PET", 688, "Summon Imp")
addAbility("WARLOCK", "PET", 697, "Summon Voidwalker")
addAbility("WARLOCK", "PET", 712, "Summon Succubus")
addAbility("WARLOCK", "PET", 691, "Summon Felhunter")
addAbility("WARLOCK", "PET", 1098, "Enslave Demon")
addAbility("WARLOCK", "DEFENSIVE", 706, "Demon Armor")
addAbility("WARLOCK", "BUFFS", 132, "Detect Lesser Invisibility", "mouseover")

-- Druid
addAbility("DRUID", "RANGED", 5176, "Wrath")
addAbility("DRUID", "RANGED", 8921, "Moonfire")
addAbility("DRUID", "RANGED", 2912, "Starfire")
addAbility("DRUID", "RANGED", 770, "Faerie Fire")
addAbility("DRUID", "MELEE", 6807, "Maul", "attack")
addAbility("DRUID", "MELEE", 779, "Swipe", "attack")
addAbility("DRUID", "MELEE", 1082, "Claw", "attack")
addAbility("DRUID", "MELEE", 1822, "Rake", "attack")
addAbility("DRUID", "MELEE", 1079, "Rip", "attack")
addAbility("DRUID", "MELEE", 5221, "Shred", "attack")
addAbility("DRUID", "MELEE", 22568, "Ferocious Bite", "attack")
addAbility("DRUID", "CONTROL", 5211, "Bash", "attack")
addAbility("DRUID", "ABILITIES", 6795, "Growl")
addAbility("DRUID", "CONTROL", 9005, "Pounce", "attack")
addAbility("DRUID", "HEALING", 5185, "Healing Touch", "mouseover")
addAbility("DRUID", "HEALING", 774, "Rejuvenation", "mouseover")
addAbility("DRUID", "HEALING", 8936, "Regrowth", "mouseover")
addAbility("DRUID", "HEALING", 740, "Tranquility")
addAbility("DRUID", "UTILITY", 2893, "Abolish Poison", "mouseover")
addAbility("DRUID", "UTILITY", 2782, "Remove Curse", "mouseover")
addAbility("DRUID", "UTILITY", 29166, "Innervate", "mouseover")
addAbility("DRUID", "FORMS", 5487, "Bear Form")
addAbility("DRUID", "FORMS", 768, "Cat Form")
addAbility("DRUID", "FORMS", 783, "Travel Form")
addAbility("DRUID", "FORMS", 1066, "Aquatic Form")
addAbility("DRUID", "FORMS", 24858, "Moonkin Form")

-- Purpose-built macro templates.
addSpecial("WARRIOR", "CONTROL", 694, "Mocking Blow + Start Attack", "#showtooltip Mocking Blow\n/startattack\n/cast Mocking Blow", "Starts your melee swing and casts Mocking Blow.")
addSpecial("WARRIOR", "DEFENSIVE", 871, "Emergency Shield Wall", "#showtooltip Shield Wall\n/stopcasting\n/equipslot 16 YOUR ONE-HAND WEAPON\n/equipslot 17 YOUR SHIELD\n/cast Shield Wall", "Replace the two equipment placeholders with your item names.")
addSpecial("PALADIN", "HEALING", 633, "Mouseover Lay on Hands", "#showtooltip Lay on Hands\n/cast [@mouseover,help,nodead][] Lay on Hands", "Uses your mouseover ally, otherwise your current target.")
addSpecial("PALADIN", "UTILITY", 1044, "Mouseover Blessing of Freedom", "#showtooltip Blessing of Freedom\n/cast [@mouseover,help,nodead][] Blessing of Freedom", "Fast ally dispel-style support macro.")
addSpecial("HUNTER", "PET", 136, "Pet Attack / Mend Pet", "#showtooltip\n/petattack [harm,nodead]\n/cast [mod:shift,@pet] Mend Pet; Auto Shot", "Normal press attacks; Shift heals your pet.")
addSpecial("HUNTER", "UTILITY", 5384, "Feign Death + Pet Passive", "#showtooltip Feign Death\n/petpassive\n/petfollow\n/cast Feign Death", "Pulls your pet back before feigning death.")
addSpecial("ROGUE", "CONTROL", 1766, "Focus Kick", "#showtooltip Kick\n/cast [@focus,harm,nodead][] Kick", "Interrupts your focus when valid, otherwise your target.")
addSpecial("ROGUE", "UTILITY", 1856, "Stop Attack Vanish", "#showtooltip Vanish\n/stopattack\n/cast Vanish", "Stops auto-attacks before Vanish.")
addSpecial("PRIEST", "HEALING", 2061, "Mouseover Flash Heal", "#showtooltip Flash Heal\n/cast [@mouseover,help,nodead][] Flash Heal", "Heals your mouseover ally without changing targets.")
addSpecial("PRIEST", "DEFENSIVE", 17, "Mouseover Power Word: Shield", "#showtooltip Power Word: Shield\n/cast [@mouseover,help,nodead][] Power Word: Shield", "Shields your mouseover ally without changing targets.")
addSpecial("SHAMAN", "HEALING", 8004, "Mouseover Lesser Healing Wave", "#showtooltip Lesser Healing Wave\n/cast [@mouseover,help,nodead][] Lesser Healing Wave", "Heals your mouseover ally without changing targets.")
addSpecial("SHAMAN", "CONTROL", 8042, "Focus Earth Shock", "#showtooltip Earth Shock\n/cast [@focus,harm,nodead][] Earth Shock", "Uses Earth Shock on focus for quick interrupts.")
addSpecial("MAGE", "CONTROL", 118, "Focus Polymorph", "#showtooltip Polymorph\n/cast [@focus,harm,nodead][] Polymorph", "Polymorphs your focus without changing targets.")
addSpecial("MAGE", "CONTROL", 2139, "Stopcasting Counterspell", "#showtooltip Counterspell\n/stopcasting\n/cast [@focus,harm,nodead][] Counterspell", "Immediately interrupts your cast and counters focus or target.")
addSpecial("WARLOCK", "CONTROL", 5782, "Focus Fear", "#showtooltip Fear\n/cast [@focus,harm,nodead][] Fear", "Fears your focus without changing targets.")
addSpecial("WARLOCK", "PET", 688, "Pet Attack / Follow", "#showtooltip\n/petattack [nomod]\n/petfollow [mod:shift]", "Normal press sends your pet; Shift recalls it.")
addSpecial("DRUID", "HEALING", 5185, "Mouseover Healing Touch", "#showtooltip Healing Touch\n/cast [@mouseover,help,nodead][] Healing Touch", "Heals your mouseover ally without changing targets.")
addSpecial("DRUID", "FORMS", 768, "Travel / Cat Form", "#showtooltip\n/cast [outdoors,nocombat] Travel Form; Cat Form", "Uses Travel Form outdoors out of combat, otherwise Cat Form.")

-- Shared targeting templates.
for _, classToken in ipairs({ "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "SHAMAN", "MAGE", "WARLOCK", "DRUID" }) do
    addSpecial(classToken, "TARGETING", nil, "Set Focus", "/focus [@mouseover,exists,nodead][]", "Sets mouseover as focus, otherwise your current target.")
    addSpecial(classToken, "TARGETING", nil, "Clear Focus", "/clearfocus", "Clears your current focus target.")
    addSpecial(classToken, "TARGETING", nil, "Target Mouseover", "/target [@mouseover,exists,nodead] mouseover", "Targets the unit under your mouse cursor.")
end

-- Potions and common combat consumables.
addConsumable("POTIONS", 118, "Minor Healing Potion")
addConsumable("POTIONS", 858, "Lesser Healing Potion")
addConsumable("POTIONS", 929, "Healing Potion")
addConsumable("POTIONS", 1710, "Greater Healing Potion")
addConsumable("POTIONS", 3928, "Superior Healing Potion")
addConsumable("POTIONS", 13446, "Major Healing Potion")
addConsumable("POTIONS", 2455, "Minor Mana Potion")
addConsumable("POTIONS", 3385, "Lesser Mana Potion")
addConsumable("POTIONS", 3827, "Mana Potion")
addConsumable("POTIONS", 6149, "Greater Mana Potion")
addConsumable("POTIONS", 13443, "Superior Mana Potion")
addConsumable("POTIONS", 13444, "Major Mana Potion")
addConsumable("POTIONS", 2459, "Swiftness Potion")
addConsumable("POTIONS", 5634, "Free Action Potion")
addConsumable("POTIONS", 3387, "Limited Invulnerability Potion")
addConsumable("POTIONS", 9172, "Invisibility Potion")
addConsumable("POTIONS", 13457, "Greater Fire Protection Potion")
addConsumable("POTIONS", 13456, "Greater Frost Protection Potion")
addConsumable("POTIONS", 13458, "Greater Nature Protection Potion")
addConsumable("POTIONS", 13459, "Greater Shadow Protection Potion")
addConsumable("POTIONS", 13461, "Greater Arcane Protection Potion")
addConsumable("CONSUMABLES", 5512, "Healthstone")
addConsumable("CONSUMABLES", 12662, "Demonic Rune")
addConsumable("CONSUMABLES", 20520, "Dark Rune")
addConsumable("CONSUMABLES", 13442, "Mighty Rage Potion")
addConsumable("CONSUMABLES", 13455, "Greater Stoneshield Potion")
addConsumable("CONSUMABLES", 20008, "Living Action Potion")
addConsumable("CONSUMABLES", 13454, "Greater Arcane Elixir")
addConsumable("CONSUMABLES", 2454, "Elixir of Lion's Strength")
addConsumable("CONSUMABLES", 2457, "Elixir of Minor Agility")
addConsumable("CONSUMABLES", nil, "Elixir of Minor Force", "Uses the WoW Forever early Alchemy elixir from your bags.")
addConsumable("CONSUMABLES", nil, "Minor Arcane Elixir", "Uses the WoW Forever early Alchemy elixir from your bags.")

local function buildAbilityCode(entry)
    local spellName = FMC:GetSpellName(entry.spellID, entry.title) or entry.title
    if entry.style == "attack" then
        return "#showtooltip " .. spellName .. "\n/startattack\n/cast " .. spellName
    elseif entry.style == "mouseover" then
        return "#showtooltip " .. spellName .. "\n/cast [@mouseover,help,nodead][] " .. spellName
    end
    return "#showtooltip " .. spellName .. "\n/cast " .. spellName
end

function FMC:BuildLibrary()
    local library, keys = {}, {}
    for _, entry in ipairs(abilities) do
        local copy = {}
        for key, value in pairs(entry) do copy[key] = value end
        copy.code = buildAbilityCode(copy)
        copy.icon = self:GetSpellIcon(copy.spellID)
        library[#library + 1] = copy
        keys[copy.class .. ":" .. string.lower(copy.title)] = true
    end
    for _, entry in ipairs(specials) do
        local copy = {}
        for key, value in pairs(entry) do copy[key] = value end
        copy.icon = copy.spellID and self:GetSpellIcon(copy.spellID) or "Interface\\Icons\\INV_Misc_Note_01"
        library[#library + 1] = copy
    end
    for _, entry in ipairs(consumables) do
        local copy = {}
        for key, value in pairs(entry) do copy[key] = value end
        copy.icon = self:GetItemIcon(copy.itemID)
        library[#library + 1] = copy
    end
    local _, playerClass = UnitClass("player")
    for _, entry in ipairs(self:ScanLearnedSpells(playerClass)) do
        local key = entry.class .. ":" .. string.lower(entry.title)
        if not keys[key] then library[#library + 1] = entry end
    end
    self.library = library
end

function FMC:GetEntries(classToken, category, search)
    local results = {}
    local query = string.lower((search or ""):gsub("^%s+", ""):gsub("%s+$", ""))
    for _, entry in ipairs(self.library or {}) do
        local classMatch = entry.class == classToken
        if classToken ~= "CONSUMABLES" and entry.class == "CONSUMABLES" then classMatch = true end
        local categoryMatch = category == "ALL" or entry.category == category
        if query ~= "" then
            classMatch = true
            categoryMatch = true
        end
        if classMatch and categoryMatch then
            local haystack = string.lower(table.concat({
                entry.title or "", entry.description or "", entry.category or "",
                self.CLASS_NAMES[entry.class] or "", entry.code or "",
            }, " "))
            if query == "" or haystack:find(query, 1, true) then results[#results + 1] = entry end
        end
    end
    table.sort(results, function(a, b)
        if a.category ~= b.category then return (self.CATEGORY_NAMES[a.category] or a.category) < (self.CATEGORY_NAMES[b.category] or b.category) end
        return (a.title or "") < (b.title or "")
    end)
    return results
end

function FMC:GetCategories(classToken)
    local found, categories = { ALL = true }, { "ALL" }
    for _, entry in ipairs(self.library or {}) do
        if entry.class == classToken or (classToken ~= "CONSUMABLES" and entry.class == "CONSUMABLES") then
            if not found[entry.category] then
                found[entry.category] = true
                categories[#categories + 1] = entry.category
            end
        end
    end
    table.sort(categories, function(a, b)
        if a == "ALL" then return true end
        if b == "ALL" then return false end
        return (self.CATEGORY_NAMES[a] or a) < (self.CATEGORY_NAMES[b] or b)
    end)
    return categories
end
