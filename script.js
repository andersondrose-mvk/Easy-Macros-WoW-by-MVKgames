/* cspell:disable-file */

const classSkillsDatabase = {
    WARRIOR: [
        { en: "Charge", pt: "Investida", es: "Cargar", cat: "abilities", img: "https://uncyc.org" },
        { en: "Mortal Strike", pt: "Golpe Mortal", es: "Golpe mortal", cat: "abilities", img: "https://uncyc.org" },
        { en: "Bloodthirst", pt: "Sede de Sangue", es: "Sanguinario", cat: "abilities", img: "https://uncyc.org" },
        { en: "Overpower", pt: "Prevalecer", es: "Abrumar", cat: "abilities", img: "https://uncyc.org" },
        { en: "Death Wish", pt: "Desejo de Morte", es: "Deseo de la muerte", cat: "buffs", img: "https://uncyc.org" },
        { en: "Recklessness", pt: "Temeridade", es: "Temeridad", cat: "buffs", img: "https://uncyc.org" },
        { en: "Shield Block", pt: "Bloqueio com Escudo", es: "Bloqueo con escudo", cat: "defensives", img: "https://uncyc.org" },
        { en: "Bloodrage", pt: "Raiva Sangrenta", es: "Ira sangrienta", cat: "utility", img: "https://uncyc.org" }
    ],
    PALADIN: [
        { en: "Crusader Strike", pt: "Golpe do Cruzado", es: "Golpe de cruzado", cat: "abilities", img: "https://uncyc.org" },
        { en: "Judgement", pt: "Julgamento", es: "Sentencia", cat: "abilities", img: "https://uncyc.org" },
        { en: "Divine Storm", pt: "Tempestade Divina", es: "Tormenta divina", cat: "abilities", img: "https://uncyc.org" },
        { en: "Avenging Wrath", pt: "Ira Vingativa", es: "Cólera vengativa", cat: "buffs", img: "https://uncyc.org" },
        { en: "Divine Illumination", pt: "Iluminação Divina", es: "Iluminación divina", cat: "buffs", img: "https://uncyc.org" },
        { en: "Divine Shield", pt: "Escudo Divino", es: "Escudo divino", cat: "defensives", img: "https://uncyc.org" },
        { en: "Hammer of Justice", pt: "Martelo da Justiça", es: "Martillo de justicia", cat: "control", img: "https://uncyc.org" }
    ],
    HUNTER: [
        { en: "Steady Shot", pt: "Tiro Firme", es: "Disparo firme", cat: "abilities", img: "https://uncyc.org" },
        { en: "Multi-Shot", pt: "Tiro Múltiplo", es: "Multidisparo", cat: "abilities", img: "https://uncyc.org" },
        { en: "Aimed Shot", pt: "Tiro Mirado", es: "Disparo de puntería", cat: "abilities", img: "https://uncyc.org" },
        { en: "Explosive Shot", pt: "Tiro Explosivo", es: "Disparo explosivo", cat: "learned", img: "https://uncyc.org" },
        { en: "Rapid Fire", pt: "Tiro Rápido", es: "Fuego rápido", cat: "buffs", img: "https://uncyc.org" },
        { en: "Bestial Wrath", pt: "Ira Bestial", es: "Cólera beastial", cat: "buffs", img: "https://uncyc.org" },
        { en: "Deterrence", pt: "Dissuasão", es: "Disuasión", cat: "defensives", img: "https://uncyc.org" },
        { en: "Kill Command", pt: "Comando para Matar", es: "Matar", cat: "pet", img: "https://uncyc.org" }
    ],
    ROGUE: [
        { en: "Sinister Strike", pt: "Golpe Sinistro", es: "Golpe siniestro", cat: "abilities", img: "https://uncyc.org" },
        { en: "Mutilate", pt: "Mutilar", es: "Mutilar", cat: "abilities", img: "https://uncyc.org" },
        { en: "Eviscerate", pt: "Eviscerar", es: "Eviscerar", cat: "abilities", img: "https://uncyc.org" },
        { en: "Envenom", pt: "Envenenar", es: "Envenenar", cat: "learned", img: "https://uncyc.org" },
        { en: "Adrenaline Rush", pt: "Adrenalina", es: "Subidón de adrenalina", cat: "buffs", img: "https://uncyc.org" },
        { en: "Cold Blood", pt: "Sangue Frio", es: "Sangre fría", cat: "buffs", img: "https://uncyc.org" },
        { en: "Evasion", pt: "Evasão", es: "Evasión", cat: "defensives", img: "https://uncyc.org" },
        { en: "Kidney Shot", pt: "Golpe no Rim", es: "Golpe a los riñones", cat: "control", img: "https://uncyc.org" }
    ],
    PRIEST: [
        { en: "Mind Flay", pt: "Açoite Mental", es: "Tortura mental", cat: "abilities", img: "https://uncyc.org" },
        { en: "Mind Blast", pt: "Impacto Mental", es: "Explosión mental", cat: "abilities", img: "https://uncyc.org" },
        { en: "Shadow Word: Pain", pt: "Palavra das Sombras: Dor", es: "Palabra de Sombras: dolor", cat: "abilities", img: "https://uncyc.org" },
        { en: "Vampiric Touch", pt: "Toque Vampírico", es: "Toque vampírico", cat: "learned", img: "https://uncyc.org" },
        { en: "Power Infusion", pt: "Infusão de Poder", es: "Infusión de poder", cat: "buffs", img: "https://uncyc.org" },
        { en: "Inner Focus", pt: "Foco Interno", es: "Enfoque interno", cat: "buffs", img: "https://uncyc.org" },
        { en: "Psychic Scream", pt: "Grito Psíquico", es: "Alarido psíquico", cat: "control", img: "https://uncyc.org" },
        { en: "Dispersion", pt: "Dispersão", es: "Dispersión", cat: "defensives", img: "https://uncyc.org" }
    ],
    SHAMAN: [
        { en: "Lightning Bolt", pt: "Raio", es: "Descarga de relámpagos", cat: "abilities", img: "https://uncyc.org" },
        { en: "Lava Burst", pt: "Estouro de Lava", es: "Ráfaga de lava", cat: "abilities", img: "https://uncyc.org" },
        { en: "Stormstrike", pt: "Ataque da Tempestade", es: "Golpe de tormenta", cat: "abilities", img: "https://uncyc.org" },
        { en: "Lava Lash", pt: "Açoite de Lava", es: "Latigazo de lava", cat: "learned", img: "https://uncyc.org" },
        { en: "Elemental Mastery", pt: "Maestria Elemental", es: "Maestría elemental", cat: "buffs", img: "https://uncyc.org" },
        { en: "Shamanistic Rage", pt: "Raiva Xamânica", es: "Ira chamánica", cat: "defensives", img: "https://uncyc.org" },
        { en: "Hex", pt: "Praga", es: "Maleficio", cat: "control", img: "https://uncyc.org" }
    ],
    MAGE: [
        { en: "Frostbolt", pt: "Seta de Gelo", es: "Descarga de Escarcha", cat: "abilities", img: "https://uncyc.org" },
        { en: "Fireball", pt: "Bola de Fogo", es: "Bola de Fuego", cat: "abilities", img: "https://uncyc.org" },
        { en: "Arcane Blast", pt: "Impacto Arcano", es: "Explosión arcana", cat: "abilities", img: "https://uncyc.org" },
        { en: "Arcane Power", pt: "Poder Arcano", es: "Poder arcano", cat: "buffs", img: "https://uncyc.org" },
        { en: "Icy Veins", pt: "Veias Geladas", es: "Venas heladas", cat: "buffs", img: "https://uncyc.org" },
        { en: "Ice Block", pt: "Bloco de Gelo", es: "Bloque de hielo", cat: "defensives", img: "https://uncyc.org" },
        { en: "Polymorph", pt: "Polimorfia", es: "Polimorfia", cat: "control", img: "https://uncyc.org" }
    ],
    WARLOCK: [
        { en: "Life Tap", pt: "Conversão de Vida", es: "Transfusión de vida", cat: "abilities", img: "https://uncyc.org" },
        { en: "Corruption", pt: "Corrupção", es: "Corrupción", cat: "abilities", img: "https://uncyc.org" },
        { en: "Curse of Agony", pt: "Maldição da Agonia", es: "Maldición de agonía", cat: "abilities", img: "https://uncyc.org" },
        { en: "Immolate", pt: "Imolação", es: "Inmolar", cat: "abilities", img: "https://uncyc.org" },
        { en: "Drain Life", pt: "Drenar Vida", es: "Drenar vida", cat: "learned", img: "https://uncyc.org" },
        { en: "Drain Soul", pt: "Drenar Alma", es: "Drenar alma", cat: "learned", img: "https://uncyc.org" },
        { en: "Fear", pt: "Medo", es: "Miedo", cat: "learned", img: "https://uncyc.org" },
{ en: "Amplify Curse", pt: "Amplificar Maldição", es: "Maldición amplificada", cat: "buffs", img: "uncyc.org" },
{ en: "Demonic Empowerment", pt: "Empoderamento Demoníaco", es: "Empoderamiento demoníaco", cat: "pet", img: "uncyc.org" }
],
DRUID: [
{ en: "Wrath", pt: "Ira", es: "Cólera", cat: "abilities", img: "uncyc.org" },
{ en: "Starfire", pt: "Fogo Estelar", es: "Fuego estelar", cat: "abilities", img: "uncyc.org" },
{ en: "Shred", pt: "Despedaçar", es: "Triturar", cat: "abilities", img: "uncyc.org" },
{ en: "Mangle", pt: "Mutilar", es: "Destrozar", cat: "learned", img: "uncyc.org" },
{ en: "Tiger's Fury", pt: "Fúria do Tigre", es: "Furia del tigre", cat: "buffs", img: "uncyc.org" },
{ en: "Barkskin", pt: "Pele de Árvore", es: "Piel de corteza", cat: "defensives", img: "uncyc.org" },
{ en: "Cyclone", pt: "Ciclone", es: "Ciclón", cat: "control", img: "uncyc.org" }
],
CONSUMABLES: [
{ en: "Runic Healing Potion", pt: "Poção de Cura Rúnica", es: "Poción de sanación rúnica", cat: "potions", img: "uncyc.org" },
{ en: "Runic Mana Potion", pt: "Poção de Mana Rúnica", es: "Poción de maná rúnica", cat: "potions", img: "uncyc.org" },
{ en: "Potion of Speed", pt: "Poção de Velocidade", es: "Poción de velocidad", cat: "potions", img: "uncyc.org" },
{ en: "Flame Cap", pt: "Gorro de Chama", es: "Sombrero de llama", cat: "other", img: "uncyc.org" }
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
const langSelect = document.getElementById("langSelect");
const skillSearch = document.getElementById("skillSearch");
skillSearch.addEventListener("input", function() {
renderSkillsLibrary();
});
langSelect.addEventListener("change", function() {
renderSkillsLibrary();
updateMacroDisplay();
});
document.querySelectorAll(".class-btn").forEach(function(button) {
button.addEventListener("click", function(e) {
document.querySelectorAll(".class-btn").forEach(function(b) { b.classList.remove("active"); });
e.currentTarget.classList.add("active");
activeClass = e.currentTarget.getAttribute("data-class");
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
skillsGroup.innerHTML = "";
if (!activeClass || !classSkillsDatabase[activeClass]) {
skillsGroup.innerHTML = 'Selecione uma classe à esquerda...';
itemsFoundCounter.innerText = "0 FOUND";
return;
}
const currentLang = langSelect.value;
const searchQuery = skillSearch.value.toLowerCase().trim();
const filteredSkills = classSkillsDatabase[activeClass].filter(function(skill) {
const matchesCategory = (activeCategory === "all" || skill.cat === activeCategory);
let displayName = skill.en;
if (currentLang === "pt") displayName = skill.pt;
if (currentLang === "es") displayName = skill.es;
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
let displayName = skill.en;
if (currentLang === "pt") displayName = skill.pt;
if (currentLang === "es") displayName = skill.es;
const classNameFormatted = activeClass.charAt(0) + activeClass.slice(1).toLowerCase();
// Código puro de concatenação para navegadores locais (Web padrão), forçando a criação física da tag img
itemRow.innerHTML = '' + displayName + '' + classNameFormatted + ' • ' + skill.cat.toUpperCase() + '';
itemRow.addEventListener("click", function() {
document.querySelectorAll(".library-item-row").forEach(function(r) { r.classList.remove("selected-active"); });
itemRow.classList.add("selected-active");
addSkillToMacro(displayName);
});
skillsGroup.appendChild(itemRow);
});
}
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
let generatedText = "#showtooltip " + lastSkill + "\n";
if (selectedSkillsSequence.length === 1) {
generatedText += "/cast " + selectedSkillsSequence[0];
} else {
generatedText += "/castsequence reset=combat/target " + selectedSkillsSequence.join(", ");
}
macroOutput.value = generatedText;
charCount.innerText = generatedText.length;
macroOutput.style.color = generatedText.length > 255 ? "#ef5350" : "#a3b6cc";
}
document.getElementById("btnClearMacro").addEventListener("click", function() {
selectedSkillsSequence = [];
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