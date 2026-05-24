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

            <div class="rest-buttons">
                <button class="rest-btn short-rest" id="btnShortRest">🔋 Descanso Corto</button>
                <button class="rest-btn long-rest" id="btnLongRest">🏕️ Descanso Largo</button>
            </div>
        </div>
    `;

    renderSlotsGroup("forma_salvaje", personaje.recursos.forma_salvaje.max, "celeste");
    renderSlotsGroup("conjuros_l1", personaje.recursos.conjuros_l1.max, "azul");
    renderSlotsGroup("conjuros_l2", personaje.recursos.conjuros_l2.max, "azul");

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
    // Restaura Forma Salvaje
    resetRecurso("forma_salvaje", personaje.recursos.forma_salvaje.max);
    renderSlotsGroup("forma_salvaje", personaje.recursos.forma_salvaje.max, "celeste");
    alert("🔋 ¡Descanso corto realizado! Se ha restaurado tu Forma Salvaje.");
}

function realizarDescansoLargo() {
    // Restaura Forma Salvaje y todos los Conjuros
    resetRecurso("forma_salvaje", personaje.recursos.forma_salvaje.max);
    resetRecurso("conjuros_l1", personaje.recursos.conjuros_l1.max);
    resetRecurso("conjuros_l2", personaje.recursos.conjuros_l2.max);

    // Restaura vida máxima
    let maxHP = parseInt(document.getElementById("hpMax").value) || personaje.combate.hp_max;
    document.getElementById("hpActual").value = maxHP;
    actualizarHP();

    renderSlotsGroup("forma_salvaje", personaje.recursos.forma_salvaje.max, "celeste");
    renderSlotsGroup("conjuros_l1", personaje.recursos.conjuros_l1.max, "azul");
    renderSlotsGroup("conjuros_l2", personaje.recursos.conjuros_l2.max, "azul");
    
    alert("🏕️ ¡Descanso largo realizado! Se restauró tu salud y todos tus recursos.");
}

function resetRecursos() {
    resetRecurso("forma_salvaje", personaje.recursos.forma_salvaje.max);
    resetRecurso("conjuros_l1", personaje.recursos.conjuros_l1.max);
    resetRecurso("conjuros_l2", personaje.recursos.conjuros_l2.max);
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

    personaje.Conjuros.forEach(c => {
        html += `<div class="spell-item"><b>${c.nombre}</b> <span class="spell-bono">(${c.bono})</span>: <span class="spell-dmg">${c.daño}</span></div>`;
    });

    document.getElementById("Conjuros").innerHTML = html;
}

function renderExtras() {
    document.getElementById("Trucos").innerHTML = personaje.Trucos.join(" • ");
    document.getElementById("equipo").innerHTML =
        "<ul>" + personaje.equipo.map(e => `<li>${e}</li>`).join("") + "</ul>";
    
    let notasHtml = "<ul>" + personaje.notas.map(n => `<li>${n.trim()}</li>`).join("") + "</ul>";
    document.getElementById("notas").innerHTML = notasHtml;
}

/* INIT */
document.addEventListener("DOMContentLoaded", init);