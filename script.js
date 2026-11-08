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
{ en: "Mangle", pt: "Mutilar", cat: "abilities", img: "worldofwarcraft.com" },
{ en: "Tiger's Fury", pt: "Fúria do Tigre", cat: "buffs", img: "worldofwarcraft.com" },
{ en: "Barkskin", pt: "Pele de Árvore", cat: "defensives", img: "worldofwarcraft.com" },
{ en: "Cyclone", pt: "Ciclone", cat: "control", img: "worldofwarcraft.com" }
],
CONSUMABLES: [
{ en: "Runic Healing Potion", pt: "Poção de Cura Rúnica", cat: "potions", img: "worldofwarcraft.com" },
{ en: "Runic Mana Potion", pt: "Poção de Mana Rúnica", cat: "potions", img: "worldofwarcraft.com" },
{ en: "Potion of Speed", pt: "Poção de Velocidade", cat: "potions", img: "worldofwarcraft.com" },
{ en: "Flame Cap", pt: "Gorro de Chama", cat: "other", img: "worldofwarcraft.com" }
]
};