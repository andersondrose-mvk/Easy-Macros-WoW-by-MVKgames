local ADDON_NAME, FMC = ...

FMC.VERSION = "1.0.0"
FMC.DISPLAY_NAME = "Forever Macro Creator"
FMC.MACRO_LIMIT = 255

FMC.DEFAULTS = {
    enabled = true,
    shown = true,
    autoOpen = true,
    selectedClass = nil,
    selectedCategory = "ALL",
    selectedEntry = nil,
    search = "",
    scale = 1.00,
    alpha = 1.00,
    anchorSide = "AUTO",
}

FMC.COLORS = {
    background = { 0.028, 0.034, 0.046, 0.99 },
    panel = { 0.052, 0.062, 0.080, 0.99 },
    raised = { 0.082, 0.096, 0.122, 1.00 },
    hover = { 0.115, 0.135, 0.170, 1.00 },
    border = { 0.225, 0.260, 0.325, 1.00 },
    accent = { 0.18, 0.66, 0.92, 1.00 },
    text = { 0.93, 0.95, 0.98, 1.00 },
    muted = { 0.56, 0.61, 0.70, 1.00 },
    good = { 0.25, 0.86, 0.46, 1.00 },
    warning = { 0.96, 0.70, 0.20, 1.00 },
    danger = { 0.96, 0.28, 0.24, 1.00 },
}

FMC.CLASS_ORDER = {
    "WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST",
    "SHAMAN", "MAGE", "WARLOCK", "DRUID", "CONSUMABLES",
}

FMC.CLASS_NAMES = {
    WARRIOR = "Warrior", PALADIN = "Paladin", HUNTER = "Hunter",
    ROGUE = "Rogue", PRIEST = "Priest", SHAMAN = "Shaman",
    MAGE = "Mage", WARLOCK = "Warlock", DRUID = "Druid",
    CONSUMABLES = "Consumables",
}

FMC.CLASS_COLORS = {
    WARRIOR = { 0.78, 0.61, 0.43 }, PALADIN = { 0.96, 0.55, 0.73 },
    HUNTER = { 0.67, 0.83, 0.45 }, ROGUE = { 1.00, 0.96, 0.41 },
    PRIEST = { 0.95, 0.95, 0.95 }, SHAMAN = { 0.15, 0.44, 0.95 },
    MAGE = { 0.25, 0.78, 0.92 }, WARLOCK = { 0.53, 0.53, 0.93 },
    DRUID = { 1.00, 0.49, 0.04 }, CONSUMABLES = { 0.25, 0.86, 0.46 },
}

FMC.CATEGORY_COLORS = {
    ALL = { 0.70, 0.74, 0.82 }, MELEE = { 0.93, 0.35, 0.24 },
    RANGED = { 0.95, 0.68, 0.20 }, ABILITIES = { 0.22, 0.68, 0.94 },
    DEFENSIVE = { 0.25, 0.56, 0.96 }, UTILITY = { 0.22, 0.82, 0.82 },
    CONTROL = { 0.96, 0.76, 0.24 }, HEALING = { 0.25, 0.86, 0.46 },
    BUFFS = { 0.70, 0.43, 0.95 }, PET = { 0.95, 0.45, 0.70 },
    FORMS = { 1.00, 0.49, 0.04 }, TOTEMS = { 0.28, 0.72, 0.92 },
    POTIONS = { 0.30, 0.90, 0.55 }, CONSUMABLES = { 0.42, 0.82, 0.40 },
    TARGETING = { 0.72, 0.76, 0.84 }, LEARNED = { 0.36, 0.76, 0.98 },
}

FMC.CATEGORY_NAMES = {
    ALL = "All Macros", MELEE = "Melee Attacks", RANGED = "Ranged Attacks",
    ABILITIES = "Abilities", DEFENSIVE = "Defensives", UTILITY = "Utility",
    CONTROL = "Control", HEALING = "Healing", BUFFS = "Buffs",
    PET = "Pet", FORMS = "Forms", TOTEMS = "Totems",
    POTIONS = "Potions", CONSUMABLES = "Other Items",
    TARGETING = "Targeting", LEARNED = "Learned Abilities",
}
