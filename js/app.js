function mod(val) {
    return Math.floor((val - 10) / 2);
}

function init() {
    renderInfo();
    renderStats();
    renderCombat();
    renderSkills();
    renderConjuros();
    renderExtras();
}

/* INFO */
function renderInfo() {
    document.getElementById("nombre").innerText = personaje.nombre;
    document.getElementById("info").innerText =
        `${personaje.clase} lvl ${personaje.nivel} - ${personaje.Raza}`;
}

/* STATS */
function renderStats() {
    let container = document.getElementById("stats");

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
            <span>🛡️ CA: ${c.ca}</span>

            <div class="hp-inputs">
                ❤️ 
                <input type="number" id="hpActual" value="${c.hp_actual}">
                /
                <input type="number" id="hpMax" value="${c.hp_max}">
            </div>

            <div class="hp-bar-container">
                <div class="hp-bar" id="hpBar"></div>
            </div>
        </div>
    `;

    bindHPEvents();
    actualizarHP();
}

/* HP LOGIC */
function actualizarHP() {
    let actual = parseInt(document.getElementById("hpActual").value);
    let max = parseInt(document.getElementById("hpMax").value);

    if (max <= 0) max = 1;
    if (actual < 0) actual = 0;
    if (actual > max) actual = max;

    const porcentaje = (actual / max) * 100;
    const barra = document.getElementById("hpBar");

    barra.style.width = porcentaje + "%";

    if (porcentaje > 60) barra.style.background = "#4caf50";
    else if (porcentaje > 30) barra.style.background = "#ffc107";
    else barra.style.background = "#f44336";
}

function bindHPEvents() {
    document.getElementById("hpActual").addEventListener("input", actualizarHP);
    document.getElementById("hpMax").addEventListener("input", actualizarHP);
}

/* SKILLS */
function renderSkills() {
    let container = document.getElementById("skills");

    Object.entries(personaje.skills).forEach(([name, data]) => {
        let baseMod = mod(personaje.stats[data.stat]);
        let total = baseMod + (data.prof ? personaje.proficiency : 0);

        container.innerHTML += `
            <div class="skill">
                <span>${data.prof ? "●" : "○"} ${name}</span>
                <span>${total >= 0 ? "+" : ""}${total}</span>
            </div>
        `;
    });
}

/* CONJUROS + EXTRAS */
function renderConjuros() {
    let html = "";

    personaje.Conjuros.forEach(c => {
        html += `<div><b>${c.nombre}</b> (${c.bono})</div>`;
    });

    document.getElementById("Conjuros").innerHTML = html;
}

function renderExtras() {
    document.getElementById("Trucos").innerHTML = personaje.Trucos.join(" • ");
    document.getElementById("equipo").innerHTML =
        "<ul>" + personaje.equipo.map(e => `<li>${e}</li>`).join("") + "</ul>";
    document.getElementById("notas").innerText = personaje.notas;
}

/* INIT */
document.addEventListener("DOMContentLoaded", init);