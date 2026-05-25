function mod(val) {
    return Math.floor((val - 10) / 2);
}

function init() {
    verificarNivelYResetearHP();
    renderInfo();
    renderStats();
    renderCombat();
    renderRecursos();
    renderSkills();
    initLandSelector(); // Inicializa el Círculo de la Tierra y sus botones
    renderConjuros();
    renderExtras();
}

/* DETECTAR CAMBIO DE NIVEL Y LIMPIAR CACHÉ DE HP */
function verificarNivelYResetearHP() {
    let storedLvl = localStorage.getItem("personaje_nivel");
    if (storedLvl !== String(personaje.nivel)) {
        localStorage.setItem("personaje_nivel", personaje.nivel);
        localStorage.setItem("hp_max", personaje.combate.hp_max);
        localStorage.setItem("hp_actual", personaje.combate.hp_max);
        resetRecursos();
    }
}

/* INFO */
function renderInfo() {
    document.getElementById("nombre").innerText = personaje.nombre;
    document.getElementById("info").innerText =
        `${personaje.clase} (${personaje.subclase}) lvl ${personaje.nivel} - ${personaje.Raza}`;
}

/* STATS */
function renderStats() {
    let container = document.getElementById("stats");
    container.innerHTML = ""; // Limpiar antes de renderizar

    Object.entries(personaje.stats).forEach(([key, val]) => {
        let m = mod(val);

        container.innerHTML += `
            <div class="box">
                <b>${key.toUpperCase()}</b>
                <div>${val}</div>
                <div>${m >= 0 ? "+" : ""}${m}</div>
            </div>
        `;
    });
}

/* COMBAT */
function renderCombat() {
    const c = personaje.combate;

    document.getElementById("combate").innerHTML = `
        <div class="hp-box">
            <span>🛡️ CA: ${c.ca} &nbsp;&nbsp;&nbsp;&nbsp; 🏃 Velocidad: ${c.velocidad}</span>

            <div class="hp-inputs">
                ❤️ 
                <input type="number" id="hpActual" value="${localStorage.getItem("hp_actual") || c.hp_actual}">
                /
                <input type="number" id="hpMax" value="${localStorage.getItem("hp_max") || c.hp_max}">
            </div>

            <div class="hp-bar-container">
                <div class="hp-bar" id="hpBar"></div>
                <div class="hp-temp" id="hpTemp"></div>
            </div>
        </div>
    `;

    bindHPEvents();
    actualizarHP();
}

/* HP LOGIC */
function actualizarHP() {
    let actualInput = document.getElementById("hpActual");
    let maxInput = document.getElementById("hpMax");
    if (!actualInput || !maxInput) return;

    let actual = parseInt(actualInput.value);
    let max = parseInt(maxInput.value);

    if (max <= 0) max = 1;
    if (actual < 0) actual = 0;

    const hpBar = document.getElementById("hpBar");
    const hpTemp = document.getElementById("hpTemp");

    let normal = Math.min(actual, max);
    let temp = Math.max(actual - max, 0);

    let normalPercent = (normal / max) * 100;
    let tempPercent = (temp / max) * 100;

    /* VIDA NORMAL */
    hpBar.style.width = normalPercent + "%";

    if (normalPercent > 60) hpBar.style.background = "#4caf50";
    else if (normalPercent > 30) hpBar.style.background = "#ffc107";
    else hpBar.style.background = "#f44336";

    /* VIDA TEMPORAL */
    hpTemp.style.width = tempPercent + "%";
    localStorage.setItem("hp_actual", actual);
    localStorage.setItem("hp_max", max);
}

function bindHPEvents() {
    document.getElementById("hpActual").addEventListener("input", actualizarHP);
    document.getElementById("hpMax").addEventListener("input", actualizarHP);
}

/* RECURSOS INTERACTIVOS (FORMA SALVAJE Y ESPACIOS) */
function renderRecursos() {
    let container = document.getElementById("recursos");
    if (!container) return;

    container.innerHTML = `
        <div class="recursos-wrapper">
            <div class="recurso-group">
                <div class="recurso-header">
                    <span>🦊 Forma Salvaje</span>
                    <span class="recurso-count" id="count-forma_salvaje"></span>
                </div>
                <div class="slots-container" id="slots-forma_salvaje"></div>
            </div>
            
            <div class="recurso-group">
                <div class="recurso-header">
                    <span>🔮 Espacios Hechizo Nivel 1</span>
                    <span class="recurso-count" id="count-conjuros_l1"></span>
                </div>
                <div class="slots-container" id="slots-conjuros_l1"></div>
            </div>

            <div class="recurso-group">
                <div class="recurso-header">
                    <span>🔮 Espacios Hechizo Nivel 2</span>
                    <span class="recurso-count" id="count-conjuros_l2"></span>
                </div>
                <div class="slots-container" id="slots-conjuros_l2"></div>
            </div>

            <div class="recurso-group">
                <div class="recurso-header">
                    <span>✨ Detectar Magia (Linaje Élfico)</span>
                    <span class="recurso-count" id="count-detectar_magia"></span>
                </div>
                <div class="slots-container" id="slots-detectar_magia"></div>
            </div>

            <div class="rest-buttons">
                <button class="rest-btn short-rest" id="btnShortRest">🔋 Descanso Corto</button>
                <button class="rest-btn long-rest" id="btnLongRest">🏕️ Descanso Largo</button>
            </div>
        </div>
    `;

    renderSlotsGroup("forma_salvaje", personaje.recursos.forma_salvaje.max, "celeste");
    renderSlotsGroup("conjuros_l1", personaje.recursos.conjuros_l1.max, "azul");
    renderSlotsGroup("conjuros_l2", personaje.recursos.conjuros_l2.max, "azul");
    renderSlotsGroup("detectar_magia", personaje.recursos.detectar_magia.max, "oro");

    document.getElementById("btnShortRest").addEventListener("click", realizarDescansoCorto);
    document.getElementById("btnLongRest").addEventListener("click", realizarDescansoLargo);
}

function renderSlotsGroup(key, max, colorClass) {
    let states = getRecursoEstado(key, max);
    let slotsContainer = document.getElementById(`slots-${key}`);
    let countLabel = document.getElementById(`count-${key}`);
    
    if (!slotsContainer || !countLabel) return;
    
    slotsContainer.innerHTML = "";
    let activeCount = states.filter(Boolean).length;
    countLabel.innerText = `${activeCount} / ${max}`;

    states.forEach((isActive, idx) => {
        let slot = document.createElement("div");
        slot.className = `resource-slot ${colorClass} ${isActive ? "active" : "spent"}`;
        slot.setAttribute("role", "checkbox");
        slot.setAttribute("aria-checked", isActive);
        
        slot.addEventListener("click", () => {
            states[idx] = !states[idx];
            setRecursoEstado(key, states);
            renderSlotsGroup(key, max, colorClass);
        });

        slotsContainer.appendChild(slot);
    });
}

function getRecursoEstado(key, max) {
    let val = localStorage.getItem("recurso_" + key);
    if (val) {
        try {
            let arr = JSON.parse(val);
            if (arr.length === max) return arr;
        } catch(e) {}
    }
    return Array(max).fill(true);
}

function setRecursoEstado(key, arr) {
    localStorage.setItem("recurso_" + key, JSON.stringify(arr));
}

function resetRecurso(key, max) {
    let arr = Array(max).fill(true);
    setRecursoEstado(key, arr);
}

function realizarDescansoCorto() {
    // Recupera 1 uso de Forma Salvaje en Descanso Corto (Reglas D&D 2024)
    let key = "forma_salvaje";
    let max = personaje.recursos.forma_salvaje.max;
    let states = getRecursoEstado(key, max);
    
    let spentIndex = states.indexOf(false); // Primer slot vacío
    if (spentIndex !== -1) {
        states[spentIndex] = true;
        setRecursoEstado(key, states);
        renderSlotsGroup(key, max, "celeste");
        alert("🔋 ¡Descanso corto realizado! Has recuperado 1 uso de Forma Salvaje.");
    } else {
        alert("🔋 ¡Descanso corto realizado! Tus usos de Forma Salvaje ya estaban al máximo.");
    }
}

function realizarDescansoLargo() {
    // Restaura Forma Salvaje, todos los Conjuros y el conjuro de Linaje
    resetRecurso("forma_salvaje", personaje.recursos.forma_salvaje.max);
    resetRecurso("conjuros_l1", personaje.recursos.conjuros_l1.max);
    resetRecurso("conjuros_l2", personaje.recursos.conjuros_l2.max);
    resetRecurso("detectar_magia", personaje.recursos.detectar_magia.max);

    // Restaura vida máxima
    let maxHP = parseInt(document.getElementById("hpMax").value) || personaje.combate.hp_max;
    document.getElementById("hpActual").value = maxHP;
    actualizarHP();

    renderSlotsGroup("forma_salvaje", personaje.recursos.forma_salvaje.max, "celeste");
    renderSlotsGroup("conjuros_l1", personaje.recursos.conjuros_l1.max, "azul");
    renderSlotsGroup("conjuros_l2", personaje.recursos.conjuros_l2.max, "azul");
    renderSlotsGroup("detectar_magia", personaje.recursos.detectar_magia.max, "oro");
    
    alert("🏕️ ¡Descanso largo realizado! Se restauró tu salud y todos tus recursos.");
}

function resetRecursos() {
    resetRecurso("forma_salvaje", personaje.recursos.forma_salvaje.max);
    resetRecurso("conjuros_l1", personaje.recursos.conjuros_l1.max);
    resetRecurso("conjuros_l2", personaje.recursos.conjuros_l2.max);
    resetRecurso("detectar_magia", personaje.recursos.detectar_magia.max);
}

/* SKILLS */
function renderSkills() {
    let container = document.getElementById("skills");
    container.innerHTML = ""; // Limpiar antes de renderizar

    Object.entries(personaje.skills).forEach(([name, data]) => {
        let baseMod = mod(personaje.stats[data.stat]);
        let total = baseMod + (data.prof ? personaje.proficiency : 0);
        let displayName = formatSkillName(name);

        container.innerHTML += `
            <div class="skill">
                <span>${data.prof ? "●" : "○"} ${displayName}</span>
                <span>${total >= 0 ? "+" : ""}${total}</span>
            </div>
        `;
    });
}

function formatSkillName(name) {
    let formatted = name.replace(/_/g, " ");
    
    // Correcciones ortográficas y de formato específicas
    const traducciones = {
        "juego manos": "Juego de manos",
        "trato animales": "Trato con animales",
        "engaño": "Engaño",
        "interpretacion": "Interpretación",
        "intimidacion": "Intimidación",
        "investigacion": "Investigación",
        "percepcion": "Percepción",
        "persuasion": "Persuasión",
        "religion": "Religión"
    };

    if (traducciones[name]) return traducciones[name];
    if (traducciones[formatted]) return traducciones[formatted];
    
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/* CONJUROS + EXTRAS */
function renderConjuros() {
    let html = "";

    // 1. Renderizar conjuros base preparados
    personaje.Conjuros.forEach(c => {
        html += `<div class="spell-item"><b>${c.nombre}</b> <span class="spell-bono">(${c.bono})</span>: <span class="spell-dmg">${c.daño}</span></div>`;
    });

    // 2. Renderizar conjuros adicionales de la sintonía de la Tierra
    let activeLand = localStorage.getItem("land_type") || "polar";
    let landSpells = CONJUROS_TIERRA[activeLand].conjuros;
    
    html += `<div style="margin-top: 15px; margin-bottom: 8px; font-weight: bold; font-size: 1.15em; color: #8d5c46; border-bottom: 1px dashed #8d5c46; padding-bottom: 3px;">📖 Conjuros del Círculo (Tierra: ${CONJUROS_TIERRA[activeLand].nombre})</div>`;
    
    landSpells.forEach(c => {
        html += `<div class="spell-item" style="border-left: 3px solid #8d5c46; background: rgba(141, 92, 70, 0.08);"><b>${c.nombre}</b> <span class="spell-bono">(${c.bono})</span>: <span class="spell-dmg">${c.daño}</span></div>`;
    });

    document.getElementById("Conjuros").innerHTML = html;
}

function renderExtras() {
    let activeLand = localStorage.getItem("land_type") || "polar";
    let landCantrip = CONJUROS_TIERRA[activeLand].trucos[0];
    
    let trucosConCirculo = [...personaje.Trucos, landCantrip];
    document.getElementById("Trucos").innerHTML = trucosConCirculo.join(" • ");

    document.getElementById("equipo").innerHTML =
        "<ul>" + personaje.equipo.map(e => `<li>${e}</li>`).join("") + "</ul>";
    
    let notasHtml = "<ul>" + personaje.notas.map(n => `<li>${n.trim()}</li>`).join("") + "</ul>";
    document.getElementById("notas").innerHTML = notasHtml;
}

/* INIT */
document.addEventListener("DOMContentLoaded", init);

/* LÓGICA DEL CÍRCULO DE LA TIERRA Y RASGOS DE CLASE (D&D 2024) */
const CONJUROS_TIERRA = {
    arid: {
        nombre: "Árida 🏜️",
        trucos: ["Descarga de fuego (Fire Bolt) [Círculo] (+6 para golpear, 1d10 fuego, 120 pies)"],
        conjuros: [
            { nombre: "Manos ardientes (Lvl 1) [Círculo]", bono: "CD 14", daño: "Cono de 15 pies, 3d6 fuego (Salv. Des mitad)" },
            { nombre: "Desenfocar (Lvl 2) [Círculo]", bono: "+0", daño: "Los ataques contra ti tienen desventaja (Concentración, 1 minuto)" }
        ]
    },
    polar: {
        nombre: "Polar ❄️",
        trucos: ["Rayo de escarcha (Ray of Frost) [Círculo] (+6 para golpear, 1d8 frío y reduce velocidad 10 pies, 60 pies)"],
        conjuros: [
            { nombre: "Nube de niebla (Lvl 1) [Círculo]", bono: "+0", daño: "Crea una esfera de niebla de 20 pies de radio (Concentración, 1 hora)" },
            { nombre: "Retener persona (Lvl 2) [Círculo]", bono: "CD 14", daño: "Paraliza a un humanoide a 60 pies (Salv. Sab al final de su turno)" }
        ]
    },
    temperate: {
        nombre: "Templada 🍃",
        trucos: ["Agarre de choque (Shocking Grasp) [Círculo] (+6 para golpear cuerpo a cuerpo, 1d8 eléc. y cancela Reacción del enemigo)"],
        conjuros: [
            { nombre: "Dormir (Lvl 1) [Círculo]", bono: "+0", daño: "Pone a dormir a criaturas en un área (5d8 HP totales)" },
            { nombre: "Paso brumoso (Lvl 2) [Círculo]", bono: "+0", daño: "Te teletransportas hasta 30 pies a un lugar que veas (Acción Adicional)" }
        ]
    },
    tropical: {
        nombre: "Tropical 🌴",
        trucos: ["Salpicadura de ácido (Acid Splash) [Círculo] (CD 14, 1d6 ácido a 1 o 2 objetivos a 5 pies, 60 pies)"],
        conjuros: [
            { nombre: "Rayo de enfermedad (Lvl 1) [Círculo]", bono: "+6", daño: "2d8 veneno y envenena si falla salv. Con (Alcance 60 pies)" },
            { nombre: "Telaraña (Lvl 2) [Círculo]", bono: "CD 14", daño: "Llena área de 20 pies de telarañas que restringen (Salv. Des)" }
        ]
    }
};

function initLandSelector() {
    let currentLand = localStorage.getItem("land_type") || "polar";
    localStorage.setItem("land_type", currentLand);
    actualizarBotonesSelector(currentLand);

    // Enlazar eventos de botones de bioma
    document.getElementById("btn-land-arid").addEventListener("click", () => setLand("arid"));
    document.getElementById("btn-land-polar").addEventListener("click", () => setLand("polar"));
    document.getElementById("btn-land-temperate").addEventListener("click", () => setLand("temperate"));
    document.getElementById("btn-land-tropical").addEventListener("click", () => setLand("tropical"));
    
    // Enlazar evento de Ayuda de la Tierra
    document.getElementById("btn-lands-aid").addEventListener("click", realizarAyudaDeLaTierra);
}

function setLand(landType) {
    localStorage.setItem("land_type", landType);
    actualizarBotonesSelector(landType);
    renderConjuros();
    renderExtras();
}

function actualizarBotonesSelector(activeLand) {
    const lands = ["arid", "polar", "temperate", "tropical"];
    lands.forEach(land => {
        const btn = document.getElementById(`btn-land-${land}`);
        if (btn) {
            if (land === activeLand) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        }
    });

    const descSpan = document.getElementById("subclass-desc");
    if (descSpan) {
        let biomaName = CONJUROS_TIERRA[activeLand].nombre;
        descSpan.innerHTML = `Sintonizado con el bioma <strong>${biomaName}</strong>. Tienes preparados sus conjuros de círculo asociados de forma gratuita.`;
    }
}

function realizarAyudaDeLaTierra() {
    let key = "forma_salvaje";
    let max = personaje.recursos.forma_salvaje.max;
    let states = getRecursoEstado(key, max);
    
    let activeIndex = states.indexOf(true); // Encuentra la primera disponible
    if (activeIndex === -1) {
        alert("❌ No te quedan usos disponibles de Forma Salvaje para activar la Ayuda de la Tierra.");
        return;
    }

    // Gasta 1 uso
    states[activeIndex] = false;
    setRecursoEstado(key, states);
    renderSlotsGroup(key, max, "celeste");

    alert(`💥 ¡ACTIVADO: Ayuda de la Tierra!
Has gastado 1 uso de tu Forma Salvaje.

Efecto en esfera de 10 pies de radio a 60 pies:
• Cada criatura elegida debe hacer una salvación de Con CD 14 o sufrir 2d6 de daño Necrótico (mitad si tiene éxito).
• Un aliado de tu elección dentro del área recupera 2d6 Puntos de Golpe.`);
}