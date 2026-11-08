/* cspell:disable-file */

const classSkillsDatabase = window.classSkillsDatabase;
let activeClass = "";
let activeCategory = "all";
let selectedSkillsSequence = [];
let selectedMacroSkill = null;
const skillsGroup = document.getElementById("skillsGroup");
const macroOutput = document.getElementById("macroOutput");
const charCount = document.getElementById("charCount");
const itemsFoundCounter = document.getElementById("itemsFoundCounter");
const currentMacroName = document.getElementById("currentMacroName");
const langSelect = document.getElementById("langSelect");
const skillSearch = document.getElementById("skillSearch");
const defaultSkillIcon = "https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg";
const skillIconCache = new Map();
const skillIconRequests = new Map();
let skillIconObserver;
const classNames = {
    pt: {
        WARRIOR: "Guerreiro", PALADIN: "Paladino", HUNTER: "Caçador",
        ROGUE: "Ladino", PRIEST: "Sacerdote", SHAMAN: "Xamã",
        MAGE: "Mago", WARLOCK: "Bruxo", DRUID: "Druida",
        CONSUMABLES: "Consumíveis"
    },
    en: {
        WARRIOR: "Warrior", PALADIN: "Paladin", HUNTER: "Hunter",
        ROGUE: "Rogue", PRIEST: "Priest", SHAMAN: "Shaman",
        MAGE: "Mage", WARLOCK: "Warlock", DRUID: "Druid",
        CONSUMABLES: "Consumables"
    },
    es: {
        WARRIOR: "Guerrero", PALADIN: "Paladín", HUNTER: "Cazador",
        ROGUE: "Pícaro", PRIEST: "Sacerdote", SHAMAN: "Chamán",
        MAGE: "Mago", WARLOCK: "Brujo", DRUID: "Druida",
        CONSUMABLES: "Consumibles"
    }
};
const categoryNames = {
    pt: {
        all: "Todas as macros", abilities: "Habilidades", buffs: "Bônus",
        control: "Controle", defensives: "Defensivas", forms: "Formas",
        healing: "Cura", learned: "Habilidades aprendidas", melee: "Ataques corpo a corpo",
        pet: "Mascote", potions: "Poções", consumables: "Outros itens",
        ranged: "Ataques à distância", totems: "Totens", targeting: "Seleção de alvo",
        utility: "Utilidade"
    },
    en: {
        all: "All Macros", abilities: "Abilities", buffs: "Buffs",
        control: "Control", defensives: "Defensives", forms: "Forms",
        healing: "Healing", learned: "Learned Abilities", melee: "Melee Attacks",
        pet: "Pet", potions: "Potions", consumables: "Other Items",
        ranged: "Ranged Attacks", totems: "Totems", targeting: "Targeting",
        utility: "Utility"
    },
    es: {
        all: "Todas las macros", abilities: "Habilidades", buffs: "Mejoras",
        control: "Control", defensives: "Defensivas", forms: "Formas",
        healing: "Sanación", learned: "Habilidades aprendidas", melee: "Ataques cuerpo a cuerpo",
        pet: "Mascota", potions: "Pociones", consumables: "Otros objetos",
        ranged: "Ataques a distancia", totems: "Tótems", targeting: "Selección de objetivo",
        utility: "Utilidad"
    }
};

function getLocalizedClassName(classKey, language) {
    return (classNames[language] || classNames.en)[classKey] || classKey;
}

function getLocalizedCategoryName(category, language) {
    const key = normalizeCategoryKey(category);
    return (categoryNames[language] || categoryNames.en)[key] || category;
}

function getLocalizedSkillName(skill, language) {
    return skill[language] || skill.en;
}

function getSkillIconKey(skill) {
    if (skill.kind === "item" && skill.itemId) return "item:" + skill.itemId;
    if (skill.spellId) return "spell:" + skill.spellId;
    return null;
}

function fetchSkillIcon(skill) {
    const key = getSkillIconKey(skill);
    if (!key) return Promise.resolve(defaultSkillIcon);
    if (skillIconCache.has(key)) return Promise.resolve(skillIconCache.get(key));
    if (skillIconRequests.has(key)) return skillIconRequests.get(key);

    const separator = key.indexOf(":");
    const type = key.slice(0, separator);
    const id = key.slice(separator + 1);
    const classicDatabase = fetch("https://classicdb.ch/?" + type + "=" + id)
        .then(function(response) {
            if (!response.ok) throw new Error("Classic database returned HTTP " + response.status);
            return response.text();
        })
        .then(function(html) {
            const iconPattern = new RegExp("_\\[" + id + "\\]=\\{icon:'([^']+)'");
            const match = html.match(iconPattern);
            if (!match || !/^[a-z0-9_]+$/i.test(match[1])) {
                throw new Error("Classic database has no icon for " + key);
            }
            return match[1];
        });
    const currentDatabase = classicDatabase.catch(function() {
        return fetch("https://nether.wowhead.com/tooltip/" + type + "/" + id + "?dataEnv=1&locale=0")
            .then(function(response) {
                if (!response.ok) throw new Error("Fallback icon service returned HTTP " + response.status);
                return response.json();
            })
            .then(function(data) {
                if (!data.icon || !/^[a-z0-9_]+$/i.test(data.icon)) {
                    throw new Error("Fallback icon service has no icon for " + key);
                }
                return data.icon;
            });
    });
    const request = currentDatabase
        .then(function(iconName) {
            const iconUrl = "https://wow.zamimg.com/images/wow/icons/large/" + iconName.toLowerCase() + ".jpg";
            skillIconCache.set(key, iconUrl);
            return iconUrl;
        })
        .catch(function(error) {
            console.error("Could not load WoW icon for " + key + ".", error);
            return defaultSkillIcon;
        })
        .finally(function() {
            skillIconRequests.delete(key);
        });

    skillIconRequests.set(key, request);
    return request;
}

function loadSkillIcon(image, skill) {
    fetchSkillIcon(skill).then(function(iconUrl) {
        image.src = iconUrl;
    });
}

function getLocalizedMacroCode(skill, language) {
    if (!skill.code) return "";

    let code = skill.code;
    if (skill.spellId) {
        const sourceSkill = (classSkillsDatabase[activeClass] || []).find(function(entry) {
            return entry.kind === "spell" && entry.spellId === skill.spellId;
        });
        if (sourceSkill) {
            const localizedName = getLocalizedSkillName(sourceSkill, language);
            if (localizedName !== sourceSkill.en) {
                code = code.split(sourceSkill.en).join(localizedName);
            }
        }
    }
    return code;
}

function updateLocalizedLabels() {
    const language = langSelect.value;
    document.querySelectorAll(".class-btn").forEach(function(button) {
        const classKey = button.getAttribute("data-class");
        button.textContent = getLocalizedClassName(classKey, language).toUpperCase();
    });
    document.querySelectorAll(".category-btn").forEach(function(button) {
        button.textContent = getLocalizedCategoryName(button.getAttribute("data-cat"), language);
    });
    document.getElementById("classesHeading").textContent =
        language === "pt" ? "CLASSES" : language === "es" ? "CLASES" : "CLASSES";
    document.getElementById("categoriesHeading").textContent =
        language === "pt" ? "CATEGORIAS" : language === "es" ? "CATEGORÍAS" : "CATEGORIES";
}

function normalizeCategoryKey(value) {
    if (!value) return "all";

    const aliasMap = {
        all: "all",
        "all macros": "all",
        abilities: "abilities",
        ability: "abilities",
        buffs: "buffs",
        buff: "buffs",
        control: "control",
        "crowd control": "control",
        defensives: "defensives",
        defensive: "defensives",
        healing: "healing",
        heal: "healing",
        learned: "learned",
        "learned abilities": "learned",
        "learned ability": "learned",
        melee: "melee",
        "melee attacks": "melee",
        "melee attack": "melee",
        pet: "pet",
        pets: "pet",
        potions: "potions",
        potion: "potions",
        consumables: "consumables",
        "other items": "consumables",
        "other item": "consumables",
        ranged: "ranged",
        "ranged attacks": "ranged",
        "ranged attack": "ranged",
        totems: "totems",
        totem: "totems",
        targeting: "targeting",
        target: "targeting",
        utility: "utility",
        utilities: "utility"
    };

    const normalized = String(value)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    return aliasMap[normalized] || normalized;
}

skillSearch.addEventListener("input", function() {
renderSkillsLibrary();
});
langSelect.addEventListener("change", function() {
updateLocalizedLabels();
renderSkillsLibrary();
updateMacroDisplay();
});
document.querySelectorAll(".class-btn").forEach(function(button) {
button.addEventListener("click", function(e) {
document.querySelectorAll(".class-btn").forEach(function(b) { b.classList.remove("active"); });
e.currentTarget.classList.add("active");
activeClass = e.currentTarget.getAttribute("data-class");
activeCategory = "all";
skillSearch.value = "";
document.querySelectorAll(".category-btn").forEach(function(categoryButton) {
categoryButton.classList.toggle("active", categoryButton.getAttribute("data-cat") === "all");
});
renderSkillsLibrary();
});
});
document.querySelectorAll(".category-btn").forEach(function(button) {
button.addEventListener("click", function(e) {
document.querySelectorAll(".category-btn").forEach(function(b) { b.classList.remove("active"); });
e.currentTarget.classList.add("active");
activeCategory = e.currentTarget.getAttribute("data-cat");
renderSkillsLibrary();
});
});
function renderSkillsLibrary() {
if (skillIconObserver) skillIconObserver.disconnect();
skillsGroup.innerHTML = "";
if (!activeClass || !classSkillsDatabase[activeClass]) {
skillsGroup.innerHTML = 'Selecione uma classe à esquerda...';
itemsFoundCounter.innerText = "0 FOUND";
return;
}
const currentLang = langSelect.value;
const searchQuery = skillSearch.value.toLowerCase().trim();
let standardSkills = classSkillsDatabase[activeClass] || [];
if (activeClass !== "CONSUMABLES") {
standardSkills = standardSkills.concat(classSkillsDatabase["CONSUMABLES"] || []);
}
const normalizedActiveCat = normalizeCategoryKey(activeCategory);
const filteredSkills = standardSkills.filter(function(skill) {
const normalizedSkillCat = normalizeCategoryKey(skill.cat);
const matchesCategory = (normalizedActiveCat === "all" || normalizedSkillCat === normalizedActiveCat);
const displayName = getLocalizedSkillName(skill, currentLang);
const matchesSearch = displayName.toLowerCase().includes(searchQuery);
return matchesCategory && matchesSearch;
});
itemsFoundCounter.innerText = filteredSkills.length + " FOUND";
if (filteredSkills.length === 0) {
skillsGroup.innerHTML = 'Nenhuma habilidade encontrada com os filtros aplicados.';
return;
}
filteredSkills.forEach(function(skill) {
const itemRow = document.createElement("div");
itemRow.className = "library-item-row";
itemRow.skillData = skill;
const displayName = getLocalizedSkillName(skill, currentLang);
const classKey = skill.kind === "item" ? "CONSUMABLES" : activeClass;
const icon = document.createElement("img");
icon.className = "library-item-icon";
icon.src = defaultSkillIcon;
icon.alt = "";
icon.setAttribute("aria-hidden", "true");
icon.addEventListener("error", function() {
    if (icon.src !== defaultSkillIcon) icon.src = defaultSkillIcon;
});
const itemInfo = document.createElement("span");
itemInfo.className = "library-item-info";
const nameLabel = document.createElement("span");
nameLabel.className = "library-item-name";
nameLabel.textContent = displayName;
const metaLabel = document.createElement("span");
metaLabel.className = "library-item-sub";
metaLabel.textContent = getLocalizedClassName(classKey, currentLang) +
    " • " + getLocalizedCategoryName(skill.cat, currentLang);
itemInfo.appendChild(nameLabel);
itemInfo.appendChild(metaLabel);
itemRow.appendChild(icon);
itemRow.appendChild(itemInfo);
itemRow.addEventListener("click", function() {
document.querySelectorAll(".library-item-row").forEach(function(r) { r.classList.remove("selected-active"); });
itemRow.classList.add("selected-active");
addSkillToMacro(skill);
});
skillsGroup.appendChild(itemRow);
if (skillIconObserver) {
    skillIconObserver.observe(itemRow);
} else {
    loadSkillIcon(icon, skill);
}
});
}
function addSkillToMacro(skill) {
if (skill.code) {
selectedSkillsSequence = [];
selectedMacroSkill = skill;
updateMacroDisplay();
return;
}
selectedMacroSkill = null;
selectedSkillsSequence.push(skill);
updateMacroDisplay();
}
function updateMacroDisplay() {
const currentLang = langSelect.value;
if (selectedMacroSkill) {
const macroCode = getLocalizedMacroCode(selectedMacroSkill, currentLang);
macroOutput.value = macroCode;
charCount.innerText = macroCode.length;
currentMacroName.innerText = getLocalizedSkillName(selectedMacroSkill, currentLang);
macroOutput.style.color = macroCode.length > 255 ? "#ef5350" : "#a3b6cc";
return;
}
if (selectedSkillsSequence.length === 0) {
macroOutput.value = "";
charCount.innerText = "0";
currentMacroName.innerText = "Selecione uma skill";
return;
}
const lastSkill = getLocalizedSkillName(selectedSkillsSequence[selectedSkillsSequence.length - 1], currentLang);
currentMacroName.innerText = lastSkill;
let generatedText = "#showtooltip " + lastSkill + "\n";
if (selectedSkillsSequence.length === 1) {
generatedText += "/cast " + getLocalizedSkillName(selectedSkillsSequence[0], currentLang);
} else {
generatedText += "/castsequence reset=combat/target " + selectedSkillsSequence.map(function(skill) {
return getLocalizedSkillName(skill, currentLang);
}).join(", ");
}
macroOutput.value = generatedText;
charCount.innerText = generatedText.length;
macroOutput.style.color = generatedText.length > 255 ? "#ef5350" : "#a3b6cc";
}
document.getElementById("btnClearMacro").addEventListener("click", function() {
selectedSkillsSequence = [];
selectedMacroSkill = null;
document.querySelectorAll(".library-item-row").forEach(function(r) { r.classList.remove("selected-active"); });
updateMacroDisplay();
});
document.getElementById("btnCopy").addEventListener("click", function() {
if (!macroOutput.value) return;
macroOutput.select();
document.execCommand("copy");
alert("Código copiado com sucesso!");
});
document.getElementById("btnInsertBlizzard").addEventListener("click", function() {
if (!macroOutput.value) return;
alert("Injetando macro diretamente no client de World of Warcraft...");
});

updateLocalizedLabels();

if ("IntersectionObserver" in window) {
    skillIconObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            const icon = entry.target.querySelector(".library-item-icon");
            if (icon && entry.target.skillData) loadSkillIcon(icon, entry.target.skillData);
        });
    }, { root: skillsGroup });
}