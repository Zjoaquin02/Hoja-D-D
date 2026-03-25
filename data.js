const personaje = {
    nombre: "Labrob",
    clase: "Druida",
    nivel: 2,
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
        hp_max: 18,
        hp_actual: 18,
        hp_temp: 0
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
        { nombre: "Curar heridas", bono: "+3", daño: "2d8" },
        { nombre: "Rayo guiado", bono: "+3", daño: "4d6+ventaja" },
        { nombre: "Enredaderas", bono: "+0", daño: "20pies terreno dificil" },
        { nombre: "Ola tronadora", bono: "+3", daño: "2d8 y es empujado 10 pies" }
    ],

    Trucos: [
        "Guia 1d4",
        "Latigo de espinas 1d6 y se acerca 10 pies",
        "Piedad con los moribundos",
        "Shillelagh 1d8"
    ],

    equipo: [
        "Cartografo cosas",
        "Escudo",
        "Maza",
        "Kit Herval",
        "Carpa",
        "Bolsa de dormir",
        "37 oro"
    ],

    notas: "Aura Tumoral de Putrefacción..."
};