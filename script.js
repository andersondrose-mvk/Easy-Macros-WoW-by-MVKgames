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
let currentLanguage = "pt"; // Idioma inicial padronizado ('pt' ou 'en')
let selectedSkillsSequence = []; // Armazena os objetos completos de skill para tradução dinâmica

// Elementos DOM
const skillsGroup = document.getElementById("skillsGroup");
const macroOutput = document.getElementById("macroOutput");
const charCount = document.getElementById("charCount");
const itemsFoundCounter = document.getElementById("itemsFoundCounter");
const currentMacroName = document.getElementById("currentMacroName");
const langSelect = document.getElementById("langSelect"); // Certifique-se de ter um <select id="langSelect"> no HTML

// Monitoramento da alteração de idioma
if (langSelect) {
    langSelect.addEventListener("change", (e) => {
        currentLanguage = e.target.value.toLowerCase();
        renderSkillsLibrary();
        updateMacroDisplay();
    });
}

// Inicialização dos botões das classes
document.querySelectorAll(".class-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".class-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeClass = e.currentTarget.getAttribute("data-class");
        renderSkillsLibrary();
    });
});

// Inicialização dos botões das categorias
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        activeCategory = e.currentTarget.getAttribute("data-cat");
        renderSkillsLibrary();
    });
});

// Renderizador da biblioteca baseado no idioma ativo
function renderSkillsLibrary() {
    skillsGroup.innerHTML = "";
    if (!activeClass || !classSkillsDatabase[activeClass]) {
        skillsGroup.innerHTML = '<div class="empty-notice">Selecione uma classe à esquerda...</div>';
        itemsFoundCounter.innerText = "0 FOUND";
        return;
    }

    const filteredSkills = classSkillsDatabase[activeClass].filter(skill => {
return activeCategory === "all" || skill.cat === activeCategory;
});
itemsFoundCounter.innerText = filteredSkills.length + " FOUND";
if (filteredSkills.length === 0) {
skillsGroup.innerHTML = 'Nenhuma habilidade encontrada nesta categoria.';
return;
}
filteredSkills.forEach((skill) => {
const itemRow = document.createElement("div");
itemRow.className = "library-item-row";
// Define o nome de exibição conforme idioma selecionado
const displayName = currentLanguage === "pt" ? (skill.pt || skill.en) : (skill.en || skill.pt);
const classNameFormatted = activeClass.charAt(0) + activeClass.slice(1).toLowerCase();
const fallbackImg = "https://worldofwarcraft.com";
const iconSrc = skill.img ? skill.img : fallbackImg;
let rowContent = "";
rowContent += '';
rowContent += '';
rowContent += '' + displayName + '';
rowContent += '' + classNameFormatted + ' • ' + skill.cat.toUpperCase() + '';
rowContent += '';
itemRow.innerHTML = rowContent;
itemRow.addEventListener("click", () => {
document.querySelectorAll(".library-item-row").forEach(r => r.classList.remove("selected-active"));
itemRow.classList.add("selected-active");
addSkillToMacro(skill);
});
skillsGroup.appendChild(itemRow);
});
}
function addSkillToMacro(skillObj) {
selectedSkillsSequence.push(skillObj);
updateMacroDisplay();
}
// Atualização e montagem do script final da macro considerando o idioma ativo
function updateMacroDisplay() {
if (selectedSkillsSequence.length === 0) {
macroOutput.value = "";
charCount.innerText = "0";
currentMacroName.innerText = "Selecione uma skill";
return;
}
const lastSkillObj = selectedSkillsSequence[selectedSkillsSequence.length - 1];
const lastSkillName = currentLanguage === "pt" ? (lastSkillObj.pt || lastSkillObj.en) : (lastSkillObj.en || lastSkillObj.pt);
currentMacroName.innerText = lastSkillName;
// Converte toda a lista de objetos para os nomes corretos do idioma atual
const skillNamesList = selectedSkillsSequence.map(s => currentLanguage === "pt" ? (s.pt || s.en) : (s.en || s.pt));
let generatedText = "#showtooltip " + lastSkillName + "\n";
if (skillNamesList.length === 1) {
generatedText += "/cast " + skillNamesList[0];
} else {
generatedText += "/castsequence reset=combat/target " + skillNamesList.join(", ");
}
macroOutput.value = generatedText;
charCount.innerText = String(generatedText.length);
if (generatedText.length > 255) {
macroOutput.style.color = "#ef5350";
} else {
macroOutput.style.color = "#a3b6cc";
}
}
// Ações dos botões inferiores
document.getElementById("btnClearMacro").addEventListener("click", () => {
selectedSkillsSequence = [];
document.querySelectorAll(".library-item-row").forEach(r => r.classList.remove("selected-active"));
updateMacroDisplay();
});
document.getElementById("btnCopy").addEventListener("click", () => {
if (!macroOutput.value) return;
macroOutput.select();
document.execCommand("copy");
alert("Código copiado com sucesso!");
});
document.getElementById("btnInsertBlizzard").addEventListener("click", () => {
if (!macroOutput.value) return;
alert("Injetando macro diretamente no client de World of Warcraft...");
});