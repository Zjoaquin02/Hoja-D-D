const personaje = {
    nombre: "Labrob",
    clase: "Druida",
    subclase: "Círculo de los Sueños (Circle of Dreams)",
    rol: "Healer / Soporte",
    nivel: 5,
    Raza: "Alto Elfo",
    trasfondo: "Sabio",
    alineamiento: "Neutral Bueno",
    xp: 6500,

    proficiency: 3,

    stats: {
        str: 8,   // -1
        dex: 12,  // +1 
        con: 16,  // +3 
        int: 10,  // +0 
        wis: 18,  // +4 
        cha: 10   // +0
    },

    salvaciones: {
        str: { nombre: "Fuerza", stat: "str", prof: false, total: -1 },
        dex: { nombre: "Destreza", stat: "dex", prof: false, total: 1 },
        con: { nombre: "Constitución", stat: "con", prof: true, total: 6 },
        int: { nombre: "Inteligencia", stat: "int", prof: false, total: 0 },
        wis: { nombre: "Sabiduría", stat: "wis", prof: true, total: 7 },
        cha: { nombre: "Carisma", stat: "cha", prof: false, total: 0 }
    },

    combate: {
        ca: 14,
        iniciativa: "+1",
        velocidad: "30 ft",
        hp_max: 48,
        hp_actual: 48,
        hp_temp: 0,
        cd_conjuros: 15,
        ataque_conjuros: "+7"
    },

    recursos: {
        forma_salvaje: { actual: 2, max: 2, desc: "Recupera 1 en Descanso Corto, todos en Descanso Largo" },
        balsamo_fey: { actual: 5, max: 5, desc: "5d6 dados de energía fey. Gasta hasta 2 dados/uso (Acción Adicional, 120 ft). Recarga en Descanso Largo." },
        conjuros_l1: { actual: 4, max: 4, desc: "Espacios de Nivel 1" },
        conjuros_l2: { actual: 3, max: 3, desc: "Espacios de Nivel 2" },
        conjuros_l3: { actual: 2, max: 2, desc: "Espacios de Nivel 3" },
        detectar_magia: { actual: 1, max: 1, desc: "1 lanzamiento gratuito por día (Linaje Alto Elfo)" }
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
        medicina: { stat: "wis", prof: true },
        naturaleza: { stat: "int", prof: true },
        percepcion: { stat: "wis", prof: true },
        perspicacia: { stat: "wis", prof: true },
        persuasion: { stat: "cha", prof: false },
        religion: { stat: "int", prof: false },
        sigilo: { stat: "dex", prof: false },
        supervivencia: { stat: "wis", prof: true },
        trato_animales: { stat: "wis", prof: false }
    },

    Conjuros: [
        // Nivel 1 (4 preparados)
        { 
            nivel: 1,
            nombre: "Palabra de curación (Healing Word)", 
            bono: "Acción Adicional | 60 ft", 
            daño: "1d4 + 4 HP a distancia. Ideal para reanimar aliados a 0 PV" 
        },
        { 
            nivel: 1,
            nombre: "Curar heridas (Cure Wounds)", 
            bono: "Acción | Al tocar", 
            daño: "1d8 + 4 HP en contacto" 
        },
        { 
            nivel: 1,
            nombre: "Buenas bayas (Goodberry)", 
            bono: "Acción | Al tocar", 
            daño: "Crea 10 bayas mágicas. Cada una cura 1 HP y nutre por 1 día (duran 24h)" 
        },
        { 
            nivel: 1,
            nombre: "Enredar (Entangle)", 
            bono: "CD 15 (Salv. Fue) | 90 ft", 
            daño: "Área de 20 ft: terreno difícil y restringe a enemigos (Concentración, 1 min)" 
        },
        
        // Nivel 2 (3 preparados)
        { 
            nivel: 2,
            nombre: "Espíritu sanador (Healing Spirit)", 
            bono: "Acción Adicional | 60 ft", 
            daño: "Espíritu móvil. Cura 1d6 (+4) por turno a quien entre (hasta 5 curaciones, Conc. 1 min)" 
        },
        { 
            nivel: 2,
            nombre: "Restablecimiento menor (Lesser Restoration)", 
            bono: "Acción | Al tocar", 
            daño: "Cura ceguera, sordera, parálisis o envenenamiento de un objetivo" 
        },
        { 
            nivel: 2,
            nombre: "Pasar sin rastro (Pass without Trace)", 
            bono: "+10 Sigilo | Radio 30 ft", 
            daño: "+10 a pruebas de Sigilo para aliados cercanos y no pueden ser rastreados (Conc. 1 hora)" 
        },

        // Nivel 3 (2 preparados)
        { 
            nivel: 3,
            nombre: "Disipar magia (Dispel Magic)", 
            bono: "Acción | 120 ft", 
            daño: "Disipa conjuros de Nivel 3 o menor automáticamente; o tirada de Sabiduría (+7) vs CD 10 + nivel" 
        },
        { 
            nivel: 3,
            nombre: "Revivir (Revivify)", 
            bono: "Acción | Al tocar", 
            daño: "Devuelve a la vida con 1 HP a una criatura muerta en el último minuto (consume diamantes por 300 po)" 
        }
    ],

    Trucos: [
        "Guía (Guidance) [Acción - Suma +1d4 a prueba de habilidad de un aliado a 30 ft]",
        "Producir llama (Produce Flame) [+7 al ataque, 1d8 fuego a 30 ft, ilumina 20/20 ft]",
        "Látigo de espinas (Thorn Whip) [+7 al ataque, 1d6 perforante a 30 ft y atrae 10 ft]",
        "Reparar / Remendar (Mending) [Repara un objeto roto o desgarro ≤ 1 ft]"
    ],

    equipo: [
        "219 monedas de oro",
        "Armadura de cuero tachonado",
        "Escudo",
        "Bastón (foco druídico)",
        "Collar mágico",
        "Kit de hierbas",
        "Kit de curandero",
        "Útiles de cartógrafo",
        "Maza",
        "Mayal triple",
        "Caña májika",
        "Poción de invisibilidad",
        "Pergamino de hablar con animales",
        "Libro de mago",
        "Brazalete",
        "Jabón, linterna de gas, sombrero mihawk, aceite y 3 esposas",
        "Carpa",
        "Bolsa de dormir",
        "Equipo de supervivencia (cuerda, agua, etc.)"
    ],

    competencias: {
        armaduras: "Armaduras ligeras, medias y escudos",
        armas: "Armas simples, bastón, maza, mayal",
        herramientas: "Kit de herboristería, kit de curandero, útiles de cartógrafo",
        idiomas: "Común, Élfico, Druídico, Silvano"
    },

    notas: [
        "Raza - Alto Elfo: Destreza +2, Inteligencia +1. Visión en la oscuridad 60 ft. Truco Reparar (Mending). Detectar Magia preparado (1 gratis/día).",
        "Ascendencia feérica: Ventaja en salvaciones contra ser encantado y la magia no puede ponerte a dormir.",
        "Trasfondo - Sabio: Especialista en investigación y secretos arcanos/naturales.",
        "Círculo de los Sueños (Nivel 2) - Bálsamo de la Corte de Verano: Reserva de 5d6 dados de energía fey. Como Acción Adicional puedes gastar hasta 2 dados a la vez (alcance 120 ft) para curar 1d6 por dado gastado y otorgar 1 PV temporal por dado. Se recuperan en Descanso Largo.",
        "Próximo rasgo (Nivel 6) - Hogar de luz de luna y sombra: En descansos creas esfera mágica de 30 ft (+5 a Sigilo y Percepción del grupo, oculta el humo y luz de fogatas).",
        "Collar de Vitalidad: Otorga +2 a Constitución y +1 Punto de Golpe adicional por nivel."
    ]
};


