// ============================================================================
// CALL OF J — BASE DE DATOS DE PERSONAJES, ÍTEMS, MINIJUEGOS, HISTORIA Y FINALES
// ============================================================================

const CHARACTERS = {
  j: {
    id: 'j',
    name: 'J',
    color: '#f59e0b',
    bio: 'Fue invitado al grupo en El Cable para parchar, pero resultó ser el más solapado y caliente de todos. En El Cable y en Violeta finge ayudar a Che a cuidar que Da no ataque a Cataleya, pero apenas los guaritos hacen efecto y suben a 2150, J se corona como El Rey del Roce y le manda mano a Cataleya sin freno.',
    traits: ['El Solapado', '👑 El Rey del Roce', 'Mano Larga en 2150']
  },
  sai: {
    id: 'sai',
    name: 'Sai',
    color: '#ec4899',
    bio: 'El autor intelectual del desorden de la noche. Llega a El Cable con Antonia (que no es trans) y con Cataleya (1 amiga trans que llevó de regalo exclusivo especialmente para J). Propone los guaritos en Violeta antes de subir a 2150.',
    traits: ['Creador del Caos', 'Patrocinador en Violeta', 'Llevó a Cataleya para J']
  },
  da: {
    id: 'da',
    name: 'Da',
    color: '#3b82f6',
    bio: 'Amigo de Sai y compañero de casa de J en Virocasa. En El Cable empieza hablando como amigo con Antonia y Cataleya, pero con los guaritos en Violeta quiere atacar a Cataleya. Che y J lo vigilan, mientras el fantasma Diegui lo guía por el camino del bien.',
    traits: ['Vive en Virocasa con J', 'Vigilado en El Cable', 'Guiado por Diegui']
  },
  che: {
    id: 'che',
    name: 'Che',
    color: '#10b981',
    bio: 'El amigo sano y responsable que cuida de J y Da. Vigila que Da no ataque a Cataleya, y cuando ve que la noche pasa de guaritos a cosas turbias, prefiere coger su taxi temprano y nunca meterse en cosas raras.',
    traits: ['Cuida a J y Da', 'Cero Cosas Raras', 'El Más Sano del Grupo']
  },
  diegui: {
    id: 'diegui',
    name: 'Diegui',
    color: '#38bdf8',
    isGhost: true,
    bio: 'El fantasma guía espiritual que se le manifiesta a Da entre los guaritos de Violeta, la rumba de 2150 y la sala de Virocasa para llevarlo por el camino del bien.',
    traits: ['Fantasma Guía', 'Camino del Bien', 'Consejero de Da']
  },
  cataleya: {
    id: 'cataleya',
    name: 'Cataleya',
    color: '#e879f9',
    bio: 'La amiga trans rubia que Sai llevó al parche especialmente para J. Toma guaritos con J en Violeta, le encanta cómo J se le pega atrás como el Rey del Roce en 2150 y protagoniza todas las ramas calientes de la noche con él.',
    traits: ['Exclusiva para J', 'Debilidad de J', 'Reina de 2150']
  },
  antonia: {
    id: 'antonia',
    name: 'Antonia',
    color: '#a855f7',
    bio: 'La otra amiga que llega a El Cable con el grupo (morenita, peli café, con gafas; ella no es trans). Habla con Da, toma guaritos en Violeta y en la ruta canon termina en pleno ambiente con Da en 2150.',
    traits: ['Amiga del Grupo', 'Guaritos en Violeta', 'Testigo en 2150']
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    color: '#f43f5e',
    bio: 'La mamá de J y sus 3 hermanas en la casa familiar de Virocentro. Si escuchan ladrar a Jairo en la madrugada y bajan a la sala, arman el juicio final.',
    traits: ['Mamá de J', '3 Hermanas', 'Casa en Virocentro']
  },
  jairo: {
    id: 'jairo',
    name: 'Jairo',
    color: '#fbbf24',
    bio: 'El perro Pomerania de J en Virocentro. Pequeño, esponjoso y con oído ultrasónico: cualquier movimiento sospechoso en el sillón de la sala hace que despierte a toda la casa.',
    traits: ['Pomerania de J', 'Alarma de Virocentro', '200% Esponjoso']
  }
};

// ---------------- ÍTEMS Y OBJETOS DEL BOLSILLO DE J ----------------
const GAME_ITEMS = {
  guaro_violeta: {
    id: 'guaro_violeta',
    icon: '🥃',
    name: 'Media de Guaro de Violeta',
    price: 25000,
    desc: 'Sube la calentura de J y Cataleya +30% y emborracha a Da para que no estorbe.'
  },
  llave_virocasa: {
    id: 'llave_virocasa',
    icon: '🗝️',
    name: 'Llave Secreta con Doble Seguro',
    price: 20000,
    desc: 'Permite trancar por dentro Virocasa para que Da no pueda abrir ni con cerrajero.'
  },
  galleta_jairo: {
    id: 'galleta_jairo',
    icon: '🦴',
    name: 'Hueso Gourmet pa’ Jairo',
    price: 15000,
    desc: 'Distrae a Jairo el Pomerania en Virocentro y baja la alerta familiar.'
  },
  pincha_taxis: {
    id: 'pincha_taxis',
    icon: '🪛',
    name: 'Pincha-Taxis Nocturno',
    price: 30000,
    desc: 'Permite pincharle el taxi a Cataleya afuera de 2150 y desbloquear el Final 7 Anti-Canon.'
  },
  perfume_roce: {
    id: 'perfume_roce',
    icon: '👑',
    name: 'Loción del Rey del Roce',
    price: 20000,
    desc: 'Atrae irresistiblemente a Cataleya cuando J se le pega atrás a rozárselo.'
  }
};

// ---------------- CONFIGURACIÓN DE LOS 3 MINIJUEGOS JUGABLES ----------------
const MINIGAMES = {
  guaritos_violeta: {
    id: 'guaritos_violeta',
    title: '🥃 MINIJUEGO 1: GUARITOS Y ROCE EN VIOLETA',
    instructions: 'Haz clic en "¡FONDO Y ROCE!" cada vez que la barra pase por la zona rosada para tomar guarito y rozarle la pierna a Cataleya (Necesitas 3 aciertos).',
    type: 'timing',
    targetHits: 3,
    rewardItem: 'guaro_violeta',
    rewardMoney: 15000
  },
  roce_2150: {
    id: 'roce_2150',
    title: '🍑👑 MINIJUEGO 2: EL REY DEL ROCE EN 2150',
    instructions: 'Presiona rápido "🍑 ¡ROZÁRSELO A CATALEYA!" para llegar al 100% de calentura, pero NO presiones cuando el ojo diga "🚨 ¡MIRANDO!" o te descubrirán.',
    type: 'stealth_mash',
    rewardItem: 'perfume_roce',
    rewardMoney: 25000
  },
  sigilo_jairo: {
    id: 'sigilo_jairo',
    title: '🐶🚨 MINIJUEGO 3: MANO EN VIROCENTRO SIN DESPERTAR A JAIRO',
    instructions: 'Alterna entre "🖐️ MANDAR MANO" (sube pasión y ruido) y "🦴 TIRAR GALLETA A JAIRO" (baja el ruido) hasta llenar la Pasión al 100% sin que el Ruido llegue a 100%.',
    type: 'balance',
    rewardItem: 'galleta_jairo',
    rewardMoney: 20000
  }
};

const SCENARIOS = [
  {
    id: '2150',
    number: 'ESCENARIO 1 (PRINCIPAL)',
    title: 'El Cable → Violeta → 2150',
    bgClass: 'bg-2150',
    startNode: 's1_intro',
    description: 'Todo inicia en El Cable con charla de amigos y exploración libre. Luego pasan a Violeta a jugar la ronda de guaritos hasta quedar bien tomados y suben a 2150, donde J se desata como El Rey del Roce con Cataleya.'
  },
  {
    id: 'virocasa',
    number: 'ESCENARIO 2',
    title: 'Virocasa',
    bgClass: 'bg-virocasa',
    startNode: 's2_intro',
    description: 'La casa donde viven esos 2 (J y Da). Explora la cocina, la nevera, el sofá compartido y el cuarto de J mientras la calentura con Cataleya descontrola toda la casa.'
  },
  {
    id: 'virocentro',
    number: 'ESCENARIO 3',
    title: 'Virocentro',
    bgClass: 'bg-virocentro',
    startNode: 's3_intro',
    description: 'La casa familiar normal de J: allí están Cataleya, Jairo su perro Pomerania, su mamá Sandra y sus 3 hermanas. Supera el desafío de sigilo para que la mano de J corone.'
  }
];

const ENDINGS = {
  end_1_virocasa_intimo: {
    id: 'end_1_virocasa_intimo',
    title: 'Final 1: Encerrón Salvaje en Virocasa',
    subtitle: 'Che cogió taxi antes de 2150, J mandó mano, Cataleya le respondió y desbarataron Virocasa',
    description: 'Después de calentarse desde El Cable y los guaritos en Violeta, Che olió el peligro y cogió taxi antes de subir a 2150. En la discoteca J le mandó mano sin compasión a Cataleya, ella le respondió con toda la malicia y se encerraron con doble seguro en Virocasa (la casa de J y Da), pasando un rato tan íntimo por toda la sala y el cuarto que dejaron a Da tirado afuera en el andén escuchando cómo temblaba su propia casa.'
  },
  end_2_canon_taxi: {
    id: 'end_2_canon_taxi',
    title: 'Final 2 (CANON): Cataleya Coge Taxi y J Sale Bravo Caminando',
    subtitle: 'J y Cataleya se dieron con todo en 2150, pero ella cogió taxi; todos coronaron pareja hetero y J se fue a pie',
    description: '¡LA HISTORIA REAL (CANON)! Tras darse unos guaritos en Violeta y llegar bien tomados a 2150, J y Cataleya tuvieron un agarre súper picante donde J se lo rozó y le mandó mano toda la noche. Pero en la puerta Cataleya paró un taxi y se fue sola. En 2150 solo quedaron J, Da y Sai: tanto Da como Sai consiguieron pareja heterosexual y estaban felices en pleno ambiente, mientras J salió bravo caminando calle abajo porque Cataleya se fue.'
  },
  end_3_todos_menos_che: {
    id: 'end_3_todos_menos_che',
    title: 'Final 3: Todos Mandan Mano Menos Che',
    subtitle: 'Che se mantuvo 100% sano, mientras J con Cataleya, Da y Sai armaron el despelote en 2150 y Virocasa',
    description: 'Che demostró ser el único hombre serio del grupo y se fue sano a dormir sin meterse en cosas raras. En cambio, con los guaritos de Violeta encima y viendo cómo J y Cataleya se mandaban mano sin filtro en 2150, Da mandó de vacaciones al fantasma Diegui, Sai se sumó al desorden y terminaron rematando en Virocasa con J y Cataleya adueñándose del sofá.'
  },
  end_4_jairo_virocentro: {
    id: 'end_4_jairo_virocentro',
    title: 'Final 4: Con la Mano Adentro en Virocentro',
    subtitle: 'Jairo le mordió el pantalón y Sandra con las 3 hermanas prendieron la luz en pleno agarre caliente',
    description: 'Después de calentar motores en 2150 y Virocasa, J estaba tan prendido con Cataleya que la metió a escondidas a Virocentro. En el sillón de la sala familiar a oscuras J y Cataleya se entregaron al agarre total, pero Jairo el Pomerania le mordió el tobillo ladrando como sirena y Sandra con las 3 hermanas prendieron la luz pillando a J con la mano adentro.'
  },
  end_5_diegui_renuncia: {
    id: 'end_5_diegui_renuncia',
    title: 'Final 5: Apagón Prohibido en Virocasa y Renuncia de Diegui',
    subtitle: 'Se saltaron los tacos en la casa de J y Da, J y Cataleya se desquitaron en lo oscuro y Diegui renunció',
    description: 'En Virocasa (donde viven J y Da), después de mandarse mano contra la nevera y en el sofá compartido, provocaron un apagón total. En plena oscuridad J y Cataleya hicieron temblar el mueble de Da a dos manos, provocando que el fantasma Diegui renunciara para siempre como guía espiritual.'
  },
  end_6_multiverso_mano: {
    id: 'end_6_multiverso_mano',
    title: 'Final 6 (SECRETO OCULTO): El Señor de las Tres Casas',
    subtitle: 'Desbloqueaste el poder prohibido: J y Cataleya coronaron en 2150, Virocasa y Virocentro la misma noche',
    description: '¡FINAL SECRETO DESBLOQUEADO! Con el poder de los Easter Eggs y los guaritos de Violeta, J bloqueó todos los taxis de Manizales: le mandó mano a Cataleya en 2150, desbarataron el sofá de Virocasa y además coronaron en el sillón de Virocentro dándole un hueso gigante a Jairo el Pomerania para que no despertara a Sandra ni a las 3 hermanas.'
  },
  end_7_pincha_taxis: {
    id: 'end_7_pincha_taxis',
    title: 'Final 7 (ANTI-CANON): El Sabotaje del Taxi Amarillo',
    subtitle: 'Usaste el Pincha-Taxis afuera de 2150, el taxi no pudo arrancar y Cataleya se fue con J',
    description: '¡CAMBIASTE LA HISTORIA CANON! Justo cuando Cataleya iba a subirse al taxi afuera de 2150 para dejar a J viendo un chispero, J usó el Pincha-Taxis Nocturno. Con el taxi desinflado en plena avenida, Cataleya soltó la carcajada, agarró a J del cuello y terminaron amaneciendo juntos a puro roce y mano limpia.'
  },
  end_8_rey_del_roce_supremo: {
    id: 'end_8_rey_del_roce_supremo',
    title: 'Final 8 (CORONACIÓN): El Imperio del Rey del Roce',
    subtitle: 'J dominó los minijuegos de roce y Cataleya lo coronó en el VIP de 2150 y Virocasa',
    description: '¡CORONACIÓN OFICIAL! Después de demostrar su técnica milenaria rozándoselo a Cataleya en El Cable, en los guaritos de Violeta, en la pista de 2150 y en el sofá de Virocasa, J recibió el trono dorado como El Rey del Roce de Manizales.'
  }
};

const EASTER_EGGS = {
  egg_title_j: {
    id: 'egg_title_j',
    title: 'Secreto 1: La Radiografía Mental de J',
    hint: 'En la pantalla de inicio, toca 5 veces seguidas la letra "J" brillante del título.',
    description: 'Descubriste qué hay dentro del cerebro de J: 99% planes calientes para mandarle mano a Cataleya y 1% fingir que está cuidando a Da.'
  },
  egg_diegui_ghost: {
    id: 'egg_diegui_ghost',
    title: 'Secreto 2: La Confesión del Fantasma Diegui',
    hint: 'Cuando el fantasma Diegui aparezca flotando en pantalla durante la historia, haz clic sobre él.',
    description: 'Diegui confesó su secreto mejor guardado: «La verdad yo no soy ningún fantasma, solo me hice el muerto pa’ no poner plata pa’ los guaritos en Violeta».'
  },
  egg_jairo_bark: {
    id: 'egg_jairo_bark',
    title: 'Secreto 3: Traductor Oficial de Jairo el Pomerania',
    hint: 'En el Escenario 3 (Virocentro), haz clic directamente sobre Jairo el Pomerania en pantalla.',
    description: 'Tradujiste el ladrido de Jairo: «¡Doña Sandra, baje ya mismo que J tiene la mano metida donde no le da el sol desde que salieron de 2150!»'
  },
  egg_code_mano: {
    id: 'egg_code_mano',
    title: 'Secreto 4: Código Prohibido "MANO" / "2150"',
    hint: 'Escribe con tu teclado la palabra MANO o el número 2150 en cualquier momento.',
    description: 'Activaste el truco prohibido de teclado: sube la calentura de J al 100% instantáneamente y desata una lluvia de fuego.'
  },
  egg_location_radio: {
    id: 'egg_location_radio',
    title: 'Secreto 5: Frecuencia Secreta de Taxis Nocturnos',
    hint: 'Durante la partida, toca 3 veces seguidas el letrero amarillo del escenario arriba a la izquierda.',
    description: 'Interceptaste el radio de los taxistas de El Cable y 2150: «Central, aquí reportando que una rubia dejó a un tal J emputado caminando solo por toda la avenida».'
  },
  egg_j_cataleya_touch: {
    id: 'egg_j_cataleya_touch',
    title: 'Secreto 6: Agarrón Extra Fuera de Guion',
    hint: 'Durante una escena, haz clic directamente sobre la figura de J o de Cataleya.',
    description: 'Pusiste a J a mandar una mano extra fuera del guion mientras nadie estaba mirando.'
  },
  egg_rey_del_roce: {
    id: 'egg_rey_del_roce',
    title: 'Secreto 7: 👑 El Rey del Roce (Especialista en Trans)',
    hint: 'Toca 3 veces seguidas entre J y Cataleya en escena (o escribe ROCE con el teclado / dale 3 veces al botón de Mandar Mano).',
    description: '¡Coronaste a J como EL REY DEL ROCE! Se le cayó la careta por completo: a J no solo le gusta mandar mano, sino que su deporte favorito en El Cable, Violeta y 2150 es pegarse bien atrás a rozárselo sin descanso a las trans.'
  }
};

// ============================================================================
// NODOS DE LA HISTORIA INTERACTIVA (CON HUBS DE EXPLORACIÓN, ÍTEMS Y MINIJUEGOS)
// ============================================================================
const STORY_NODES = {
  // ==========================================================================
  // ACTO 1: EL CABLE (CON HUB DE EXPLORACIÓN LIBRE)
  // ==========================================================================
  s1_intro: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — INICIO DEL PARCHE',
    chapterBanner: {
      subtitle: 'ESCENARIO 1 — EL CABLE → VIOLETA → 2150',
      title: 'NOCHE EN EL CABLE',
      desc: 'Explora los escenarios, juega los desafíos, compra ítems y decide el destino de J y Cataleya.'
    },
    speaker: 'NARRADOR',
    slots: { left: 'che', center: 'j', right: 'da' },
    activeSlot: 'center',
    moods: { j: 'saint' },
    text: 'Viernes por la noche en El Cable. El aire frío de Manizales baja de la montaña mientras Che y Da esperan en la esquina. Esa noche invitaron a J al grupo para parchar tranquilo entre amigos. J llega con $60.000 en el bolsillo y cara de niño bueno... pero por dentro viene con una sed de roce y mano larga que no le cabe en el pecho.',
    next: 's1_sai_arrives'
  },

  s1_sai_arrives: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — LLEGA SAI CON LAS INVITADAS',
    speaker: 'Sai',
    slots: { left: 'sai', center: 'cataleya', right: 'antonia' },
    activeSlot: 'left',
    moods: { cataleya: 'flirty' },
    text: '¡En ese momento llega Sai a El Cable con la sorpresa mayor de la noche! Viene acompañado de Antonia (morenita, peli café, con gafas, que no es trans) y de Cataleya, una rubia despampanante con curvas de infarto que es 1 chica trans que Sai llevó exclusivamente para J: —«¡Quiubo pues, parceros! Les traje a Antonia pa’ conversar y aquí le traje a Cataleya de regalo exclusivo con sorpresa incluida a mi parcero J.»',
    next: 's1_cable_hub'
  },

  // --- HUB DE EXPLORACIÓN 1: MESA DE EL CABLE ---
  s1_cable_hub: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — EXPLORACIÓN EN LA MESA',
    speaker: 'Che',
    slots: { left: 'che', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'saint', cataleya: 'flirty' },
    text: 'Están todos instalados en la mesa de El Cable. Da empieza a hablar como amigo con Antonia y Cataleya, pero con los primeros tragos ya se le quieren ir los ojos hacia Cataleya. Che te pide ayuda para vigilar a Da. ¿Qué quieres hacer en El Cable antes de cambiar de sitio?',
    choices: [
      {
        text: '🔍 [Investigar a Sai] Preguntarle en secreto a Sai de dónde sacó a Cataleya y pedirle un consejo para coronar hoy.',
        tag: 'Explorar + Ganar $20.000 💵',
        effects: { parche: 10 },
        giveMoney: 20000,
        next: 's1_cable_talk_sai'
      },
      {
        text: '🔍 [Vigilar a Da y Antonia] Escuchar qué le está diciendo Da a Antonia y ver cómo Che lo frena.',
        tag: 'Explorar Parche 👀',
        effects: { che: 10 },
        next: 's1_cable_watch_da_detail'
      },
      {
        text: '🖐️ [Avanzar con Cataleya bajo la mesa] Sentarse pegadito a Cataleya fingiendo cuidar a Da, pero mandarle mano al muslo bajo el mantel.',
        tag: 'Avanzar Historia (Táctica Muslo) 🦵🔥',
        spicyChoice: true,
        setFlags: { cable_muslo: true },
        effects: { parche: 20, che: 5 },
        next: 's1_cable_branch_muslo'
      },
      {
        text: '🍋 [Avanzar con Cataleya en la barra] Inventar que van por limones a la barra de El Cable para pegarse el primer roce por detrás.',
        tag: 'Avanzar Historia (Táctica Barra) 🍑🌶️',
        spicyChoice: true,
        setFlags: { cable_barra: true },
        effects: { parche: 25, che: -10 },
        next: 's1_cable_branch_barra'
      }
    ]
  },

  s1_cable_talk_sai: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — CONFIDENCIA DE SAI',
    speaker: 'Sai',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    toast: '💵 Sai te pasó $20.000 pa’ los guaritos y el taxi',
    text: 'Sai se acerca al oído de J muerto de la risa: —«Pille pues J, yo sé que a usted le encanta pegarse atrás a rozárselo a las trans, por eso le traje a Cataleya que viene con motor turbo. Tome estos $20.000 pa’ que ahorita en Violeta le brinde guaritos, pero pilas con dejar que coja taxi en 2150 porque se queda viendo un chispero.»',
    next: 's1_cable_hub'
  },

  s1_cable_watch_da_detail: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — CHE FRENA A DA',
    speaker: 'Antonia',
    slots: { left: 'da', center: 'antonia', right: 'che' },
    activeSlot: 'center',
    text: 'Antonia se acomoda las gafas riéndose mientras Da intenta estirar el cuello para mirar a Cataleya: —«Oiga Da, estábamos hablando de fútbol y usted ya está mirando pa’ otro lado.» Che le pone la mano en el hombro a Da: —«Quieto Da, usted vive con J en Virocasa, deje que J atienda a Cataleya tranquilo.»',
    next: 's1_cable_hub'
  },

  s1_cable_branch_muslo: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — MANO BAJO LA MESA',
    speaker: 'Cataleya',
    slots: { left: 'che', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🔗 J y Cataleya iniciaron el roce secreto bajo la mesa',
    text: 'Mientras J mira fijo a Da con cara de policía diciendo «Yo la cuido, Che», por debajo del mantel de El Cable su mano derecha sube lento por el muslo caliente de Cataleya. Lejos de quitarla, Cataleya junta las piernas atrapándole la mano a J y le susurra al oído: —«Con que así cuidas tú, J... no me vayas a soltar en toda la noche.»',
    next: 's1_plan_violeta'
  },

  s1_cable_branch_barra: {
    scenario: '2150',
    subScene: 'cable',
    locationLabel: 'EL CABLE — ATRÁS DE LA BARRA',
    speaker: 'J',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🔗 J estrenó el roce con Cataleya detrás de la barra',
    text: 'Con la excusa de buscar limones, J arrastra a Cataleya detrás de la barra de El Cable. Apenas quedan fuera de la vista de Che y Da, J se le pega bien atrás como buen Rey del Roce y le manda el primer agarrón a dos manos por la cintura y la cadera. Cataleya le muerde el labio riéndose: —«Uy J, ni siquiera hemos tomado guaro y ya me lo estás rozando con tanta hambre...»',
    next: 's1_plan_violeta'
  },

  // ==========================================================================
  // ACTO 2: PARADA EN VIOLETA POR UNOS GUARITOS (CON MINIJUEGO INTERACTIVO)
  // ==========================================================================
  s1_plan_violeta: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'VIOLETA — HORA DE LOS GUARITOS',
    chapterBanner: {
      subtitle: 'PARADA OBLIGATORIA ANTES DE 2150',
      title: 'GUARITOS EN VIOLETA',
      desc: 'Entran a Violeta a darse unos guaritos y prender motores antes de ir a 2150.'
    },
    speaker: 'Sai',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    text: 'Volviendo todos a la mesa en El Cable, Sai señala las luces moradas del frente: —«¡Bueno parceros, antes de ir a 2150 tenemos parada obligatoria: vamos pa’ Violeta a darnos unos guaritos pa’ subir bien tomados a la discoteca!»',
    flagText: {
      cable_muslo: 'Mientras caminan hacia Violeta, Cataleya todavía lleva la marca del agarrón que J le pegó bajo la mesa en El Cable.',
      cable_barra: 'Saliendo hacia Violeta, Cataleya se acomoda la falda sonriendo pícara después del roce que se dio con J detrás de la barra de El Cable.'
    },
    next: 's1_violeta_diegui_appears'
  },

  s1_violeta_diegui_appears: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'VIOLETA — RONDA DE GUARITOS Y DIEGUI',
    speaker: 'Diegui',
    slots: { left: 'da', center: 'diegui', right: 'antonia' },
    activeSlot: 'center',
    sfx: 'ghost',
    text: 'Adentro de Violeta empiezan a desfilar las copas de aguardiente. Cuando Da se prende con el primer guarito y vuelve a mirar a Cataleya, baja del techo de Violeta el fantasma Diegui flotando sobre las botellas: —«¡Quieto ahí, Da! Soy el espíritu de Diegui. Baja ese guarito y sigue por el camino del bien hablando como amigo con Antonia.»',
    next: 's1_violeta_choice'
  },

  s1_violeta_choice: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'VIOLETA — DESAFÍO DE GUARITOS Y ROCE',
    speaker: 'Cataleya',
    slots: { left: 'che', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    text: 'Mientras todos miran a Da y al fantasma Diegui en Violeta, Cataleya se pega contra J con una copa de guaro en la mano: —«A ver J, demuéstrame cómo tomas guarito en Violeta mientras me lo rozas sin que Che se dé cuenta...»',
    choices: [
      {
        text: '🕹️ [JUGAR DESAFÍO EN VIOLETA] Superar el Minijuego de Guaritos y Roce para ganar la Media de Guaro y prender a Cataleya al 100%.',
        tag: 'Minijuego Jugable + Recompensa 🥃🎮',
        spicyChoice: true,
        minigameId: 'guaritos_violeta',
        setFlags: { violeta_vip: true },
        effects: { parche: 35, che: -20 },
        next: 's1_violeta_branch_vip'
      },
      {
        text: 'Meter a Cataleya directo al rincón VIP oscuro de Violeta entre guarito y guarito para pegarse un roce salvaje.',
        tag: 'Agarrón VIP en Violeta (Impulsa Final 1 / Virocasa) 🔥🚕',
        spicyChoice: true,
        setFlags: { violeta_vip: true },
        effects: { parche: 30, che: -25 },
        next: 's1_violeta_branch_vip'
      },
      {
        text: 'Servir guaritos dobles para todo el grupo mientras J sienta a Cataleya en sus piernas bajo la mesa de Violeta.',
        tag: 'Guaritos al Tope (Impulsa Ruta Canon / Final 3) 🥃💋',
        spicyChoice: true,
        setFlags: { violeta_guaro_full: true },
        effects: { parche: 25, diegui: -15 },
        next: 's1_violeta_branch_guaro'
      }
    ]
  },

  s1_violeta_branch_vip: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'VIOLETA — RINCÓN VIP AL ROJO VIVO',
    speaker: 'J',
    slots: { left: 'che', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🔗 ¡Cataleya quedó prendida al máximo con J en Violeta!',
    text: 'Detrás de la cortina morada de Violeta, J se toma el último guarito y se pega detrás de Cataleya a rozárselo y mandarle mano sin piedad por debajo de la ropa. Cataleya suspira agarrándole el cuello a J y también le manda mano a él: —«Hoy no te me escapas, J, apenas pasemos por 2150 nos encerramos solos.» Desde la puerta, Che ve la escena y ya va sacando el celular para pedir su taxi.',
    next: 's1_leaving_violeta_hub'
  },

  s1_violeta_branch_guaro: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'VIOLETA — TODOS PRENDIDOS DE GUARO',
    speaker: 'Sai',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🔗 ¡Todo el grupo salió bien tomado de Violeta!',
    text: '¡Guarito tras guarito hasta secar la botella en Violeta! Mientras Da y Sai brindan a grito herido con Antonia, J tiene a Cataleya sentada en sus piernas rozándoselo calientico al ritmo de la música. Cataleya le muerde la oreja a J: —«Vamos pa’ 2150 que allá en lo oscuro quiero sentir esa mano tuya completa...»',
    next: 's1_leaving_violeta_hub'
  },

  // ==========================================================================
  // PUNTO DE ENTRELAZADO 2: SALIENDO TOMADOS DE VIOLETA
  // ==========================================================================
  s1_leaving_violeta_hub: {
    scenario: '2150',
    subScene: 'violeta',
    locationLabel: 'SALIENDO DE VIOLETA — RUMBO A 2150',
    speaker: 'NARRADOR',
    slots: { left: 'che', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    text: 'Salen todos de Violeta bien tomados por los guaritos. En la acera, J va pegadito detrás de Cataleya sin soltarle la cadera ni para cruzar el semáforo.',
    flagText: {
      violeta_vip: 'Como Che vio el agarrón salvaje que J y Cataleya se dieron en el rincón de Violeta, Che para un taxi ahí mismo antes de subir a 2150: —«Yo me abro sano pa’ mi casa, ustedes están incontrolables.»',
      violeta_guaro_full: 'Con la botella entera de guaro que se bajaron en Violeta, Da y Sai vienen prendidísimos mientras Che camina detrás rezando para que no hagan locuras en 2150.'
    },
    choices: [
      {
        text: 'Pasar primero 10 minutos por Virocasa (la casa de J y Da) a dejar las chaquetas, explorar la cocina y que J y Cataleya estrenen la nevera.',
        tag: 'Entrelazar con Virocasa + Luego subir a 2150 🔗🏠',
        spicyChoice: true,
        setFlags: { escala_virocasa: true },
        giveItem: 'llave_virocasa',
        effects: { parche: 25, alerta: 15 },
        next: 's1_intertwine_virocasa_stop'
      },
      {
        text: 'Subir directo y bien tomados desde Violeta hasta la pista oscura de 2150 para el desafío del Rey del Roce.',
        tag: 'Directo al Clímax de 2150 🥃🕺',
        spicyChoice: true,
        effects: { parche: 25 },
        next: 's1_2150_converge'
      }
    ]
  },

  s1_intertwine_virocasa_stop: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — ESCALA CALIENTE ANTES DE 2150',
    chapterBanner: {
      subtitle: 'CAMINOS ENTRELAZADOS',
      title: 'ESCALA EN VIROCASA',
      desc: 'Pasan por la casa de J y Da antes de subir a 2150... y J obtiene la Llave con Doble Seguro.'
    },
    speaker: 'J',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🗝️🔥 ¡Obtuviste la Llave de Virocasa y estrenaron la nevera!',
    text: 'Entran un momento a Virocasa, la casa donde viven J y Da, para dejar las chaquetas antes de entrar a 2150. Mientras Da busca vasos en el comedor, J empuja a Cataleya contra la nevera de Virocasa, se le pega atrás a rozárselo y se mandan tremendo agarrón. Cataleya guarda en el bolsillo de J la **Llave con Doble Seguro de Virocasa**: —«Con esta llave nos encerramos ahorita, J...» ¡Y vuelven a salir todos rumbo a 2150!',
    next: 's1_2150_converge'
  },

  // ==========================================================================
  // ACTO 3: 2150 CLUB (CON MINIJUEGO DEL REY DEL ROCE Y RAMAS ENTRELAZADAS)
  // ==========================================================================
  s1_2150_converge: {
    scenario: '2150',
    subScene: '2150',
    locationLabel: '2150 CLUB — LAS HORAS AVANZAN',
    chapterBanner: {
      subtitle: 'PUNTO CENTRAL DE ENTRELAZADO',
      title: 'CLÍMAX EN 2150',
      desc: 'Todas tus decisiones previas e ítems convergen en la oscuridad de 2150.'
    },
    speaker: 'NARRADOR',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    text: 'Adentro de 2150 los láseres cortan la niebla y el reggaetón retumba en el pecho. Si Che no se había ido antes, al ver el desorden decide coger su taxi sano a dormir, dejando en la rumba únicamente a **J, Da y Sai** con las mujeres. Pasan las horas en 2150 y Cataleya jala a J hacia la esquina más oscura del palco.',
    flagText: {
      escala_virocasa: 'J toca en su bolsillo la llave de Virocasa que Cataleya le dio contra la nevera hace media hora y la sangre le hierve al doble.',
      violeta_vip: 'Cataleya todavía tiene los labios encendidos por los guaritos que tomaron juntos en el rincón VIP de Violeta.'
    },
    choices: [
      {
        text: '🕹️ [JUGAR MINIJUEGO EN 2150] Activar el Desafío "El Rey del Roce en 2150": rozárselo y mandarle mano a Cataleya al 100% sin que Da ni Sai interrumpan.',
        tag: 'Minijuego del Rey del Roce 🍑👑',
        spicyChoice: true,
        minigameId: 'roce_2150',
        effects: { parche: 40 },
        next: 's1_j_grab_action'
      },
      {
        text: 'Ir directo al ataque en el palco oscuro de 2150 y mandarle toda la mano a Cataleya sin anestesia.',
        tag: 'Mandar Mano Directo 🖐️🔥',
        spicyChoice: true,
        effects: { parche: 30 },
        next: 's1_j_grab_action'
      }
    ]
  },

  s1_j_grab_action: {
    scenario: '2150',
    subScene: '2150',
    locationLabel: '2150 CLUB — ¡ROCE Y MANDADA DE MANO SIN FRENO!',
    speaker: 'J',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🌶️🖐️ ¡CLÍMAX EN 2150! J se lo roza y le manda mano a fuego a Cataleya',
    text: '¡En el rincón más oscuro del palco de 2150, J se desata como el verdadero Rey del Roce! Con los guaritos de Violeta en la cabeza, J pega a Cataleya contra su cuerpo por detrás, se lo roza al ritmo del bajo ¡y baja el brazo para mandarle toda la mano con sorpresa incluida! Cataleya suelta un gemido al oído de J y también le manda mano a él: —«Desde El Cable te tenía ganas, J... nadie me lo roza ni me manda mano tan rico como tú.»',
    next: 's1_2150_reaction'
  },

  s1_2150_reaction: {
    scenario: '2150',
    subScene: '2150',
    locationLabel: '2150 CLUB — BIFURCACIÓN HACIA LA RAMA FINAL',
    speaker: 'Sai',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    text: '—«¡¡MIREN A J Y A CATALEYA EN ESE PALCO!! ¡Tanto que J decía que iba a cuidar a Da en El Cable y mírenlo cómo se lo está rozando y mandándole mano en pleno 2150!!» Tus decisiones anteriores y tus objetos del bolsillo se conectan aquí. ¿Qué rama final tomas?',
    choices: [
      {
        text: 'Dejar que tus decisiones previas en El Cable, Violeta y Virocasa decidan automáticamente el destino de J y Cataleya.',
        tag: '🔗 Destino Según Tus Decisiones Previas 🎲🔥',
        spicyChoice: true,
        autoBranchByFlags: true,
        effects: { parche: 35 }
      },
      {
        text: 'Rama Canon del Taxi (o Sabotaje si tienes el Pincha-Taxis): Salen a la puerta de 2150 hirviendo de ganas y aparece un taxi amarillo...',
        tag: 'Rama Final 2 (CANON) / Final 7 (Con Pincha-Taxis) 🚕😡',
        spicyChoice: true,
        effects: { parche: 35, alerta: 25 },
        next: 's1_canon_step1_hot_door'
      },
      {
        text: 'Rama Virocasa Íntimo: Cataleya no aguanta las ganas con J, se escabullen de 2150 y se encierran solos en Virocasa dejando a Da afuera.',
        tag: 'Rama Final 1 (Encerrón en Virocasa) 🏠💋',
        spicyChoice: true,
        effects: { parche: 45 },
        next: 's2_f1_arrive_virocasa'
      },
      {
        text: 'Rama Todos al After en Virocasa: El descontrol de J y Cataleya contagia a todos (menos a Che) y la noche sigue entre Virocasa y Virocentro.',
        tag: 'Ramas Finales 3, 4, 5 y 8 (Virocasa / Virocentro) 🛋️🐶',
        spicyChoice: true,
        effects: { parche: 40, diegui: -20 },
        next: 's2_intro'
      }
    ]
  },

  // ==========================================================================
  // RAMA FINAL 1: ENCERRÓN ÍNTIMO EN VIROCASA (J Y CATALEYA SOLOS)
  // ==========================================================================
  s2_f1_arrive_virocasa: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — J Y CATALEYA SOLOS EN CASA',
    chapterBanner: {
      subtitle: 'RAMA FINAL 1 — PASIÓN SIN TESTIGOS',
      title: 'ENCERRÓN EN VIROCASA',
      desc: 'Che se fue en taxi temprano y J se encierra con Cataleya en la casa donde vive con Da.'
    },
    speaker: 'Cataleya',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    text: 'J y Cataleya salen disparados de 2150 rozándoselo y mandándose mano hasta en el asiento trasero del taxi y entran como huracán a **Virocasa** (la casa donde viven J y Da). J pasa el doble seguro de la puerta mientras Cataleya lo empuja contra el sofá de la sala: —«Ahora sí estamos solitos en Virocasa, mi Rey del Roce... desquítate de todo lo que aguantaste desde El Cable.»',
    flagText: {
      escala_virocasa: 'Con la llave que habían dejado lista en la escala previa en Virocasa, no tardaron ni dos segundos en abrir y trancar por dentro.',
      violeta_vip: 'El agarrón que empezaron en el rincón VIP de Violeta por fin llega a su segunda parte sin nadie que los interrumpa.'
    },
    next: 's2_f1_virocasa_bedroom'
  },

  s2_f1_virocasa_bedroom: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — DE LA SALA AL CUARTO DE J',
    speaker: 'J',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    text: 'Empiezan mandándose mano en el sofá compartido de Virocasa, tumban los cojines al piso y pasan directo al cuarto de J en un rato súper íntimo, caliente y sin freno. Entre roces pegaditos, suspiros, risas pícaras y el colchón rechinando a todo dar, J y Cataleya hacen temblar hasta las ventanas de Virocasa.',
    next: 's2_final1_virocasa'
  },

  s2_final1_virocasa: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — DA TRANCADO AFUERA EN EL ANDÉN',
    speaker: 'Da',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🏆 ¡FINAL 1! J y Cataleya desbarataron Virocasa a puerta cerrada',
    text: 'Cuarenta minutos después llega Da a dormir a Virocasa, mete su llave y se estrella contra la cadena puesta por dentro. Escuchando todo el concierto pasional de J y Cataleya desde la ventana del segundo piso, Da golpea la puerta: —«¡J, ábrame huevón que yo vivo aquí en Virocasa!» Y J le grita desde la cama bien abrazado con Cataleya: —«¡Váyase a dormir donde Sai, Da, que hoy Virocasa está ocupada toda la madrugada!»',
    endingId: 'end_1_virocasa_intimo'
  },

  // ==========================================================================
  // RAMA FINAL 2 (CANON) Y FINAL 7 (SABOTAJE DEL TAXI CON ÍTEM)
  // ==========================================================================
  s1_canon_step1_hot_door: {
    scenario: '2150',
    subScene: '2150_street',
    locationLabel: 'PUERTA DE 2150 — ÚLTIMO AGARRÓN Y EL TAXI AMARILLO',
    chapterBanner: {
      subtitle: 'RAMA DEL TAXI EN 2150',
      title: 'EL TAXI DE CATALEYA',
      desc: 'Calentura al 1000% en la puerta de 2150... cuando aparece un taxi amarillo.'
    },
    speaker: 'Cataleya',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    text: 'Salen a la acera afuera de 2150. J está tan prendido por los guaritos de Violeta y la mandada de mano adentro que vuelve a acorralar a Cataleya contra el muro exterior, rozándoselo bien sabroso mientras ella le besa el cuello y lo deja hirviendo como una cafetera: —«Uy J, me encantó cómo me lo rozaste y me mandaste mano toda la noche...» En ese instante, un taxi amarillo frena frente a ellos y Cataleya estira la mano para subirse.',
    choices: [
      {
        text: 'Seguir la Historia Canon: Cataleya se sube al taxi y se va sola (quedan J, Da y Sai; todos consiguen pareja hetero en ambiente y J sale bravo caminando).',
        tag: 'Final 2 (HISTORIA CANON) 🚕😡',
        effects: { alerta: 30 },
        next: 's1_canon_step2_taxi_leaves'
      },
      {
        text: '🪛 [USAR PINCHA-TAXIS NOCTURNO] Desinflarle la llanta al taxi amarillo en secreto para que Cataleya no pueda irse y se quede con J.',
        tag: 'Final 7 (Sabotaje Anti-Canon) 🪛🔥',
        requireItem: 'pincha_taxis',
        spicyChoice: true,
        effects: { parche: 50 },
        next: 's1_ending_7_pincha_taxis'
      }
    ]
  },

  s1_ending_7_pincha_taxis: {
    scenario: '2150',
    subScene: '2150_street',
    locationLabel: 'AFUERA DE 2150 — ¡TAXI PINCHADO Y CORONACIÓN!',
    speaker: 'Cataleya',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🪛🏆 ¡FINAL 7 DESBLOQUEADO! Saboteaste el taxi de la historia Canon',
    text: 'Justo cuando Cataleya abre la puerta del taxi, J saca el **Pincha-Taxis Nocturno** de su bolsillo y ¡PSSSSSH!, le desinfla la llanta trasera al taxi amarillo. El taxista se baja echando madres con la cruceta en la mano y Cataleya suelta una carcajada mirando a J: —«¿Así de desesperado estás por seguir rozándomelo, J? Está bien, ganaste: vámonos a encerrar hasta mañana.» ¡Y J cambió su destino!',
    endingId: 'end_7_pincha_taxis'
  },

  s1_canon_step2_taxi_leaves: {
    scenario: '2150',
    subScene: '2150_street',
    locationLabel: 'AFUERA DE 2150 — CATALEYA COGE TAXI',
    speaker: 'Cataleya',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'angry', cataleya: 'flirty' },
    sfx: 'bark',
    toast: '🚕💨 ¡Cataleya paró un taxi y dejó a J con la mano caliente!',
    text: 'En el momento más alto de calentura de J, ¡Cataleya le da una última palmadita pícara en el pecho, se sube sola al taxi amarillo y baja el vidrio!: —«Estuvo delicioso ese roce y esa mano tuya en Violeta y en 2150, J, pero hoy te dejo con las ganas pa’ la próxima. ¡Chao pues, papi!» ¡PUM! Cierra la puerta del taxi y arranca calle abajo.',
    next: 's1_canon_step3_only_three'
  },

  s1_canon_step3_only_three: {
    scenario: '2150',
    subScene: '2150',
    locationLabel: '2150 CLUB — SOLO QUEDARON J, DA Y SAI',
    speaker: 'NARRADOR',
    slots: { left: 'da', center: 'j', right: 'sai' },
    activeSlot: 'center',
    moods: { j: 'angry' },
    text: 'J se queda congelado en el andén con la calentura al 1000% viendo perderse el taxi de Cataleya. Como Che ya había cogido taxi temprano y Cataleya se acaba de ir en otro taxi, **del grupo solo quedaron J, Da y Sai**. J vuelve a entrar a 2150 hirviendo de la piedra para decirles a Da y a Sai que se vayan... pero cuando entra a la pista, ve lo que pasó mientras él estaba afuera.',
    next: 's1_canon_step4_hetero_ambiente'
  },

  s1_canon_step4_hetero_ambiente: {
    scenario: '2150',
    subScene: '2150',
    locationLabel: '2150 CLUB — PAREJAS HETEROSEXUALES Y AMBIENTE TOTAL',
    speaker: 'Da',
    slots: { left: 'da', center: 'antonia', right: 'sai' },
    activeSlot: 'left',
    text: '¡Adentro de 2150 **todos consiguieron pareja heterosexual y están en pleno ambiente**! Da se olvidó por completo de Cataleya y ya está apretando y dándose besos apasionados con Antonia (pareja heterosexual), y Sai también levantó pareja heterosexual en la barra y está perreando pegadito con una mujer divina. Todo el mundo está feliz, brindando y en el mejor ambiente de la noche: —«¡Mire J, coronamos pareja heterosexual! ¡Venga métase al ambiente!» le grita Da.',
    next: 's1_canon_taxi_ending'
  },

  s1_canon_taxi_ending: {
    scenario: '2150',
    subScene: '2150_street',
    locationLabel: 'AVENIDA EL CABLE — J SALE BRAVO CAMINANDO',
    speaker: 'J',
    slots: { left: 'da', center: 'j', right: 'sai' },
    activeSlot: 'center',
    moods: { j: 'angry' },
    sfx: 'bark',
    toast: '😡🚶‍♂️ ¡FINAL CANON! Todos en ambiente con pareja hetero y J salió bravo caminando',
    text: 'J mira a Da y a Sai felices en pleno ambiente con sus parejas heterosexuales, mira su propia mano que todavía huele al perfume de Cataleya y le da un ataque de rabia monumental: —«¡Qué ambiente ni qué mierda si Cataleya se fue en taxi!» **Y mientras todos seguían adentro en pleno ambiente, J salió bravo caminando solo por toda la avenida**, echando humo por las orejas y pateando cuanto tarro encontraba en el andén.',
    endingId: 'end_2_canon_taxi'
  },

  // ==========================================================================
  // ESCENARIO 2: VIROCASA (CON EXPLORACIÓN INTERACTIVA DE LA CASA DE J Y DA)
  // ==========================================================================
  s2_intro: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — LA CASA DONDE VIVEN J Y DA',
    chapterBanner: {
      subtitle: 'ESCENARIO 2 — EXPLORACIÓN Y DESCONTROL',
      title: 'BIENVENIDOS A VIROCASA',
      desc: 'El grupo aterriza en la casa de J y Da mientras J y Cataleya siguen a fuego.'
    },
    speaker: 'Da',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    text: 'Con Che ya durmiendo sano en su casa (cero cosas raras para Che), el resto del parche aterriza después de 2150 en **Virocasa**, la casa donde viven J y Da. Apenas entran a la sala, J sienta a Cataleya en sus piernas en el sofá grande de Virocasa y sigue rozándoselo y mandándole mano delante de todos.',
    flagText: {
      escala_virocasa: 'Como J y Cataleya ya habían calentado motores antes en la nevera de Virocasa, ahora van directo al grano sin ningún pudor.',
      violeta_guaro_full: 'Todavía traen media botella del guaro de Violeta y la sirven en la mesita de centro de Virocasa.'
    },
    next: 's2_virocasa_hub'
  },

  s2_virocasa_hub: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — EXPLORAR LA CASA DE J Y DA',
    speaker: 'Cataleya',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    text: 'Estás en **Virocasa**. Da reclama porque el sofá que pagan a medias entre J y él está traqueando con cada roce de J y Cataleya. ¿Qué rincón de Virocasa quieres explorar o qué rama quieres activar?',
    choices: [
      {
        text: '🔍 [Explorar la Cocina de Virocasa] Ir con Cataleya a la nevera a buscar hielo, encontrar una Galleta pa’ Jairo y pegarse un agarrón contra el congelador.',
        tag: 'Explorar Cocina + Ganar 🦴 Galleta pa’ Jairo',
        spicyChoice: true,
        giveItem: 'galleta_jairo',
        effects: { parche: 20 },
        next: 's2_virocasa_explore_kitchen'
      },
      {
        text: '🔍 [Revisar los Cojines del Sofá de Da] Buscar entre los cojines del sofá de Virocasa mientras Cataleya se mueve encima de J.',
        tag: 'Explorar Sofá + Ganar $25.000 💵',
        spicyChoice: true,
        giveMoney: 25000,
        effects: { parche: 20 },
        next: 's2_virocasa_explore_sofa'
      },
      {
        text: '👑 [Coronación del Rey del Roce] Si tienes la Corona del Rey del Roce o la Loción del Roce, armar el trono oficial con Cataleya en Virocasa.',
        tag: 'Final 8 (Imperio del Rey del Roce) 👑🍑',
        requireItem: 'perfume_roce',
        spicyChoice: true,
        effects: { parche: 50 },
        next: 's2_ending_8_roce_king'
      },
      {
        text: 'Avanzar al Gran Cruce de Virocasa (donde aparece el fantasma Diegui y se deciden los Finales 3, 4 y 5).',
        tag: 'Continuar Historia en Virocasa ▸',
        spicyChoice: true,
        next: 's2_virocasa_crossroads'
      }
    ]
  },

  s2_virocasa_explore_kitchen: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — AGARRÓN EN LA NEVERA',
    speaker: 'J',
    slots: { left: null, center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🦴🔥 Encontraste el Hueso Gourmet pa’ Jairo en la cocina de Virocasa',
    text: 'En la cocina de Virocasa, J abre la alacena, guarda en su bolsillo un **Hueso Gourmet pa’ Jairo** por si más tarde van a Virocentro, y de inmediato acorrala a Cataleya contra la puerta de la nevera mandándole mano y rozándoselo hasta empañar los vidrios.',
    next: 's2_virocasa_hub'
  },

  s2_virocasa_explore_sofa: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — RECHINANDO EL SOFÁ COMPARTIDO',
    speaker: 'Da',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    toast: '💵 Encontraste $25.000 debajo de los cojines del sofá de Virocasa',
    text: 'Metiendo la mano bajo la falda de Cataleya en el sofá de Virocasa, J encuentra de paso un billete de $25.000 que a Da se le había caído. Da los mira indignado: —«¡Oiga J, ese sofá de Virocasa lo pagamos a cuotas entre los dos y usted ya le está desgastando el tapizado rozándoselo a Cataleya!»',
    next: 's2_virocasa_hub'
  },

  s2_ending_8_roce_king: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — TRONO DEL REY DEL ROCE',
    speaker: 'Cataleya',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '👑🍑 ¡FINAL 8! J fue coronado Emperador del Roce con Cataleya',
    text: 'Con la Loción del Rey del Roce y la técnica perfeccionada en el minijuego de 2150, J pone a Cataleya a temblar en medio de Virocasa a punta de roce continuo y mano maestra. Sai y Da aplauden de pie mientras Cataleya le pone la corona oficial: —«Que quede escrito en todo Manizales: a J nadie le gana rozándoselo a una trans.»',
    endingId: 'end_8_rey_del_roce_supremo'
  },

  s2_virocasa_crossroads: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — EL GRAN CRUCE HACIA LA RAMA FINAL',
    speaker: 'Diegui',
    slots: { left: 'da', center: 'diegui', right: 'j' },
    activeSlot: 'center',
    moods: { j: 'spicy' },
    sfx: 'ghost',
    text: 'Aparece el fantasma Diegui flotando sobre el televisor de Virocasa viendo cómo J y Cataleya se comen a mano limpia en el sofá. Aquí las líneas de la historia se dividen hacia su rama final. ¿Qué provoca el descontrol de J y Cataleya en Virocasa?',
    choices: [
      {
        text: 'Al ver a J y Cataleya tan calientes en el sofá de Virocasa, Da empuja al fantasma Diegui y dice: «¡Pues todos mandamos mano menos Che!»',
        tag: 'Rama Final 3 (Todos Mandan Mano Menos Che) 🖐️🔥',
        spicyChoice: true,
        effects: { parche: 45, diegui: -35 },
        next: 's1_all_hands_except_che'
      },
      {
        text: 'J conecta el bafle grande de Virocasa para tapar los gemidos con Cataleya, estallan los tacos de la luz y se arma el apagón.',
        tag: 'Rama Final 5 (Apagón Caliente en Virocasa) ⚡👻',
        spicyChoice: true,
        effects: { parche: 50, diegui: -25 },
        next: 's2_f5_blackout_step1'
      },
      {
        text: 'Como en Virocasa todos los están mirando, J toma la decisión más peligrosa: llevarse a Cataleya a Virocentro (la casa de su mamá Sandra).',
        tag: 'Rama Final 4 (Ir a Virocentro + Minijuego de Jairo) 🐶🚨',
        spicyChoice: true,
        effects: { alerta: 40, parche: 45 },
        next: 's3_intro'
      }
    ]
  },

  // ==========================================================================
  // RAMA FINAL 3: TODOS MANDAN MANO MENOS CHE
  // ==========================================================================
  s1_all_hands_except_che: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — TODOS MANDAN MANO MENOS CHE',
    speaker: 'Da',
    slots: { left: 'da', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🖐️🔥 ¡FINAL 3! Todos mandaron mano menos Che',
    text: 'Viendo que J lleva desde El Cable, Violeta y 2150 mandándole mano y rozándoselo a Cataleya y que ella le responde aún más caliente en el sofá de Virocasa, Da manda de vacaciones al fantasma Diegui: —«¡Qué camino del bien ni qué nada! ¡Si J y Cataleya mandan mano en mi propio sofá, hoy mandamos mano todos!» Da mete mano con Antonia, Sai también manda mano en la sala y J con Cataleya coronan en el sofá de Virocasa... mientras Che duerme sano y salvo en su casa. ¡Todos mandaron mano menos Che!',
    endingId: 'end_3_todos_menos_che'
  },

  // ==========================================================================
  // RAMA FINAL 5: APAGÓN EN VIROCASA Y RENUNCIA DE DIEGUI
  // ==========================================================================
  s2_f5_blackout_step1: {
    scenario: 'virocasa',
    subScene: 'virocasa_dark',
    locationLabel: 'VIROCASA A OSCURAS — CORTOCIRCUITO Y MANO LIBRE',
    speaker: 'Cataleya',
    slots: { left: 'sai', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '⚡🔥 ¡Se fue la luz en Virocasa! J y Cataleya sin censura en lo oscuro',
    text: '¡PUM! Saltan chispas en la caja eléctrica y toda Virocasa queda a oscuras. En medio del apagón total, Cataleya jala a J sobre el sofá de Da y se desatan sin que nadie pueda verlos: J se lo roza y le manda mano por todas partes mientras Cataleya le guía las manos entre suspiros ardientes: —«Qué rico que se fue la luz en Virocasa, J... ahora sí méteme mano sin miedo.»',
    next: 's2_ending_5_blackout'
  },

  s2_ending_5_blackout: {
    scenario: 'virocasa',
    subScene: 'virocasa',
    locationLabel: 'VIROCASA — VUELVE LA LUZ Y DIEGUI RENUNCIA',
    speaker: 'Diegui',
    slots: { left: 'diegui', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'ghost',
    toast: '🏆 ¡FINAL 5! El fantasma Diegui renunció por culpa de J y Cataleya',
    text: '¡CLAC! Cuando Da sube los tacos y vuelve la luz en Virocasa, encuentran a J y Cataleya despelucados, sudando y todavía mandándose mano encima del sofá. El fantasma Diegui tira su aureola contra el piso de Virocasa: —«¡Renuncio irrevocablemente! ¡Ni con mil oraciones se le baja la calentura a J con Cataleya en esta casa!»',
    endingId: 'end_5_diegui_renuncia'
  },

  // ==========================================================================
  // ESCENARIO 3: VIROCENTRO (CON MINIJUEGO DE SIGILO CONTRA JAIRO EL POMERANIA)
  // ==========================================================================
  s3_intro: {
    scenario: 'virocentro',
    subScene: 'virocentro',
    locationLabel: 'VIROCENTRO — CASA FAMILIAR DE J',
    chapterBanner: {
      subtitle: 'ESCENARIO 3 — DESAFÍO EN VIROCENTRO',
      title: 'PELIGRO EN VIROCENTRO',
      desc: 'La casa normal de J: Cataleya, Jairo el Pomerania, su mamá Sandra y sus 3 hermanas.'
    },
    speaker: 'NARRADOR',
    slots: { left: 'j', center: 'cataleya', right: 'jairo' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    text: 'Saliendo de Virocasa con las ganas al tope, J mete a Cataleya en puntillas a **Virocentro**, su casa familiar tradicional donde duermen su mamá Sandra y sus 3 hermanas en el segundo piso. Apenas llegan al sillón de la sala, J y Cataleya vuelven a prenderse a mano limpia... mientras **Jairo**, su perro Pomerania, los mira fijo debajo de la mesa.',
    flagText: {
      cable_barra: 'Desde aquel primer agarrón detrás de la barra de El Cable hasta la sala de su mamá Sandra, J no ha soltado a Cataleya ni un minuto.',
      escala_virocasa: 'Después de haber pasado por Virocasa y ahora por Virocentro, J y Cataleya ya llevan dos casas recorridas a punta de roce y mano.'
    },
    next: 's3_jairo_crisis'
  },

  s3_jairo_crisis: {
    scenario: 'virocentro',
    subScene: 'virocentro',
    locationLabel: 'VIROCENTRO — J Y CATALEYA EN EL SILLÓN FAMILIAR',
    speaker: 'Cataleya',
    slots: { left: 'jairo', center: 'j', right: 'cataleya' },
    activeSlot: 'right',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'bark',
    text: 'En el sillón de Virocentro, Cataleya le agarra la mano a J y la mete bien adentro mientras le susurra: —«Cuidado nos escuchan tu mamá Sandra y tus 3 hermanas, J... pero síguemelo rozando que está demasiado rico.» Jairo el Pomerania gruñe bajito oliendo el peligro. ¿Qué haces en Virocentro?',
    choices: [
      {
        text: '🕹️ [JUGAR MINIJUEGO DE VIROCENTRO] Equilibrar la Mano con Cataleya y las Galletas para Jairo sin despertar a Doña Sandra.',
        tag: 'Minijuego de Sigilo y Mano 🐶🎮',
        spicyChoice: true,
        minigameId: 'sigilo_jairo',
        effects: { parche: 50 },
        next: 's3_ending_4_jairo'
      },
      {
        text: 'A J se le olvida el mundo entero y le manda mano a dos manos a Cataleya haciendo rechinar el sillón de Doña Sandra.',
        tag: 'Sin Freno en el Sillón Familiar (Final 4) 🚨🌶️',
        spicyChoice: true,
        effects: { alerta: 50, parche: 50 },
        next: 's3_ending_4_jairo'
      }
    ]
  },

  s3_ending_4_jairo: {
    scenario: 'virocentro',
    subScene: 'virocentro',
    locationLabel: 'VIROCENTRO — JAIRO LADRA Y SANDRA PRENDE LA LUZ',
    speaker: 'Sandra',
    slots: { left: 'sandra', center: 'j', right: 'cataleya' },
    activeSlot: 'left',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'bark',
    toast: '🏆 ¡FINAL 4! Pillados en Virocentro con la mano bien adentro',
    text: 'En el punto más caliente entre J y Cataleya en el sillón de Virocentro, ¡Jairo el Pomerania se acaba la galleta, salta, le muerde el pantalón a J y pega un ladrido de sirena policial! ¡CLIC! **Sandra y las 3 hermanas** prenden la luz de las escaleras y pillan a J en vivo y a todo color mandándole toda la mano a Cataleya en el mueble de la sala: —«¡¡JESÚS, MARÍA Y JOSÉ, QUÉ ESTÁ HACIENDO J EN MI MUEBLE!!»',
    endingId: 'end_4_jairo_virocentro'
  },

  // ==========================================================================
  // RAMA FINAL 6 (SECRETO OCULTO): EL SEÑOR DE LAS TRES CASAS
  // ==========================================================================
  s1_secret_multiverse_ending: {
    scenario: 'virocentro',
    subScene: 'virocentro',
    locationLabel: '2150 + VIROCASA + VIROCENTRO — CORONACIÓN SUPREMA',
    speaker: 'J',
    slots: { left: 'jairo', center: 'j', right: 'cataleya' },
    activeSlot: 'center',
    moods: { j: 'spicy', cataleya: 'flirty' },
    isSpicy: true,
    leanJ: 'right',
    sfx: 'spicy',
    toast: '🥚👑 ¡DESBLOQUEASTE EL FINAL SECRETO OCULTO!',
    text: '¡Con el poder de los Easter Eggs y los guaritos de Violeta, J y Cataleya entrelazan las tres paradas en una sola noche legendaria! Le pinchan las llantas a los taxis afuera de 2150, se mandan mano en el palco, pasan por Virocasa a desbaratar el sofá de Da y rematan a las 5:00 AM en el sillón de Virocentro dándole un pernil gigante a Jairo el Pomerania para que haga guardia en silencio mientras Sandra y las 3 hermanas roncan. ¡Coronación total!',
    endingId: 'end_6_multiverso_mano'
  }
};
