const uiTranslations = {
    pt: {
        title: "FOREVER MACRO CREATOR <span class='version'>by MVK</span>",
        langLbl: "IDIOMA:", colClasses: "CLASSES", colCategories: "CATEGORIAS", colBuilder: "CONSTRUTOR DE MACRO",
        skillsLbl: "Habilidades Disponíveis:", modsLbl: "Modificadores Globais:", emptyNotice: "Selecione uma classe à esquerda...",
        t13: "Usar Slot Berloque 13", t14: "Usar Slot Berloque 14", pot: "Usar Poção Automática",
        finalLbl: "Feitiço de Encerramento (Com GCD):", scriptLbl: "Script Gerado Final",
        btnGenerate: "GERAR COMBO", btnCopy: "COPIAR CÓDIGO", alertParams: "Por favor, selecione parâmetros para gerar a macro!",
        alertCopy: "Código copiado para a área de transferência!", potionItem: "Poção", cdText: "CD",
        resetLbl: "Condição de Reset:", resetSecsLbl: "Tempo de Reset (em segundos):"
    },
    en: {
        title: "FOREVER MACRO CREATOR <span class='version'>by MVK</span>",
        langLbl: "LANGUAGE:", colClasses: "CLASSES", colCategories: "CATEGORIES", colBuilder: "MACRO BUILDER",
        skillsLbl: "Available Skills:", modsLbl: "Global Modifiers:", emptyNotice: "Select a class on the left...",
        t13: "Use Trinket Slot 13", t14: "Use Trinket Slot 14", pot: "Use Automatic Potion",
        finalLbl: "Finishing Spell (With GCD):", scriptLbl: "Final Generated Script",
        btnGenerate: "GENERATE COMBO", btnCopy: "COPY CODE", alertParams: "Please select parameters to generate the macro!",
        alertCopy: "Code copied to clipboard!", potionItem: "Potion", cdText: "CD",
        resetLbl: "Reset Condition:", resetSecsLbl: "Reset Time (in seconds):"
    },
    es: {
        title: "FOREVER MACRO CREATOR <span class='version'>by MVK</span>",
        langLbl: "IDIOMA:", colClasses: "CLASES", colCategories: "CATEGORÍAS", colBuilder: "CONSTRUCTOR DE MACROS",
        skillsLbl: "Habilidades Disponibles:", modsLbl: "Modificadores Globales:", emptyNotice: "Selecciona una clase a la izquierda...",
        t13: "Usar Ranura de Abalorio 13", t14: "Usar Ranura de Abalorio 14", pot: "Usar Poción Automática",
        finalLbl: "Hechizo Finalizador (Con GCD):", scriptLbl: "Script Gerado Final",
        btnGenerate: "GENERAR COMBO", btnCopy: "COPIAR CÓDIGO", alertParams: "¡Por favor, seleccione parâmetros para generar la macro!",
        alertCopy: "¡Código copiado al portapapeles!", potionItem: "Poción", cdText: "CD",
        resetLbl: "Condición de Reset:", resetSecsLbl: "Tiempo de Reset (en segundos):"
    }
};

const classSkillsDatabase = {
    WARRIOR: [
        { en: "Death Wish", pt: "Desejo de Morte", es: "Deseo de la Muerte", cd: 180, gcd: false },
        { en: "Recklessness", pt: "Temeridade", es: "Temeridad", cd: 1800, gcd: false },
        { en: "Bloodrage", pt: "Raiva Sangrenta", es: "Ira sangrienta", cd: 60, gcd: false },
        { en: "Heroic Strike", pt: "Golpe Heroico", es: "Golpe heroico", cd: 0, gcd: false },
        { en: "Blood Fury", pt: "Fúria Sangrenta", es: "Furia sangrienta", cd: 120, gcd: false }
    ],
    PALADIN: [
        { en: "Avenging Wrath", pt: "Ira Vingativa", es: "Cólera vengativa", cd: 180, gcd: false },
        { en: "Divine Illumination", pt: "Iluminação Divina", es: "Iluminación divina", cd: 180, gcd: false },
        { en: "Divine Favor", pt: "Favor Divino", es: "Favor divino", cd: 120, gcd: false }
    ],
    MAGE: [
        { en: "Arcane Power", pt: "Poder Arcano", es: "Poder arcano", cd: 120, gcd: false },
        { en: "Icy Veins", pt: "Veias Geladas", es: "Venas heladas", cd: 180, gcd: false },
        { en: "Presence of Mind", pt: "Presença de Espírito", es: "Presencia de la mente", cd: 180, gcd: false }
    ],
    ROGUE: [
        { en: "Cold Blood", pt: "Sangue Frio", es: "Sangre fría", cd: 180, gcd: false },
        { en: "Blade Flurry", pt: "Alvo de Lâminas", es: "Aluvión de acero", cd: 120, gcd: false },
        { en: "Adrenaline Rush", pt: "Adrenalina", es: "Subidón de adrenaline", cd: 300, gcd: false }
    ],
    HUNTER: [
        { en: "Rapid Fire", pt: "Tiro Rápido", es: "Fuego rápido", cd: 300, gcd: false },
        { en: "Bestial Wrath", pt: "Ira Bestial", es: "Cólera bestial", cd: 120, gcd: false },
        { en: "Readiness", pt: "Prontidão", es: "Disposición", cd: 300, gcd: false }
    ],
    SHAMAN: [
        { en: "Elemental Mastery", pt: "Maestria Elemental", es: "Maestría elemental", cd: 180, gcd: false },
        { en: "Nature's Swiftness", pt: "Celeridade da Natureza", es: "Presteza de la naturaleza", cd: 180, gcd: false }
    ],
    DRUID: [
        { en: "Nature's Swiftness", pt: "Celeridade da Natureza", es: "Presteza de la naturaleza", cd: 180, gcd: false },
        { en: "Tiger's Fury", pt: "Fúria do Tigre", es: "Furia del tigre" , cd: 6, gcd: false }
    ],
    WARLOCK: [
        { en: "Amplified Curse", pt: "Amplificar Maldição", es: "Maldición amplificada", cd: 180, gcd: false },
        { en: "Curse of Agony", pt: "Maldição da Agonia", es: "Maldición de agonía", cd: 0, gcd: true },
        { en: "Corruption", pt: "Corrupção", es: "Corrupción", cd: 0, gcd: true }
    ],
    PRIEST: [
        { en: "Inner Focus", pt: "Foco Interno", es: "Enfoque interno", cd: 180, gcd: false },
        { en: "Power Infusion", pt: "Infusão de Poder", es: "Infusión de poder", cd: 180, gcd: false }
    ]
};

let activeClass = "";
const langSelect = document.getElementById("langSelect");
const resetSelect = document.getElementById("resetSelect");
const resetSecsContainer = document.getElementById("resetSecsContainer");
const skillsGroup = document.getElementById("skillsGroup");
const macroOutput = document.getElementById("macroOutput");
const charCount = document.getElementById("charCount");

const uiElements = {
    title: document.getElementById("ui-title"), langLbl: document.getElementById("ui-lang-lbl"),
    colClasses: document.getElementById("ui-col-classes"), colCategories: document.getElementById("ui-col-categories"),
    colBuilder: document.getElementById("ui-col-builder"), skillsLbl: document.getElementById("ui-skills-lbl"),
    modsLbl: document.getElementById("ui-mods-lbl"), t13: document.getElementById("ui-t13"),
    t14: document.getElementById("ui-t14"), pot: document.getElementById("ui-pot"),
    finalLbl: document.getElementById("ui-final-lbl"), scriptLbl: document.getElementById("ui-script-lbl"),
    btnGenerate: document.getElementById("btnGenerate"), btnCopy: document.getElementById("btnCopy"),
    resetLbl: document.getElementById("ui-reset-lbl"), resetSecsLbl: document.getElementById("ui-reset-secs-lbl")
};

function toggleResetInput() {
    resetSecsContainer.classList.toggle("hidden", resetSelect.value !== "seconds");
}

function traduzirInterface() {
    const currentLang = langSelect.value;
    const txt = uiTranslations[currentLang];
    Object.keys(uiElements).forEach(key => {
        if(key === 'title') uiElements[key].innerHTML = txt[key];
        else uiElements[key].innerText = txt[key];
    });
    renderSkillsList();
}

langSelect.addEventListener("change", traduzirInterface);

document.querySelectorAll(".class-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".class-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        activeClass = e.target.getAttribute("data-class");
        renderSkillsList();
    });
});

function renderSkillsList() {
    skillsGroup.innerHTML = "";
    const currentLang = langSelect.value;
    if (!activeClass) {
        skillsGroup.innerHTML = `<div class="empty-notice">${uiTranslations[currentLang].emptyNotice}</div>`;
        return;
    }
    classSkillsDatabase[activeClass].forEach((skill, idx) => {
        const label = document.createElement("label");
        label.className = "wow-checkbox";
        const mainName = skill[currentLang] || skill.en;
        const cdText = skill.cd > 0 ? ` [${skill.cd}s ${uiTranslations[currentLang].cdText}]` : ` [No ${uiTranslations[currentLang].cdText}]`;
        label.innerHTML = `<input type="checkbox" value="${idx}"> ${mainName} <span style="color:#555; font-size:0.75rem">${cdText}</span>`;
        skillsGroup.appendChild(label);
    });
}

document.getElementById("btnGenerate").addEventListener("click", () => {
    const currentLang = langSelect.value;
    const txt = uiTranslations[currentLang];
    const checkedBoxes = document.querySelectorAll("#skillsGroup input:checked");
    const useTrinket13 = document.getElementById("useTrinket13").checked;
    const useTrinket14 = document.getElementById("useTrinket14").checked;
    const usePotion = document.getElementById("usePotion").checked;
    const finalSkill = document.getElementById("finalSkill").value.trim();

    if (checkedBoxes.length === 0 && !useTrinket13 && !useTrinket14 && !usePotion && !finalSkill) {
        alert(txt.alertParams);
        return;
    }

    let macroLines = ["#showtooltip"];
    let castSequenceList = [];

    checkedBoxes.forEach(box => {
        const skillIdx = box.value;
        const skillObj = classSkillsDatabase[activeClass][skillIdx];
        const localizedName = skillObj[currentLang] || skillObj.en;
        if (skillObj.gcd) {
            castSequenceList.push(localizedName);
        } else {
            macroLines.push("/cast " + localizedName);
        }
    });

    if (useTrinket13) macroLines.push("/use 13");
    if (useTrinket14) macroLines.push("/use 14");
    if (usePotion) macroLines.push("/use " + txt.potionItem);

    let resetRule = resetSelect.value === "seconds" ? (document.getElementById("resetSeconds").value || "5") : resetSelect.value;

    if (castSequenceList.length > 0) {
        if (finalSkill !== "") castSequenceList.push(finalSkill);
        macroLines.push("/castsequence reset=" + resetRule + " " + castSequenceList.join(", "));
    } else if (finalSkill !== "") {
        macroLines.push("/cast " + finalSkill);
    }

    const finalText = macroLines.join("\n");
macroOutput.value = finalText;
charCount.innerText = finalText.length;
macroOutput.style.color = finalText.length > 255 ? "#ef5350" : "#64ffda";
});
document.getElementById("btnCopy").addEventListener("click", () => {
if (!macroOutput.value) return;
macroOutput.select();
document.execCommand("copy");
alert(uiTranslations[langSelect.value].alertCopy);
});
window.toggleResetInput = toggleResetInput;
traduzirInterface();