const personaje = {
    nombre: "Virul",
    clase: "Brujo",
    nivel: 4,
    jugador: "Joaquin",
    alineamiento: "Neutral",
    xp: 0,

    proficiency: 2,

    stats: {
        str: 10,
        dex: 18,
        con: 12,
        int: 13,
        wis: 15,
        cha: 18
    },

    combate: {
        ca: 13,
        velocidad: "9m",
        hp_max: 28,
        hp_actual: 28,
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
        perspicacia: { stat: "wis", prof: false },
        persuasion: { stat: "cha", prof: false },
        religion: { stat: "int", prof: false },
        sigilo: { stat: "dex", prof: false },
        supervivencia: { stat: "wis", prof: true },
        trato_animales: { stat: "wis", prof: true }
    },

    ataques: [
        { nombre: "Eldritch Blast", bono: "+6", daño: "1d10" }
    ],

    conjuros: [
        "Eldritch Blast",
        "Hex",
        "Armor of Agathys"
    ],

    equipo: [
        "Armadura de cuero",
        "Daga",
        "Báculo arcano"
    ],

    notas: "Aura Tumoral de Putrefacción..."
};