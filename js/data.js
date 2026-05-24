const personaje = {
    nombre: "Labrob",
    clase: "Druida",
    subclase: "Círculo de la Luna",
    nivel: 3,
    Raza: "Alto Elfo",
    alineamiento: "Neutral",
    xp: 0,

    proficiency: 2,

    stats: {
        str: 12,
        dex: 12,
        con: 14,
        int: 11,
        wis: 16,
        cha: 9
    },

    combate: {
        ca: 14,
        velocidad: "30pies",
        hp_max: 25,
        hp_actual: 25,
        hp_temp: 0
    },

    recursos: {
        forma_salvaje: { actual: 2, max: 2 },
        conjuros_l1: { actual: 4, max: 4 },
        conjuros_l2: { actual: 2, max: 2 }
    },

    skills: {
        acrobacias: { stat: "dex", prof: false },
        atletismo: { stat: "str", prof: false },
        arcano: { stat: "int", prof: false },
        engaño: { stat: "cha", prof: false },
        historia: { stat: "int", prof: false },
        interpretacion: { stat: "cha", prof: false },
        intimidacion: { stat: "cha", prof: false },
        investigacion: { stat: "int", prof: false },
        juego_manos: { stat: "dex", prof: false },
        medicina: { stat: "wis", prof: false },
        naturaleza: { stat: "int", prof: true },
        percepcion: { stat: "wis", prof: true },
        perspicacia: { stat: "wis", prof: true },
        persuasion: { stat: "cha", prof: false },
        religion: { stat: "int", prof: false },
        sigilo: { stat: "dex", prof: true },
        supervivencia: { stat: "wis", prof: true },
        trato_animales: { stat: "wis", prof: true }
    },

    Conjuros: [
        { nombre: "Curar heridas (Lvl 1)", bono: "+3", daño: "2d8" },
        { nombre: "Rayo guiado (Lvl 1)", bono: "+3", daño: "4d6 + ventaja" },
        { nombre: "Enredaderas (Lvl 1)", bono: "+0", daño: "20 pies terreno difícil" },
        { nombre: "Ola tronadora (Lvl 1)", bono: "+3", daño: "2d8 + empujado 10 pies" },
        { nombre: "Crecimiento de espinas (Lvl 2)", bono: "+0", daño: "2d4 por cada 5 pies movidos" },
        { nombre: "Esfera de fuego (Lvl 2)", bono: "+3", daño: "2d6 fuego (Acción Bonus)" },
        { nombre: "Restablecimiento menor (Lvl 2)", bono: "+3", daño: "Cura ceguera, sordera, parálisis o envenenamiento" },
        { nombre: "Pasar sin rastro (Lvl 2)", bono: "+0", daño: "+10 a Sigilo para aliados cercanos" }
    ],

    Trucos: [
        "Guia 1d4",
        "Latigo de espinas 1d6 y se acerca 10 pies",
        "Piedad con los moribundos",
        "Shillelagh 1d8",
        "Poison Spray 1d12 puede resistirse con salvacion"
    ],

    equipo: [
        "Útiles de cartógrafo",
        "Escudo",
        "Maza",
        "Kit de hierbas",
        "Carpa",
        "Bolsa de dormir",
        "Pergamino de hablar con animales",
        "129 oro",
        "Equipo de supervivencia (cuerda, agua, etc.)",
        "Poción de invisibilidad",
        "Libro de mago"
    ],

    notas: [
        "Visión en la oscuridad",
        "Mente feérica",
        "Paso élfico (35 pies)",
        "Lenguaje druídico",
        "Sanación Lunar (Soporte): Agrega +4 HP a cada conjuro de curación que lances"
    ],
};
