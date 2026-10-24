// ============================================================================
// JAIRO RESCUEE — HISTORIA, PERSONAJES Y 10 NIVELES (EDICIÓN PICANTE 🌶️)
// ============================================================================

const RESCUE_CHARACTERS = {
  j: {
    id: 'j',
    name: 'J',
    role: 'Héroe Rescatista (Jugador)',
    color: '#f59e0b',
    badge: '🔥 Protagonista',
    bio: 'Cuando le roban a su Pomerania, J se pone la chaqueta de cuero y sale a rescatarlo por Virocentro, el Cine, San Jorge y Virocasa. Doble salto, disparo ardiente y fama de mandar mano hasta en los videojuegos.',
    traits: ['Dueño de Jairo', 'Rey del Roce Retirado', 'Aliado de Gael y Derian']
  },
  jairo: {
    id: 'jairo',
    name: 'Jairo',
    role: 'El Pomerania Secuestrado',
    color: '#fbbf24',
    badge: '🐶 Objetivo del Rescate',
    bio: 'El Pomerania más esponjoso y consentido de Virocentro. Lo secuestraron justo cuando Derian lo tenía bien aceitado y relajadito. Todavía no se sabe quién gimió más: el perro o el masajista.',
    traits: ['200% Esponjoso', 'Adicto al Aceite de Derian', 'Alarma Ultrasónica']
  },
  jair: {
    id: 'jair',
    name: 'Jair',
    role: 'Jefa Malvada Principal (Secuestradora)',
    color: '#c026d3',
    badge: '💋 Jefa Final',
    bio: 'La reina del mal en tacones y corset de cuero. Secuestró a Jairo porque, según ella, "ese pelaje merece una dueña con más estilo". Se atrinchera en Virocasa con látigo, labial rojo y cero paciencia.',
    traits: ['Villana Fatal', 'Labial Rojo Letal', 'Fortaleza en Virocasa']
  },
  javier: {
    id: 'javier',
    name: 'Javier',
    role: 'Secuestradora y "Novia" de Cine de Jairo',
    color: '#ec4899',
    badge: '🍿 La Pareja de Jairo en el Cine',
    bio: 'La mejor amiga de Jairo (el perro Pomerania) para ir al cine, siempre en la última fila con el perro en brazos dándole crispetas en la boquita. Sandra jura que "Javier y Jairo parecen novios" porque no se pierden ni un estreno juntos. Secuestró a Jairo para tenerlo en exclusividad para sus funciones de cine privadas.',
    traits: ['Mejor Amiga de Cine de JAIRO', 'Sandra Dice que Jairo y Ella Parecen Novios', 'Balde de Crispetas con Mantequilla']
  },
  gael: {
    id: 'gael',
    name: 'Gael',
    role: 'Webcamer Estrella y Aliado de J',
    color: '#ec4899',
    badge: '🎥 Aliado en San Jorge',
    bio: 'Webcamer gay y amigo de J que transmite desde su estudio VIP en San Jorge. Se alía en el Nivel 5 y pelea con su Aro de Luz LED y Lluvia de Tokens, sin dejar de pedir propinas en pleno combate.',
    traits: ['Webcamer Gay', 'Aro de Luz Destructor', 'Cobra Tokens Hasta en la Guerra']
  },
  da: {
    id: 'da',
    name: 'Da',
    role: 'Aliado de J (Compañero de Virocasa)',
    color: '#3b82f6',
    badge: '🤝 Aliado en Virocasa',
    bio: 'El compañero de casa de J en Virocasa y casi su gemelo: misma cara, misma pinta, solo cambia la ropa (J de cuero, Da de azul). Aparece en El Manzanareño comiendo bandeja paisa y se une a la causa. Conoce cada rincón de Virocasa y todo lo que se escucha a través de la pared.',
    traits: ['Vive con J en Virocasa', 'Gemelo Fashion de J', 'Aliado en El Manzanareño y Virocasa']
  },
  derian: {
    id: 'derian',
    name: 'Derian',
    role: 'Maestro de los Masajes en Aceite',
    color: '#eab308',
    badge: '🧴 Especialista en Aceite',
    bio: 'Le da masajes a Jairo bañándolo en aceite tibio. Sandra piensa que ahí pasa otra cosa y toca la puerta cada cinco minutos. Derian jura que es puro masaje canino... y el perro no lo desmiente.',
    traits: ['Masajista Oficial de Jairo', 'Sandra Piensa Mal', 'Pisos Resbalosos Turbo']
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    role: 'Mamá de J (Comandante en Virocentro)',
    color: '#f43f5e',
    badge: '🚨 Alerta Materna',
    bio: 'La mamá de J. Coordina el rescate por WhatsApp entre regaños y sospechas: que si J y Javier parecen novios, que si el aceite de Derian es raro, que si en esa casa se hace de todo menos cuidar al perro.',
    traits: ['Jefa de Virocentro', 'Detective de Chismes', 'Escandalizada Profesional']
  }
};

const RESCUE_UPGRADES = [
  {
    id: 'gael_ring',
    name: '🎥 Aro LED de Gael +1',
    desc: 'Más potencia en los disparos de J y los tokens de Gael. Ilumina hasta lo que no debería verse.',
    cost: 5,
    icon: '💡'
  },
  {
    id: 'derian_oil',
    name: '🧴 Aceite Turbo de Derian',
    desc: 'Más velocidad y mejor salto. Todo resbala, todo entra, todo corre.',
    cost: 5,
    icon: '🧴'
  },
  {
    id: 'sandra_shield',
    name: '🛡️ Bendición de Doña Sandra',
    desc: '+1 corazón permanente. Viene con sermón incluido.',
    cost: 8,
    icon: '❤️'
  }
];

const RESCUE_LEVELS = [
  {
    level: 1,
    title: '¡Secuestro en Virocentro!',
    location: 'Virocentro — Casa de Sandra',
    theme: 'virocentro',
    ally: null,
    boss: null,
    slippery: false,
    length: 2200,
    targetBones: 5,
    introDialogue: [
      {
        speaker: 'sandra',
        name: 'Sandra (Mamá de J)',
        text: '«¡J, levántate ya! ¡Entraron a la sala de Virocentro y se robaron a Jairo! Dejaron crispetas regadas... ¡Seguro fue Javier, esa mujer que se lleva a Jairo a la última fila del cine! ¡Hasta parecen novios esos dos!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡¿Javier se llevó a mi Pomerania?! ¡Esa loca cree que Jairo es su novio de cine! Voy a saltar por todos los techos hasta quitárselo.»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Mamá de J)',
        text: '«¡Corre, mijo! Que capaz y le compra combo grande con gaseosa y me le indigesta al perro en plena función de novios.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«Encontré el collar de Jairo, una boleta de cine VIP para \"Javier y su bombón Jairo\", y un rastro de mantequilla derretida. Seguimos por la avenida.»'
      }
    ]
  },
  {
    level: 2,
    title: 'Calles Calientes de Virocentro',
    location: 'Virocentro — Avenida Principal',
    theme: 'virocentro_street',
    ally: null,
    boss: null,
    slippery: false,
    length: 2500,
    targetBones: 6,
    introDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«Los secuaces de Jair bloquearon la avenida. Tengo que saltar taxis y tumbar guardias. Otra noche normal en Virocentro.»'
      },
      {
        speaker: 'jair',
        name: 'Jair (Por Altavoz)',
        text: '«Mwahaha, querido J. Tu perrito ya prefiere mis cojines de seda. Si quieres recuperarlo, ven a la sala del cine... y ven con ganas.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'sandra',
        name: 'Sandra (Audio de WhatsApp)',
        text: '«📱 Mijo, me confirmaron que vieron a Javier entrando corriendo al cine con Jairo en brazos... ¡hasta boleta doble compró para ella y el perro! ¡Esa pareja de novios me tiene escandalizada!»'
      }
    ]
  },
  {
    level: 3,
    title: 'Cita Explosiva en la Última Fila',
    location: 'Multicine VIP — Sala 4',
    theme: 'cinema',
    ally: null,
    boss: {
      id: 'javier',
      name: 'JAVIER (La "Novia" de Cine de Jairo)',
      hp: 18,
      color: '#ec4899',
      quote: '«¡Jairo es mi pareja de cine favorita, J! ¡Sandra tiene razón, parecemos novios y nadie nos va a separar!»'
    },
    slippery: false,
    length: 2400,
    targetBones: 6,
    introDialogue: [
      {
        speaker: 'javier',
        name: 'Javier (La "Novia" de Cine de Jairo)',
        text: '«¡Hola, J! Ni te acerques a mi amorcito. Jairo y yo tenemos combo doble para la última fila. Le compré crispetas con mantequilla tibia y se las doy grano a grano en su hociquito. ¡Por eso me alié con Jair y me lo traje al cine!»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Llamada en Altavoz)',
        text: '«¡Lo sabía! ¡Javier y Jairo en la última fila como dos novios en luna de miel! ¡J, rescata al perro antes de que le den gaseosa con pitillo!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Javier, suelta a Jairo! ¡Mi perro no es tu novio ni tu cita de cine! ¡Devuélvelo ya o te desbarato ese cañón de crispetas!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'javier',
        name: 'Javier (Derrotada)',
        text: '«¡Ay, está bien, perdón... pero es que Jairo es tan suave y come crispetas tan rico en la oscuridad! Jair se lo llevó a la fuerza para San Jorge... ¡prométeme que cuando lo rescates me dejarás llevar a mi noviecito Jairo a la función del domingo!»'
      }
    ]
  },
  {
    level: 4,
    title: 'Subiendo a San Jorge (Cuestas Sudorosas)',
    location: 'Barrio San Jorge — Las Lomas',
    theme: 'sanjorge',
    ally: null,
    boss: null,
    slippery: false,
    length: 2650,
    targetBones: 7,
    introDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«San Jorge: puras cuestas empinadas. Hasta mi cardio sufre. Y hay drones de Jair espiando cada balcón como vecinas chismosas.»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo (A lo lejos)',
        text: '«🐶 ¡Guau guau! (Traducción: J, apúrate, me tienen cerca del estudio de Gael y escucho gemidos sospechosos de webcam.)»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«Veo una luz fucsia en un balcón. Solo puede ser el estudio de Gael: ahí hasta la luz viene con suscripción premium.»'
      }
    ]
  },
  {
    level: 5,
    title: 'Alianza Webcam en San Jorge',
    location: 'San Jorge — Estudio VIP de Gael',
    theme: 'sanjorge_gael',
    ally: 'gael',
    boss: null,
    slippery: false,
    length: 2750,
    targetBones: 7,
    introDialogue: [
      {
        speaker: 'gael',
        name: 'Gael (Amigo Webcamer)',
        text: '«¡Bebéee! Estaba en pleno show privado cuando vi a Jair pasar con Jairo. Dejé a 3.000 viewers con la boca abierta para venir a ayudarte. ¡Esto me va a costar propinas!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«Gael, qué salvada. Los guardias de Jair vienen con armadura pesada.»'
      },
      {
        speaker: 'gael',
        name: 'Gael (Aliado Activado)',
        text: '«Tranquilo, papi: con mi Aro LED y mi Lluvia de Tokens los dejamos ciegos y arruinados. Presiona PODER y verás cómo se prende esto.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«Arrasamos, amor. Y mira el piso de la siguiente cuadra: brilla de aceite tibio. Eso solo puede ser obra de Derian... ¡y de su fama!»'
      }
    ]
  },
  {
    level: 6,
    title: 'El Aceite Sospechoso de Derian',
    location: 'San Jorge — Sala de Masajes de Derian',
    theme: 'derian_spa',
    ally: 'gael',
    boss: {
      id: 'drone_jair',
      name: 'MEGA-DRON DE JAIR (Vibrador Volador)',
      hp: 22,
      color: '#eab308',
      quote: '«Gracias al aceite de Derian, el Pomerania resbaló directito a nuestra jaula.»'
    },
    slippery: true,
    length: 2800,
    targetBones: 8,
    introDialogue: [
      {
        speaker: 'derian',
        name: 'Derian (Maestro del Aceite)',
        text: '«¡J! Yo solo le estaba dando a Jairo su masaje relajante, bien aceitadito y con musiquita suave, cuando entraron los hombres de Jair. Hasta el perro estaba feliz.»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Entrando en Pánico)',
        text: '«¡¿Masajes en aceite al perro?! Derian, un cuarto cerrado, aceite por todos lados y gemidos caninos... ¡uno no sabe qué pensar!»'
      },
      {
        speaker: 'derian',
        name: 'Derian',
        text: '«Doña Sandra, le juro que es masaje profesional. Toma, J: unta tus zapatos con aceite. Todo resbala, pero correrás como nunca.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'derian',
        name: 'Derian',
        text: '«Destruimos el Mega-Dron, que vibraba más que mi cliente de las cuatro. Jair y Javier huyeron con Jairo en el furgón. El rastro de grasa lleva directo a El Manzanareño: parece que la secuestradora tenía hambre.»'
      }
    ]
  },
  {
    level: 7,
    title: 'Parada Caliente en El Manzanareño',
    location: 'Restaurante El Manzanareño',
    theme: 'manzanareno',
    ally: 'gael',
    da: 'mid',
    boss: null,
    slippery: true,
    length: 3000,
    targetBones: 8,
    introDialogue: [
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«Agárrate, J. Seguimos el furgón de Jair hasta... ¿El Manzanareño? ¿Paró a comer con el perro secuestrado? Qué mujer tan antojada.»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«La cocina está llena de grasa y aceite. Todo resbala y todo huele a bandeja paisa. Ojo con las ollas voladoras y los meseros armados.»'
      },
      {
        speaker: 'da',
        name: 'Da (Dentro del Restaurante)',
        text: '«¿J? ¡Qué susto! Yo estaba aquí en El Manzanareño con mi bandeja paisa picante cuando entró Jair arrastrando al perro. Si quieres, me uno: conozco la cocina mejor que mi propia casa.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'da',
        name: 'Da (Aliado Activado)',
        text: '«Listo, ya me uní. Y ojo, J: cuando lleguemos a Virocasa, yo me encargo de la puerta trasera. Conozco todos los ruidos de esa casa... y los tuyos también.»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«Bienvenido al equipo, Da. Ahora a Virocasa, que Jair ya debe estar acostando a mi perro en su cama de seda.»'
      }
    ]
  },
  {
    level: 8,
    title: 'Asedio a Virocasa (Patio Peligroso)',
    location: 'Virocasa — Entrada y Patio Blindado',
    theme: 'virocasa_ext',
    ally: 'gael',
    da: 'start',
    boss: null,
    slippery: false,
    length: 3100,
    targetBones: 9,
    introDialogue: [
      {
        speaker: 'jair',
        name: 'Jair',
        text: '«Bienvenido a tu propia Virocasa, querido J. Llené el patio de trampas láser y de lencería de decoración. Jairo ahora es mi mascota oficial y duerme en mis almohadas de seda.»'
      },
      {
        speaker: 'da',
        name: 'Da (Spawn en Virocasa)',
        text: '«¡Esta es MI casa también, Jair! Salí por la ventana del baño y aquí estoy, J. Yo te cubro la espalda... y la de Gael, que siempre anda grabando.»'
      },
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«Mis seguidores ya donaron 5.000 tokens para ver cómo tumbamos esa puerta. ¡Hasta los viewers quieren ver cómo se entra a Virocasa!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«Tumbamos el portón. Ya escucho los ladridos de Jairo en el último piso y, creo, unos suspiros de Jair.»'
      },
      {
        speaker: 'da',
        name: 'Da',
        text: '«Esos suspiros no son de Jair, son del tubo del baño. Llevo meses diciéndolo y nadie me cree.»'
      }
    ]
  },
  {
    level: 9,
    title: 'Virocasa en Llamas: La Revancha',
    location: 'Virocasa — Sala Principal y Escaleras',
    theme: 'virocasa_int',
    ally: 'gael',
    da: 'start',
    boss: {
      id: 'javier_v2',
      name: 'JAVIER RECARGADA (Combo Doble de Cine)',
      hp: 26,
      color: '#f472b6',
      quote: '«¡En esta sala no pasas, J! Si no vas a cine conmigo, nadie sale con el Pomerania.»'
    },
    slippery: true,
    length: 3100,
    targetBones: 9,
    introDialogue: [
      {
        speaker: 'javier',
        name: 'Javier',
        text: '«¡Sorpresa, J! Jair me prestó armadura rosa en Virocasa y Derian engrasó el piso. ¡Si no me firmas la custodia compartida para llevar a Jairo a todas las funciones de cine como mi novio oficial, de aquí no sale nadie!»'
      },
      {
        speaker: 'da',
        name: 'Da',
        text: '«Javier, estás pisando mi sala con tacones y reclamando un perro Pomerania como si fuera tu pareja. ¡Búscate un novio humano y sal de Virocasa!»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra',
        text: '«¡Virgen del Carmen! Javier haciendo berrinche en Virocasa porque quiere ser la novia del perro. ¡Esa mujer necesita ayuda urgente!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'javier',
        name: 'Javier',
        text: '«Ay, me resbalé con el aceite y quedé en una posición muy comprometedora. Sube, J: Jair tiene la jaula en el cuarto principal. Y llámame, ¿sí?»'
      }
    ]
  },
  {
    level: 10,
    title: 'Gran Final en el Cuarto Maestro: ¡Rescata a Jairo!',
    location: 'Virocasa — Cuarto Maestro (Batalla Final)',
    theme: 'virocasa_boss',
    ally: 'gael',
    da: 'start',
    boss: {
      id: 'jair_final',
      name: 'JAIR (Reina Suprema del Secuestro)',
      hp: 38,
      color: '#c026d3',
      quote: '«¡Esta es mi alcoba y mis reglas! Ni tú, ni el webcamer, ni el aceite de Derian salvarán a Jairo.»'
    },
    slippery: false,
    length: 3300,
    targetBones: 10,
    introDialogue: [
      {
        speaker: 'jair',
        name: 'Jair (Jefa Final)',
        text: '«Llegaste al cuarto más caliente de Virocasa, J. Aquí tengo a Jairo en su jaula dorada, con collar de diamantes y todo. Prepárate: te voy a dejar sin aliento.»'
      },
      {
        speaker: 'da',
        name: 'Da',
        text: '«Ese es MI cuarto vecino, Jair. Cada vez que alguien entra ahí se escucha todo por la pared. Esta vez el ruido va a ser tu derrota.»'
      },
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«Aro de luz al 1000%, queridos viewers. Derian nos mandó el último frasco de aceite bendito. ¡Por Jairo, y por mi rating!»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo el Pomerania',
        text: '«🐶 ¡GUAU GUAU! (Traducción: dale duro a esa loca, que quiero volver a mis galletas, a mi masaje de Derian y a mi cama.)»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Jair derrotada! La jaula se abrió y Jairo está en mis brazos. Misión cumplida, sin una sola prenda arruinada. Bueno, casi ninguna.»'
      },
      {
        speaker: 'da',
        name: 'Da',
        text: '«Misión cumplida, J. Ahora a casa, que alguien tiene que limpiar el aceite del piso. Y no, Derian, tú no limpias, tú resbalas.»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo el Pomerania',
        text: '«🐶💖 ¡Guau guau! (Gracias, J, Da, Gael y Derian. Lo mejor fue el masaje de despedida.)»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra',
        text: '«Por fin rescataron a Jairo. Regresen a Virocentro, pero Derian deja el aceite afuera, Javier no se queda a dormir y Gael apaga la cámara. ¡En esta casa se respeta!»'
      }
    ]
  }
];
