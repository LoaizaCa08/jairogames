// ============================================================================
// JAIRO RESCUEE — BASE DE DATOS DE PERSONAJES, HISTORIA Y 10 NIVELES ARCADE
// ============================================================================

const RESCUE_CHARACTERS = {
  j: {
    id: 'j',
    name: 'J',
    role: 'Héroe Rescatista (Jugador)',
    color: '#f59e0b',
    badge: '🏃‍♂️ Protagonista',
    bio: 'Cuando secuestran a su Pomerania Jairo en Virocentro, J deja todo tirado y sale a recorrer Virocentro, el Cine, las lomas de San Jorge y Virocasa. Cuenta con doble salto, disparo de impacto y la ayuda de sus amigos más exóticos.',
    traits: ['Dueño de Jairo', 'Mejor Amigo de Cine de Javier', 'Aliado de Gael y Derian']
  },
  jairo: {
    id: 'jairo',
    name: 'Jairo',
    role: 'El Pomerania Secuestrado',
    color: '#fbbf24',
    badge: '🐶 Objetivo del Rescate',
    bio: 'El Pomerania más esponjoso y consentido de Virocentro. Fue secuestrado por Jair y Javier, aunque antes del secuestro estaba recibiendo sus famosos masajes en aceite con Derian.',
    traits: ['200% Esponjoso', 'Fan del Aceite de Derian', 'Alarma Ultrasónica']
  },
  jair: {
    id: 'jair',
    name: 'Jair',
    role: 'Jefe Malvado Principal (Secuestrador)',
    color: '#ef4444',
    badge: '😈 Jefe Final',
    bio: 'El cerebro malvado detrás del secuestro de Jairo. Armó una red de drones y secuaces desde Virocentro pasando por San Jorge hasta atrincherarse en el último piso de Virocasa con la jaula dorada.',
    traits: ['Jefe Malvado', 'Secuestrador de Jairo', 'Fortaleza en Virocasa']
  },
  javier: {
    id: 'javier',
    name: 'Javier',
    role: 'Secuestrador y "Amigo de Cine" de J',
    color: '#3b82f6',
    badge: '🍿 Jefe del Cine',
    bio: 'El mejor amigo de J con el que siempre va al cine. Sandra asegura que "esos 2 parecen novios" porque no se pierden ni un estreno juntos. Por puros celos de que J no fue al cine con él, se unió a Jair para secuestrar a Jairo.',
    traits: ['Va al Cine con J', 'Sandra Dice que Son Novios', 'Cañón de Crispetas']
  },
  gael: {
    id: 'gael',
    name: 'Gael',
    role: 'Webcamer Estrella y Aliado de J',
    color: '#ec4899',
    badge: '🎥 Aliado en San Jorge',
    bio: 'Amigo webcamer gay de J que transmite desde su estudio VIP en San Jorge. A mitad de la aventura se alía con J, encendiendo su Aro de Luz LED de 10.000 lúmenes y disparando ráfagas de Tokens para barrer a los secuaces de Jair.',
    traits: ['Webcamer Gay Amigo de J', 'Aro de Luz Destructor', 'Lluvia de Tokens en San Jorge']
  },
  derian: {
    id: 'derian',
    name: 'Derian',
    role: 'Maestro de los Masajes en Aceite',
    color: '#eab308',
    badge: '🧴 Especialista en Aceite',
    bio: 'Le da masajes relajantes a Jairo bañándolo en aceite aromático. Cada vez que se encierran con los tarros de aceite, Sandra toca la puerta escandalizada pensando que están haciendo otra cosa muy distinta.',
    traits: ['Masajes a Jairo en Aceite', 'Sandra Piensa Mal', 'Piso Resbaloso Turbo']
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    role: 'Mamá de J (Comandante desde Virocentro)',
    color: '#f43f5e',
    badge: '🚨 Alerta Materna',
    bio: 'La mamá de J en Virocentro. Da la voz de alerta cuando secuestran a Jairo, monitorea toda la misión por celular y no deja de repetir que J y Javier parecen novios en el cine y que los masajes en aceite de Derian están muy raros.',
    traits: ['Jefa de Virocentro', 'Sospecha de Javier y J', 'Escandalizada con el Aceite']
  }
};

const RESCUE_UPGRADES = [
  {
    id: 'gael_ring',
    name: '🎥 Aro LED de Gael +1',
    desc: 'Aumenta el daño y velocidad de los disparos de luz y tokens.',
    cost: 5,
    icon: '💡'
  },
  {
    id: 'derian_oil',
    name: '🧴 Aceite Turbo de Derian',
    desc: 'Aumenta la velocidad de movimiento y el salto de J.',
    cost: 5,
    icon: '🧴'
  },
  {
    id: 'sandra_shield',
    name: '🛡️ Bendición de Doña Sandra',
    desc: 'Añade +1 corazón de vida máxima en todos los niveles.',
    cost: 8,
    icon: '❤️'
  }
];

// 10 NIVELES COMPLETOS DEL MODO ARCADE
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
        text: '«¡J! ¡Despierta ya mismo! ¡Entraron a la sala de Virocentro y se robaron a Jairo el Pomerania! Solo dejaron regadas unas crispetas de cine y un olor rarísimo.»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡¿Que se llevaron a Jairo?! ¡Con mi perrito nadie se mete! Voy a saltar por todos los techos de Virocentro hasta alcanzar esa camioneta.»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Mamá de J)',
        text: '«¡Más te vale que sea a rescatar al perro y no a verte a escondidas en el cine con Javier, que ustedes dos ya parecen novios!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Salí de la casa y encontré el collar de Jairo junto a una boleta de cine VIP! El rastro sigue por las calles de Virocentro.»'
      }
    ]
  },
  {
    level: 2,
    title: 'Calles Nocturnas de Virocentro',
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
        text: '«Los secuaces de Jair bloquearon las cuadras de Virocentro. ¡Tengo que saltar sobre los taxis y derrotar a los guardias para llegar al cine!»'
      },
      {
        speaker: 'jair',
        name: 'Jair (Por Altavoz)',
        text: '«¡Jajaja! ¡Nunca recuperarás a Jairo, J! Mi socio te está esperando en la sala de cine con una sorpresa llena de mantequilla.»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'sandra',
        name: 'Sandra (Por WhatsApp)',
        text: '«📱 Audio de Sandra: Mijo, me dijeron que te vieron entrando corriendo al cine... ¿sí ves que con Javier parecen novios?»'
      }
    ]
  },
  {
    level: 3,
    title: 'Cita Explosiva en el Cine',
    location: 'Multicine VIP — Sala 4',
    theme: 'cinema',
    ally: null,
    boss: {
      id: 'javier',
      name: 'JAVIER (El "Novio" del Cine)',
      hp: 18,
      color: '#3b82f6',
      quote: '«¡Me dejaste plantado en el estreno, J! ¡Sandra tiene razón, parecemos novios peleados y por eso secuestré a Jairo con Jair!»'
    },
    slippery: false,
    length: 2400,
    targetBones: 6,
    introDialogue: [
      {
        speaker: 'javier',
        name: 'Javier (Mejor Amigo de Cine)',
        text: '«¡Hola, J! Compré dos combos para nosotros dos en la última fila como siempre... pero como no llegaste, ¡me alié con Jair y me llevé a Jairo!»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Llamada en Altavoz)',
        text: '«¡Ajá! ¡Se los dije! ¡Pelea de novios en pleno cine! ¡J, rescata a Jairo ya mismo y deja el drama con Javier!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Cuál novios ni qué nada, Javier! ¡Suéltame el dato de dónde escondieron a Jairo o te desbarato ese cañón de crispetas!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'javier',
        name: 'Javier (Derrotado)',
        text: '«¡Está bien, está bien, perdón! Jair se llevó a Jairo para las lomas de San Jorge... ¡pero el viernes sí vamos a cine, ¿cierto?!»'
      }
    ]
  },
  {
    level: 4,
    title: 'Subiendo a San Jorge',
    location: 'Barrio San Jorge — Las Lomas',
    theme: 'sanjorge',
    ally: null,
    boss: null,
    slippery: false,
    length: 2700,
    targetBones: 7,
    introDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Llegué a San Jorge! Por estas cuestas empinadas llevaron a Jairo. Hay drones de Jair vigilando cada esquina.»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo (A lo lejos)',
        text: '«🐶 ¡Guau, guau! (¡J, apúrate que en San Jorge me tienen encerrado cerca del estudio de tu amigo Gael!)»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Veo una luz rosada brillante saliendo de una ventana en San Jorge! ¡Ese tiene que ser el cuarto de transmisión de Gael!»'
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
    length: 2800,
    targetBones: 7,
    introDialogue: [
      {
        speaker: 'gael',
        name: 'Gael (Amigo Webcamer)',
        text: '«¡Bebéee! ¡Estaba en pleno show privado por webcam en San Jorge cuando vi a Jair pasar con Jairo! ¡Apago la cámara y me uno a ti ahora mismo!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Gael, qué salvada! Los guardias de Jair tienen blindaje pesado.»'
      },
      {
        speaker: 'gael',
        name: 'Gael (Aliado Activado)',
        text: '«¡Tranquilo papi, que con mi Aro de Luz LED y mi Lluvia de Tokens VIP los vamos a dejar ciegos! ¡Presiona [K] o el botón de Poder para mi Flash Webcam!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«¡Arrasamos en San Jorge, amor! Y mira el piso de la siguiente cuadra... ¡está lleno de aceite brillante! ¡Ahí está Derian!»'
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
      name: 'MEGA-DRON DE JAIR (Secuestrador de Spa)',
      hp: 22,
      color: '#eab308',
      quote: '«¡Gracias al aceite de Derian, el Pomerania resbaló directo a nuestra jaula!»'
    },
    slippery: true,
    length: 2800,
    targetBones: 8,
    introDialogue: [
      {
        speaker: 'derian',
        name: 'Derian (Maestro del Aceite)',
        text: '«¡J! ¡Yo solo le estaba dando a Jairo su masaje relajante bañado en aceite tibio aquí en San Jorge cuando entraron los hombres de Jair!»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra (Entrando en Pánico)',
        text: '«¡¿Masajes al perro en aceite?! ¡Derian, por Dios, todo ese cuarto embadurnado de aceite y ustedes encerrados... uno piensa que hacen otra cosa!»'
      },
      {
        speaker: 'derian',
        name: 'Derian',
        text: '«¡Doña Sandra, le juro que es puro masaje canino! ¡Toma J, embadúrnate los zapatos con mi Aceite Especial: el piso resbala pero correrás al doble de velocidad!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'derian',
        name: 'Derian',
        text: '«¡Destruimos el Mega-Dron! Le puse extra aceite a tus ataques. ¡Jair y Javier huyeron con Jairo hacia Virocasa!»'
      }
    ]
  },
  {
    level: 7,
    title: 'Fuga a Toda Velocidad',
    location: 'Ruta San Jorge → Virocasa',
    theme: 'highway',
    ally: 'gael',
    boss: null,
    slippery: true,
    length: 3100,
    targetBones: 8,
    introDialogue: [
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«¡Agárrate fuerte, J! Entre mis luces LED y el aceite resbaloso de Derian vamos volando detrás del furgón de Jair rumbo a Virocasa.»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Van directo a Virocasa! ¡No voy a dejar que se encierren allá con mi Pomerania!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Llegamos a las puertas de Virocasa! Se viene la recta final del rescate.»'
      }
    ]
  },
  {
    level: 8,
    title: 'Asedio a Virocasa (Exterior)',
    location: 'Virocasa — Entrada y Patio Blindado',
    theme: 'virocasa_ext',
    ally: 'gael',
    boss: null,
    slippery: false,
    length: 3200,
    targetBones: 9,
    introDialogue: [
      {
        speaker: 'jair',
        name: 'Jair',
        text: '«¡Bienvenido a tu propia Virocasa, J! Llené el patio y los techos de trampas láser. ¡Jairo ahora es mi mascota oficial!»'
      },
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«¡Eso no se lo cree ni él! ¡Mis seguidores del stream ya pagaron 5.000 tokens para ver cómo tumbamos la puerta de Virocasa!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Tumbamos el portón de Virocasa! Ya escucho los ladridos de Jairo en el último piso.»'
      }
    ]
  },
  {
    level: 9,
    title: 'Virocasa en Llamas: La Revancha',
    location: 'Virocasa — Sala Principal y Escaleras',
    theme: 'virocasa_int',
    ally: 'gael',
    boss: {
      id: 'javier_v2',
      name: 'JAVIER RECARGADO (Doble Combo de Cine)',
      hp: 28,
      color: '#60a5fa',
      quote: '«¡En la sala de Virocasa no pasarás, J! ¡Si no vas a cine conmigo, nadie sale con el Pomerania!»'
    },
    slippery: true,
    length: 3200,
    targetBones: 9,
    introDialogue: [
      {
        speaker: 'javier',
        name: 'Javier',
        text: '«¡Sorpresa en la sala de Virocasa! Jair me dio un meca-traje de Cine Colombia y Derian dejó todo el piso lleno de aceite.»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra',
        text: '«¡Virgen del Carmen! ¡Javier metido en Virocasa peleando con J sobre un charco de aceite de Derian! ¡Qué van a decir los vecinos!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'javier',
        name: 'Javier',
        text: '«¡Ay, me resbalé con el aceite de Derian! Está bien J, sube al cuarto principal de Virocasa... ¡Jair tiene la jaula de Jairo allá arriba!»'
      }
    ]
  },
  {
    level: 10,
    title: 'Gran Final en Virocasa: ¡Rescata a Jairo!',
    location: 'Virocasa — Cuarto Maestro (Batalla Final)',
    theme: 'virocasa_boss',
    ally: 'gael',
    boss: {
      id: 'jair_final',
      name: 'JAIR (Jefe Supremo del Secuestro)',
      hp: 40,
      color: '#ef4444',
      quote: '«¡Esta es la batalla final en Virocasa! ¡Con mi armadura suprema ni tú, ni el webcamer Gael, ni los aceites de Derian podrán salvar a Jairo!»'
    },
    slippery: false,
    length: 3400,
    targetBones: 10,
    introDialogue: [
      {
        speaker: 'jair',
        name: 'Jair (Jefe Final)',
        text: '«¡Llegaste al nivel 10 en lo más alto de Virocasa, J! Aquí tengo a Jairo en su jaula dorada. ¡Prepárate para el combate definitivo!»'
      },
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«¡Aro de luz al 1000%! ¡Derian ya nos mandó el último frasco de aceite bendito! ¡Por Jairo!»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo el Pomerania',
        text: '«🐶 ¡GUAU GUAU GUAU! (¡Dale duro a Jair que quiero volver a Virocentro por mis galletas!)»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'j',
        name: 'J',
        text: '«¡JAIR HA SIDO DERROTADO! ¡La jaula se abrió y Jairo está libre en mis brazos!»'
      },
      {
        speaker: 'jairo',
        name: 'Jairo el Pomerania',
        text: '«🐶💖 ¡Guau guau! (¡Gracias J, Gael y Derian! ¡Soy libre!)»'
      },
      {
        speaker: 'sandra',
        name: 'Sandra',
        text: '«¡Por fin rescataron a Jairo en Virocasa! Ahora regresen todos a Virocentro... ¡pero Derian deja ese tarro de aceite afuera y Javier que no se quede a dormir!»'
      }
    ]
  }
];

// GENERADOR DE RETRATOS SVG PARA DIÁLOGOS Y EXPEDIENTES
function getRescueCharSVG(charId) {
  switch (charId) {
    case 'j':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 235 C35 162 165 162 165 235 Z" fill="#111827" stroke="#f59e0b" stroke-width="3"/>
        <rect x="65" y="72" width="70" height="12" rx="5" fill="#ef4444"/>
        <circle cx="100" cy="105" r="42" fill="#f1c29b" stroke="#f59e0b" stroke-width="2.5"/>
        <path d="M56 90 C56 48 144 48 144 90 C138 74 62 74 56 90 Z" fill="#271c19"/>
        <circle cx="84" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="118" cy="102" r="4.5" fill="#1c1917"/>
        <path d="M80 120 Q100 113 120 120 Q123 139 100 145 Q77 139 80 120 Z" fill="none" stroke="#291d18" stroke-width="5.5"/>
        <path d="M85 123 Q100 135 115 123 Z" fill="#ffffff"/>
      </svg>`;

    case 'jairo':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="150" r="58" fill="#f59e0b" stroke="#fde68a" stroke-width="4"/>
        <circle cx="65" cy="125" r="35" fill="#fbbf24"/>
        <circle cx="135" cy="125" r="35" fill="#fbbf24"/>
        <circle cx="100" cy="115" r="46" fill="#fbbf24" stroke="#fef3c7" stroke-width="3"/>
        <polygon points="62,84 74,48 92,76" fill="#d97706" stroke="#fde68a" stroke-width="2"/>
        <polygon points="138,84 126,48 108,76" fill="#d97706" stroke="#fde68a" stroke-width="2"/>
        <ellipse cx="100" cy="162" rx="34" ry="26" fill="#fffbeb"/>
        <circle cx="84" cy="108" r="6" fill="#1e293b"/>
        <circle cx="116" cy="108" r="6" fill="#1e293b"/>
        <circle cx="86" cy="106" r="2" fill="#fff"/>
        <circle cx="118" cy="106" r="2" fill="#fff"/>
        <ellipse cx="100" cy="118" rx="7" ry="5" fill="#1e293b"/>
        <path d="M94 127 Q100 142 106 127 Z" fill="#fb7185"/>
      </svg>`;

    case 'jair':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 235 C28 156 172 156 172 235 Z" fill="#1f2937" stroke="#ef4444" stroke-width="3.5"/>
        <polygon points="60,165 100,210 140,165" fill="#991b1b"/>
        <circle cx="100" cy="104" r="42" fill="#e5b899" stroke="#ef4444" stroke-width="2.5"/>
        <path d="M56 90 C54 45 146 45 144 90 Z" fill="#111827"/>
        <path d="M70 88 L94 98 M130 88 L106 98" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="83" cy="103" r="5" fill="#dc2626"/>
        <circle cx="117" cy="103" r="5" fill="#dc2626"/>
        <path d="M78 126 Q100 115 122 126" fill="none" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
      </svg>`;

    case 'javier':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 235 C32 160 168 160 168 235 Z" fill="#1e3a8a" stroke="#60a5fa" stroke-width="3"/>
        <circle cx="100" cy="104" r="41" fill="#f3c6a0" stroke="#60a5fa" stroke-width="2.5"/>
        <path d="M58 88 C58 46 142 46 142 88 Z" fill="#1e293b"/>
        <!-- Gafas 3D de Cine -->
        <rect x="64" y="92" width="32" height="18" rx="4" fill="#ef4444" opacity="0.85" stroke="#fff" stroke-width="2"/>
        <rect x="104" y="92" width="32" height="18" rx="4" fill="#3b82f6" opacity="0.85" stroke="#fff" stroke-width="2"/>
        <line x1="96" y1="101" x2="104" y2="101" stroke="#fff" stroke-width="2.5"/>
        <path d="M84 124 Q100 136 116 124 Z" fill="#fff"/>
        <!-- Caja de crispetas -->
        <rect x="135" y="168" width="36" height="46" rx="4" fill="#dc2626" stroke="#fde047" stroke-width="2"/>
        <circle cx="145" cy="164" r="8" fill="#fef08a"/>
        <circle cx="155" cy="162" r="9" fill="#fde047"/>
        <circle cx="164" cy="165" r="7" fill="#fef08a"/>
      </svg>`;

    case 'gael':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Aro de luz LED detrás -->
        <circle cx="100" cy="105" r="64" fill="none" stroke="#ec4899" stroke-width="7" opacity="0.85"/>
        <circle cx="100" cy="105" r="58" fill="none" stroke="#f9a8d4" stroke-width="3"/>
        <path d="M36 235 C36 164 164 164 164 235 Z" fill="#831843" stroke="#f472b6" stroke-width="3"/>
        <circle cx="100" cy="104" r="40" fill="#f7d3b5" stroke="#f472b6" stroke-width="2.5"/>
        <path d="M58 88 C60 44 140 44 142 88 C126 68 74 68 58 88 Z" fill="#db2777"/>
        <ellipse cx="76" cy="112" rx="8" ry="4.5" fill="#fb7185" opacity="0.6"/>
        <ellipse cx="124" cy="112" rx="8" ry="4.5" fill="#fb7185" opacity="0.6"/>
        <circle cx="83" cy="101" r="4.5" fill="#1c1917"/>
        <circle cx="117" cy="101" r="4.5" fill="#1c1917"/>
        <path d="M86 122 Q100 134 114 122 Z" fill="#f43f5e"/>
      </svg>`;

    case 'derian':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Gotas de aceite dorado -->
        <circle cx="45" cy="95" r="10" fill="#facc15" opacity="0.8"/>
        <circle cx="158" cy="110" r="12" fill="#eab308" opacity="0.8"/>
        <path d="M34 235 C34 162 166 162 166 235 Z" fill="#713f12" stroke="#facc15" stroke-width="3"/>
        <circle cx="100" cy="104" r="41" fill="#e5b899" stroke="#facc15" stroke-width="2.5"/>
        <path d="M58 88 C58 46 142 46 142 88 Z" fill="#292524"/>
        <circle cx="83" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="117" cy="102" r="4.5" fill="#1c1917"/>
        <path d="M84 122 Q100 133 116 122" fill="none" stroke="#fef08a" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Frasco de aceite -->
        <rect x="138" y="162" width="28" height="44" rx="8" fill="#eab308" stroke="#fef08a" stroke-width="2"/>
      </svg>`;

    case 'sandra':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 235 C36 166 164 166 164 235 Z" fill="#e11d48" stroke="#fecdd3" stroke-width="3"/>
        <circle cx="100" cy="108" r="42" fill="#fbd38d" stroke="#f43f5e" stroke-width="3"/>
        <path d="M56 100 C54 55 146 55 144 100 Z" fill="#451a03"/>
        <path d="M74 94 L92 99 M126 94 L108 99" stroke="#451a03" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="84" cy="106" r="4.5" fill="#0f172a"/>
        <circle cx="116" cy="106" r="4.5" fill="#0f172a"/>
        <path d="M88 129 Q100 122 112 129" fill="none" stroke="#881337" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`;

    default:
      return '';
  }
}
