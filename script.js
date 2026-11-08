/* cspell:disable-file */

const classSkillsDatabase = {
    WARRIOR: [
        { en: "Charge", pt: "Investida", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Mortal Strike", pt: "Golpe Mortal", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Bloodthirst", pt: "Sede de Sangue", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Overpower", pt: "Prevalecer", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Death Wish", pt: "Desejo de Morte", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Recklessness", pt: "Temeridade", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Shield Block", pt: "Bloqueio com Escudo", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Bloodrage", pt: "Raiva Sangrenta", cat: "utility", img: "https://worldofwarcraft.com" }
    ],
    PALADIN: [
        { en: "Crusader Strike", pt: "Golpe do Cruzado", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Judgement", pt: "Julgamento", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Divine Storm", pt: "Tempestade Divina", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Avenging Wrath", pt: "Ira Vingativa", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Divine Illumination", pt: "Iluminação Divina", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Divine Shield", pt: "Escudo Divino", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Hammer of Justice", pt: "Martelo da Justiça", cat: "control", img: "https://worldofwarcraft.com" }
    ],
    HUNTER: [
        { en: "Steady Shot", pt: "Tiro Firme", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Multi-Shot", pt: "Tiro Múltiplo", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Aimed Shot", pt: "Tiro Mirado", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Explosive Shot", pt: "Tiro Explosivo", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Rapid Fire", pt: "Tiro Rápido", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Bestial Wrath", pt: "Ira Bestial", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Deterrence", pt: "Dissuasão", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Kill Command", pt: "Comando para Matar", cat: "pet", img: "https://worldofwarcraft.com" }
    ],
    ROGUE: [
        { en: "Sinister Strike", pt: "Golpe Sinistro", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Mutilate", pt: "Mutilar", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Eviscerate", pt: "Eviscerar", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Envenom", pt: "Envenenar", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Adrenaline Rush", pt: "Adrenalina", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Cold Blood", pt: "Sangue Frio", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Evasion", pt: "Evasão", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Kidney Shot", pt: "Golpe no Rim", cat: "control", img: "https://worldofwarcraft.com" }
    ],
    PRIEST: [
        { en: "Mind Flay", pt: "Açoite Mental", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Mind Blast", pt: "Impacto Mental", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Shadow Word: Pain", pt: "Palavra das Sombras: Dor", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Vampiric Touch", pt: "Toque Vampírico", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Power Infusion", pt: "Infusão de Poder", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Inner Focus", pt: "Foco Interno", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Psychic Scream", pt: "Grito Psíquico", cat: "control", img: "https://worldofwarcraft.com" },
        { en: "Dispersion", pt: "Dispersão", cat: "defensives", img: "https://worldofwarcraft.com" }
    ],
    SHAMAN: [
        { en: "Lightning Bolt", pt: "Raio", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Lava Burst", pt: "Estouro de Lava", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Stormstrike", pt: "Ataque da Tempestade", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Lava Lash", pt: "Açoite de Lava", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Elemental Mastery", pt: "Maestria Elemental", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Shamanistic Rage", pt: "Raiva Xamânica", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Hex", pt: "Praga", cat: "control", img: "https://worldofwarcraft.com" }
    ],
    MAGE: [
        { en: "Frostbolt", pt: "Seta de Gelo", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Fireball", pt: "Bola de Fogo", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Arcane Blast", pt: "Impacto Arcano", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Arcane Power", pt: "Poder Arcano", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Icy Veins", pt: "Veias Geladas", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Ice Block", pt: "Bloco de Gelo", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Polymorph", pt: "Polimorfia", cat: "control", img: "https://worldofwarcraft.com" }
    ],
    WARLOCK: [
        { en: "Corruption", pt: "Corrupção", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Curse of Agony", pt: "Maldição da Agonia", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Drain Life", pt: "Drenar Vida", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Drain Soul", pt: "Drenar Alma", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Immolate", pt: "Imolação", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Amplify Curse", pt: "Amplificar Maldição", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Fear", pt: "Medo", cat: "control", img: "https://worldofwarcraft.com" },
        { en: "Demonic Empowerment", pt: "Empoderamento Demoníaco", cat: "pet", img: "https://worldofwarcraft.com" }
    ],
    DRUID: [
        { en: "Wrath", pt: "Ira", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Starfire", pt: "Fogo Estelar", cat: "ranged", img: "https://worldofwarcraft.com" },
        { en: "Shred", pt: "Despedaçar", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Mangle", pt: "Mutilar", cat: "abilities", img: "https://worldofwarcraft.com" },
        { en: "Tiger's Fury", pt: "Fúria do Tigre", cat: "buffs", img: "https://worldofwarcraft.com" },
        { en: "Barkskin", pt: "Pele de Árvore", cat: "defensives", img: "https://worldofwarcraft.com" },
        { en: "Cyclone", pt: "Ciclone", cat: "control", img: "https://worldofwarcraft.com" }
    ],
    CONSUMABLES: [
        { en: "Runic Healing Potion", pt: "Poção de Cura Rúnica", cat: "potions", img: "https://worldofwarcraft.com" },
        { en: "Runic Mana Potion", pt: "Poção de Mana Rúnica", cat: "potions", img: "https://worldofwarcraft.com" },
        { en: "Potion of Speed", pt: "Poção de Velocidade", cat: "potions", img: "https://worldofwarcraft.com" },
        { en: "Flame Cap", pt: "Gorro de Chama", cat: "other", img: "https://worldofwarcraft.com" }
    ]
};

let activeClass = "";
let activeCategory = "all";
let selectedSkillsSequence = [];

const skillsGroup = document.getElementById("skillsGroup");
const macroOutput = document.getElementById("macroOutput");
const charCount = document.getElementById("charCount");
const itemsFoundCounter = document.getElementById("itemsFoundCounter");
const currentMacroName = document.getElementById("currentMacroName");

// 1. Seleção de Classes
document.querySelectorAll(".class-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".class-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeClass = e.currentTarget.getAttribute("data-class");
        renderSkillsLibrary();
    });
});

// 2. Seleção de Categorias
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeCategory = e.currentTarget.getAttribute("data-cat");
        renderSkillsLibrary();
    });
});

// 3. Montar a Lista Visual das Habilidades
function renderSkillsLibrary() {
    skillsGroup.innerHTML = "";
    if (!activeClass || !classSkillsDatabase[activeClass]) {
        skillsGroup.innerHTML = `<div class="empty-notice">Selecione uma classe à esquerda...</div>`;
        itemsFoundCounter.innerText = "0 FOUND";
        return;
    }

    const filteredSkills = classSkillsDatabase[activeClass].filter(skill => {
        return activeCategory === "all" || skill.cat === activeCategory;
    });

    itemsFoundCounter.innerText = `${filteredSkills.length} FOUND`;

    if (filteredSkills.length === 0) {
        skillsGroup.innerHTML = `<div class="empty-notice">Nenhuma habilidade encontrada nesta categoria.</div>`;
        return;
    }

    filteredSkills.forEach((skill) => {
        const itemRow = document.createElement("div");
        itemRow.className = "library-item-row";
        
        const displayName = skill.pt || skill.en;
        const classNameFormatted = activeClass.charAt(0) + activeClass.slice(1).toLowerCase();

itemRow.innerHTML = <img src="${skill.img}" class="library-item-icon" alt="${displayName}"> <div class="library-item-info"> <div class="library-item-name">${displayName}</div> <div class="library-item-sub">${classNameFormatted} • ${skill.cat.toUpperCase()}</div> </div>;
itemRow.addEventListener("click", () => {
document.querySelectorAll(".library-item-row").forEach(r => r.classList.remove("selected-active"));
itemRow.classList.add("selected-active");
addSkillToMacro(displayName);
});
skillsGroup.appendChild(itemRow);
});
}
// 4. Lógica de Encadeamento de Macros
function addSkillToMacro(skillName) {
selectedSkillsSequence.push(skillName);
updateMacroDisplay();
}
function updateMacroDisplay() {
if (selectedSkillsSequence.length === 0) {
macroOutput.value = "";
charCount.innerText = "0";
currentMacroName.innerText = "Selecione uma skill";
return;
}
const lastSkill = selectedSkillsSequence[selectedSkillsSequence.length - 1];
currentMacroName.innerText = lastSkill;
let generatedText = "#showtooltip " + selectedSkillsSequence[0] + "\n";
if (selectedSkillsSequence.length === 1) {
generatedText += /cast ${selectedSkillsSequence[0]};
} else {
generatedText += /castsequence reset=combat/target ${selectedSkillsSequence.join(", ")};
}
macroOutput.value = generatedText;
charCount.innerText = generatedText.length;
macroOutput.style.color = generatedText.length > 255 ? "#ef5350" : "#a3b6cc";
}
// Botão de Limpar (CLEAR)
document.getElementById("btnClearMacro").addEventListener("click", () => {
selectedSkillsSequence = [];
document.querySelectorAll(".library-item-row").forEach(r => r.classList.remove("selected-active"));
updateMacroDisplay();
});
// Botão de Copiar (SELECT CODE)
document.getElementById("btnCopy").addEventListener("click", () => {
if (!macroOutput.value) return;
macroOutput.select();
document.execCommand("copy");
alert("Código copiado com sucesso!");
});
// Botão de Integração (INSERT INTO BLIZZARD)
document.getElementById("btnInsertBlizzard").addEventListener("click", () => {
if (!macroOutput.value) return;
alert("Injetando macro diretamente no client de World of Warcraft...");
});