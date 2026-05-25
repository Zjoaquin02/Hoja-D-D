const personaje = {
    nombre: "Labrob",
    clase: "Druida",
    subclase: "Círculo de la Tierra",
    nivel: 4,
    Raza: "Alto Elfo",
    alineamiento: "Neutral",
    xp: 0,

    proficiency: 2,

    stats: {
        str: 12,
        dex: 12,
        con: 14,
        int: 11,
        wis: 18, // Subido +2 por incremento de característica de Nivel 4 (Modificador +4)
        cha: 9
    },

    combate: {
        ca: 14,
        velocidad: "30pies",
        hp_max: 32, // Subido +7 por Nivel 4
        hp_actual: 32,
        hp_temp: 0
    },

    recursos: {
        forma_salvaje: { actual: 2, max: 2 },
        conjuros_l1: { actual: 4, max: 4 },
        conjuros_l2: { actual: 3, max: 3 }, // Subido a 3 espacios en Nivel 4
        detectar_magia: { actual: 1, max: 1 } // Recurso gratuito de Linaje Élfico (1 por descanso largo)
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
        { nombre: "Curar heridas (Lvl 1)", bono: "+6", daño: "2d8 + 4 HP (Curación al tocar - Reglas 2024)" },
        { nombre: "Palabra de curación (Lvl 1)", bono: "+6", daño: "2d4 + 4 HP (Acción Adicional, 60 pies - Reglas 2024)" },
        { nombre: "Fuego faérico (Lvl 1)", bono: "CD 14", daño: "Esfera 20 pies, ventaja en ataques contra enemigos en área (Salv. Des)" },
        { nombre: "Enredar (Lvl 1)", bono: "CD 14", daño: "Área 20 pies, enreda a enemigos y crea terreno difícil (Salv. Fue)" },
        { nombre: "Espíritu sanador (Lvl 2)", bono: "+6", daño: "Espíritu móvil. Cura 1d6 a quien entre a su espacio (hasta 5 veces, Acción Bonus)" },
        { nombre: "Restablecimiento menor (Lvl 2)", bono: "+6", daño: "Cura ceguera, sordera, parálisis o envenenamiento a un objetivo" },
        { nombre: "Pasar sin rastro (Lvl 2)", bono: "+0", daño: "+10 a Sigilo para aliados cercanos (Concentración, 1 hora)" }
    ],

    Trucos: [
        "Guía (1d4 como Reacción a 30 pies - Reglas 2024)",
        "Resistencia (1d4 como Reacción a 30 pies ante salvación fallida - Reglas 2024)",
        "Látigo de espinas (+6 para golpear, 1d6 perforante y atrae 10 pies a 30 pies)",
        "Prestidigitación (Linaje Alto Elfo - Utilitario, se puede cambiar tras descanso largo)"
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
        "Visión en la oscuridad (60 pies)",
        "Ascendencia feérica: Ventaja contra ser encantado y no puedes ser dormido mágicamente.",
        "Linaje Alto Elfo: Conoces el truco Prestidigitación y tienes siempre preparado Detectar Magia (puedes lanzarlo 1 vez al día gratis).",
        "Lenguaje druídico: Conoces el idioma secreto de los druidas.",
        "Círculo de la Tierra (Nivel 3): Al terminar un descanso largo eliges un bioma (Árido, Polar, Templado, Tropical) para obtener conjuros/trucos adicionales preparados.",
        "Ayuda de la Tierra (Nivel 3): Gasta 1 Forma Salvaje, esfera de 10 pies a 60 pies. Enemigos hacen salvación Con CD 14 o sufren 2d6 daño necrótico (mitad con éxito). Un aliado recupera 2d6 HP."
    ]
};
