// ============================================================================
// JAIRO RESCUEE — BASE DE DATOS DE PERSONAJES HD, HISTORIA Y 10 NIVELES ARCADE
// ============================================================================

const RESCUE_CHARACTERS = {
  j: {
    id: 'j',
    name: 'J',
    role: 'Héroe Rescatista (Jugador)',
    color: '#f59e0b',
    badge: '🏃‍♂️ Protagonista',
    bio: 'Cuando secuestran a su Pomerania Jairo en Virocentro, J se pone su chaqueta táctica y sale a recorrer Virocentro, el Cine, las lomas de San Jorge y Virocasa. Cuenta con doble salto acrobático, disparo de energía y la ayuda de sus amigos.',
    traits: ['Dueño de Jairo', 'Mejor Amigo de Cine de Javier', 'Aliado de Gael y Derian']
  },
  jairo: {
    id: 'jairo',
    name: 'Jairo',
    role: 'El Pomerania Secuestrado',
    color: '#fbbf24',
    badge: '🐶 Objetivo del Rescate',
    bio: 'El Pomerania más esponjoso, fino y consentido de Virocentro. Fue secuestrado por Jair y Javier, aunque justo antes del secuestro estaba recibiendo sus famosos masajes relajantes en aceite con Derian.',
    traits: ['200% Esponjoso', 'Fan del Aceite de Derian', 'Alarma Ultrasónica']
  },
  jair: {
    id: 'jair',
    name: 'Jair',
    role: 'Jefe Malvado Principal (Secuestrador)',
    color: '#ef4444',
    badge: '😈 Jefe Final',
    bio: 'El cerebro malvado detrás del secuestro de Jairo. Armó un ejército de secuaces y drones desde Virocentro pasando por San Jorge hasta atrincherarse en el último piso de Virocasa con la jaula dorada.',
    traits: ['Jefe Malvado', 'Secuestrador de Jairo', 'Fortaleza en Virocasa']
  },
  javier: {
    id: 'javier',
    name: 'Javier',
    role: 'Secuestrador y "Amigo de Cine" de J',
    color: '#3b82f6',
    badge: '🍿 Jefe del Cine',
    bio: 'El mejor amigo de J con el que siempre va al cine. Sandra asegura que "esos 2 parecen novios" porque no se pierden ni un estreno juntos. Por puros celos de que J no fue al cine con él, se unió a Jair para secuestrar a Jairo.',
    traits: ['Va al Cine con J', 'Sandra Dice que Son Novios', 'Cañón de Crispetas VIP']
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
    bio: 'Le da masajes relajantes a Jairo bañándolo en aceite aromático tibio. Cada vez que se encierran con los tarros de aceite, Sandra toca la puerta escandalizada pensando que están haciendo otra cosa muy distinta.',
    traits: ['Masajes a Jairo en Aceite', 'Sandra Piensa Mal', 'Piso Resbaloso Turbo']
  },
  sandra: {
    id: 'sandra',
    name: 'Sandra',
    role: 'Mamá de J (Comandante en Virocentro)',
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
    desc: 'Aumenta la potencia de los disparos de J y los rayos de Tokens de Gael.',
    cost: 5,
    icon: '💡'
  },
  {
    id: 'derian_oil',
    name: '🧴 Aceite Turbo de Derian',
    desc: 'Aumenta la velocidad de carrera y el impulso del doble salto de J.',
    cost: 5,
    icon: '🧴'
  },
  {
    id: 'sandra_shield',
    name: '🛡️ Bendición de Doña Sandra',
    desc: 'Añade +1 corazón de vida máxima permanente en todos los niveles.',
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
    length: 2650,
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
        text: '«¡Veo una luz neón fucsia saliendo de un balcón en San Jorge! ¡Ese tiene que ser el estudio webcam de Gael!»'
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
        text: '«¡Bebéee! ¡Estaba en pleno show privado por webcam aquí en San Jorge cuando vi a Jair pasar con Jairo! ¡Cierro el stream y me uno a ti ahora mismo!»'
      },
      {
        speaker: 'j',
        name: 'J',
        text: '«¡Gael, qué salvada! Los guardias de Jair tienen blindaje pesado.»'
      },
      {
        speaker: 'gael',
        name: 'Gael (Aliado Activado)',
        text: '«¡Tranquilo papi, que con mi Aro de Luz LED y mi Lluvia de Tokens VIP los vamos a dejar ciegos! ¡Presiona PODER para lanzar nuestro Flash Webcam!»'
      }
    ],
    outroDialogue: [
      {
        speaker: 'gael',
        name: 'Gael',
        text: '«¡Arrasamos en San Jorge, amor! Y mira el piso de la siguiente cuadra... ¡está lleno de aceite tibio! ¡Ahí está Derian!»'
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
      name: 'MEGA-DRON DE JAIR (Secuestrador del Spa)',
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
        text: '«¡Doña Sandra, le juro que es puro masaje canino! ¡Toma J, embadúrnate con mi Aceite Especial: el piso resbala pero tendrás velocidad turbo!»'
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
    length: 3000,
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
    length: 3100,
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
      hp: 26,
      color: '#60a5fa',
      quote: '«¡En la sala de Virocasa no pasarás, J! ¡Si no vas a cine conmigo, nadie sale con el Pomerania!»'
    },
    slippery: true,
    length: 3100,
    targetBones: 9,
    introDialogue: [
      {
        speaker: 'javier',
        name: 'Javier',
        text: '«¡Sorpresa en la sala de Virocasa! Jair me dio un traje blindado de Cine VIP y Derian dejó todo el piso lleno de aceite.»'
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
      hp: 38,
      color: '#ef4444',
      quote: '«¡Esta es la batalla final en Virocasa! ¡Con mi armadura suprema ni tú, ni el webcamer Gael, ni los aceites de Derian podrán salvar a Jairo!»'
    },
    slippery: false,
    length: 3300,
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

// ============================================================================
// ILUSTRACIONES VECTORIALES HD DE PERSONAJES Y SPRITES (UI + MOTOR CANVAS)
// ============================================================================
function getRescueCharSVG(charId) {
  switch (charId) {
    case 'j':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f6cfa8"/>
            <stop offset="100%" stop-color="#e0a97b"/>
          </linearGradient>
          <linearGradient id="jJacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="50%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
          <linearGradient id="jGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fde047"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>
        <!-- Aura Heroica -->
        <circle cx="110" cy="130" r="88" fill="#f59e0b" opacity="0.14"/>
        <!-- Capa/Bufanda Roja de Rescate ondeando -->
        <path d="M55 152 Q20 175 14 218 Q45 215 68 188 Z" fill="#dc2626"/>
        <!-- Torso Chaqueta Táctica de Cuero -->
        <path d="M36 250 C36 168 184 168 184 250 Z" fill="url(#jJacket)" stroke="url(#jGold)" stroke-width="3.5"/>
        <!-- Cuello alto y solapas -->
        <polygon points="68,158 95,212 80,224 52,175" fill="#334155" stroke="#fbbf24" stroke-width="1.5"/>
        <polygon points="152,158 125,212 140,224 168,175" fill="#334155" stroke="#fbbf24" stroke-width="1.5"/>
        <!-- Camiseta interior y placa dorada -->
        <polygon points="86,168 110,222 134,168" fill="#dc2626"/>
        <circle cx="110" cy="192" r="8" fill="url(#jGold)"/>
        <!-- Cuello -->
        <rect x="94" y="138" width="32" height="32" rx="10" fill="#d99f72"/>
        <!-- Orejas -->
        <ellipse cx="62" cy="108" rx="9" ry="15" fill="url(#jSkin)" stroke="#c68b59" stroke-width="2"/>
        <ellipse cx="158" cy="108" rx="9" ry="15" fill="url(#jSkin)" stroke="#c68b59" stroke-width="2"/>
        <!-- Rostro definido -->
        <path d="M64 86 C64 52 156 52 156 86 C156 126 138 152 110 154 C82 152 64 126 64 86 Z" fill="url(#jSkin)" stroke="#b47b4d" stroke-width="2"/>
        <!-- Banda Roja de Rescate en la frente -->
        <path d="M63 82 Q110 92 157 82 L159 95 Q110 105 61 95 Z" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
        <path d="M154 88 Q185 82 196 104 Q175 108 156 96 Z" fill="#dc2626"/>
        <!-- Cabello estilizado con volumen y brillo -->
        <path d="M58 84 C52 38 92 24 116 28 C144 24 170 46 162 84 C150 66 132 62 110 64 C86 62 70 68 58 84 Z" fill="#1c1613"/>
        <path d="M68 62 L78 85 L92 66 L108 86 L122 65 L136 84 L148 64" fill="#1c1613"/>
        <path d="M78 44 Q108 34 138 46" fill="none" stroke="#443833" stroke-width="4" stroke-linecap="round"/>
        <!-- Cejas decididas -->
        <path d="M76 96 L99 101" stroke="#1c1613" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M144 96 L121 101" stroke="#1c1613" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Ojos con brillo anime/arcade -->
        <ellipse cx="89" cy="109" rx="7" ry="6.5" fill="#ffffff"/>
        <ellipse cx="131" cy="109" rx="7" ry="6.5" fill="#ffffff"/>
        <circle cx="90" cy="109" r="5" fill="#291d16"/>
        <circle cx="130" cy="109" r="5" fill="#291d16"/>
        <circle cx="88" cy="107" r="2" fill="#ffffff"/>
        <circle cx="128" cy="107" r="2" fill="#ffffff"/>
        <!-- Nariz sombreada -->
        <path d="M110 106 L106 121 L113 123" fill="none" stroke="#b47b4d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Barba / Candado moderno bien perfilado -->
        <path d="M66 116 C68 140 88 154 110 155 C132 154 152 140 154 116 C148 134 132 144 110 145 C88 144 72 134 66 116 Z" fill="#1f1714" opacity="0.9"/>
        <path d="M88 130 Q110 123 132 130 Q134 146 110 151 Q86 146 88 130 Z" fill="none" stroke="#1f1714" stroke-width="5"/>
        <!-- Sonrisa confiada -->
        <path d="M95 133 Q110 143 125 132 Z" fill="#ffffff"/>
      </svg>`;

    case 'jairo':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pomFur" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#fde68a"/>
            <stop offset="55%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
          <radialGradient id="pomCream" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#fef3c7"/>
          </radialGradient>
        </defs>
        <!-- Aura Dorada -->
        <circle cx="110" cy="138" r="86" fill="#fbbf24" opacity="0.18"/>
        <!-- Capa Roja Real de Jairo -->
        <path d="M44 170 Q20 218 18 246 L202 246 Q200 218 176 170 Z" fill="#dc2626" stroke="#fde047" stroke-width="3"/>
        <!-- Cuerpo esponjoso multicapa -->
        <circle cx="110" cy="176" r="58" fill="url(#pomFur)" stroke="#b45309" stroke-width="2.5"/>
        <circle cx="64" cy="136" r="38" fill="url(#pomFur)"/>
        <circle cx="156" cy="136" r="38" fill="url(#pomFur)"/>
        <circle cx="74" cy="96" r="32" fill="url(#pomFur)"/>
        <circle cx="146" cy="96" r="32" fill="url(#pomFur)"/>
        <!-- Orejitas peludas de Pomerania -->
        <polygon points="56,82 68,34 98,68" fill="#d97706" stroke="#fef3c7" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="64,76 70,46 89,68" fill="#fda4af"/>
        <polygon points="164,82 152,34 122,68" fill="#d97706" stroke="#fef3c7" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="156,76 150,46 131,68" fill="#fda4af"/>
        <!-- Cabeza central esponjosa -->
        <circle cx="110" cy="118" r="52" fill="url(#pomFur)" stroke="#fef3c7" stroke-width="2.5"/>
        <!-- Pecho blanco esponjoso en forma de nube -->
        <path d="M68 168 Q60 198 86 210 Q110 222 134 210 Q160 198 152 168 Q132 152 110 156 Q88 152 68 168 Z" fill="url(#pomCream)"/>
        <!-- Collar VIP con Medalla Dorada -->
        <path d="M72 158 Q110 174 148 158" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
        <circle cx="110" cy="172" r="11" fill="#fde047" stroke="#b45309" stroke-width="2.5"/>
        <text x="110" y="176" text-anchor="middle" font-size="10" font-weight="900" fill="#78350f">J</text>
        <!-- Mejillas sonrojadas -->
        <ellipse cx="78" cy="124" rx="10" ry="6" fill="#fb7185" opacity="0.55"/>
        <ellipse cx="142" cy="124" rx="10" ry="6" fill="#fb7185" opacity="0.55"/>
        <!-- Ojos grandes y brillantes kawaii -->
        <circle cx="88" cy="110" r="9.5" fill="#1e1b4b"/>
        <circle cx="132" cy="110" r="9.5" fill="#1e1b4b"/>
        <circle cx="85" cy="106" r="3.5" fill="#ffffff"/>
        <circle cx="129" cy="106" r="3.5" fill="#ffffff"/>
        <circle cx="91" cy="113" r="1.8" fill="#ffffff"/>
        <circle cx="135" cy="113" r="1.8" fill="#ffffff"/>
        <!-- Hocico crema y nariz -->
        <ellipse cx="110" cy="124" rx="16" ry="12" fill="#fffbeb"/>
        <ellipse cx="110" cy="119" rx="7.5" ry="5.5" fill="#1e293b"/>
        <ellipse cx="108" cy="117.5" rx="2.5" ry="1.5" fill="#94a3b8"/>
        <!-- Boquita feliz y lengüita rosada -->
        <path d="M101 128 Q106 144 110 144 Q114 144 119 128 Z" fill="#f43f5e" stroke="#9f1239" stroke-width="1.5"/>
        <path d="M98 126 Q104 132 110 126 Q116 132 122 126" fill="none" stroke="#1e293b" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Patitas delanteras -->
        <ellipse cx="82" cy="226" rx="16" ry="12" fill="url(#pomCream)" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="138" cy="226" rx="16" ry="12" fill="url(#pomCream)" stroke="#d97706" stroke-width="2"/>
      </svg>`;

    case 'jair':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jairArmor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#374151"/>
            <stop offset="50%" stop-color="#111827"/>
            <stop offset="100%" stop-color="#030712"/>
          </linearGradient>
          <linearGradient id="jairCrimson" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ef4444"/>
            <stop offset="100%" stop-color="#7f1d1d"/>
          </linearGradient>
        </defs>
        <!-- Aura oscura carmesí -->
        <circle cx="110" cy="130" r="88" fill="#ef4444" opacity="0.18"/>
        <!-- Capa de Villano con cuello alto -->
        <path d="M24 250 L44 136 L110 156 L176 136 L196 250 Z" fill="#450a0a" stroke="#dc2626" stroke-width="2.5"/>
        <!-- Armadura cibernética y hombreras -->
        <path d="M30 250 C30 164 190 164 190 250 Z" fill="url(#jairArmor)" stroke="#ef4444" stroke-width="3.5"/>
        <polygon points="22,176 68,154 76,192 34,205" fill="url(#jairCrimson)" stroke="#fca5a5" stroke-width="2"/>
        <polygon points="198,176 152,154 144,192 186,205" fill="url(#jairCrimson)" stroke="#fca5a5" stroke-width="2"/>
        <!-- Núcleo de energía en el pecho -->
        <polygon points="90,180 110,168 130,180 110,222" fill="#ef4444" stroke="#fecaca" stroke-width="2"/>
        <!-- Cuello -->
        <rect x="94" y="138" width="32" height="28" fill="#c09070"/>
        <!-- Rostro afilado de villano -->
        <path d="M64 84 C64 48 156 48 156 84 C156 125 138 152 110 155 C82 152 64 125 64 84 Z" fill="#e2b494" stroke="#991b1b" stroke-width="2"/>
        <!-- Cicatriz en el ojo izquierdo -->
        <line x1="128" y1="82" x2="136" y2="124" stroke="#991b1b" stroke-width="3" stroke-linecap="round"/>
        <!-- Cabello negro en picos hacia atrás -->
        <path d="M58 88 C52 34 90 18 110 22 C130 18 168 34 162 88 C148 64 126 58 110 64 C94 58 72 64 58 88 Z" fill="#090d16"/>
        <polygon points="95,22 110,4 125,24" fill="#ef4444"/>
        <!-- Cejas furiosas -->
        <path d="M72 90 L102 103" stroke="#090d16" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M148 90 L118 103" stroke="#090d16" stroke-width="5.5" stroke-linecap="round"/>
        <!-- Ojos rojos brillantes -->
        <polygon points="76,104 98,107 94,114 78,112" fill="#ef4444"/>
        <polygon points="144,104 122,107 126,114 142,112" fill="#ef4444"/>
        <circle cx="88" cy="109" r="2.2" fill="#ffffff"/>
        <circle cx="132" cy="109" r="2.2" fill="#ffffff"/>
        <!-- Barba candado afilada -->
        <path d="M88 134 L110 155 L132 134 L124 148 L110 152 L96 148 Z" fill="#090d16"/>
        <!-- Sonrisa malvada -->
        <path d="M86 128 Q110 138 134 126 Q124 142 110 142 Q96 142 86 128 Z" fill="#ffffff" stroke="#111827" stroke-width="2"/>
      </svg>`;

    case 'javier':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="javJacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <!-- Aura Azul Cine VIP -->
        <circle cx="110" cy="130" r="88" fill="#3b82f6" opacity="0.16"/>
        <!-- Chaqueta Bomber Varsity de Cine -->
        <path d="M34 250 C34 166 186 166 186 250 Z" fill="url(#javJacket)" stroke="#60a5fa" stroke-width="3.5"/>
        <!-- Franjas blancas/amarillas de chaqueta bomber -->
        <path d="M78 164 L110 218 L142 164" fill="#eff6ff" stroke="#fde047" stroke-width="3"/>
        <rect x="94" y="138" width="32" height="30" fill="#e0ab82"/>
        <!-- Rostro simpático/celoso -->
        <path d="M65 86 C65 50 155 50 155 86 C155 126 138 150 110 152 C82 150 65 126 65 86 Z" fill="#f3c6a0" stroke="#c68b59" stroke-width="2"/>
        <!-- Cabello moderno ondulado -->
        <path d="M60 86 C56 38 92 26 118 28 C146 30 164 50 158 86 C144 64 82 62 60 86 Z" fill="#1e293b"/>
        <!-- GAFAS 3D DE CINE (Rojo y Cian con marco blanco brillante) -->
        <rect x="64" y="92" width="42" height="24" rx="5" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <rect x="114" y="92" width="42" height="24" rx="5" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <rect x="104" y="98" width="12" height="7" fill="#ffffff"/>
        <rect x="68" y="95" width="34" height="18" rx="3" fill="#ef4444" opacity="0.88"/>
        <rect x="118" y="95" width="34" height="18" rx="3" fill="#06b6d4" opacity="0.88"/>
        <!-- Brillo en los lentes 3D -->
        <line x1="72" y1="110" x2="84" y2="97" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
        <line x1="122" y1="110" x2="134" y2="97" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
        <!-- Sonrisa de "vamos a cine, J" -->
        <path d="M88 126 Q110 142 132 126 Z" fill="#ffffff" stroke="#7c2d12" stroke-width="2"/>
        <!-- Balde Gigante de Crispetas VIP -->
        <g transform="translate(132, 162)">
          <circle cx="14" cy="4" r="10" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/>
          <circle cx="28" cy="0" r="12" fill="#fde047" stroke="#eab308" stroke-width="1.5"/>
          <circle cx="44" cy="4" r="10" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/>
          <polygon points="4,8 52,8 46,66 10,66" fill="#dc2626" stroke="#fde047" stroke-width="2.5"/>
          <rect x="16" y="10" width="8" height="54" fill="#ffffff"/>
          <rect x="32" y="10" width="8" height="54" fill="#ffffff"/>
        </g>
      </svg>`;

    case 'gael':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gaelNeon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f472b6"/>
            <stop offset="50%" stop-color="#ec4899"/>
            <stop offset="100%" stop-color="#a855f7"/>
          </linearGradient>
        </defs>
        <!-- ARO DE LUZ LED PROFESIONAL DETRÁS -->
        <circle cx="110" cy="112" r="82" fill="none" stroke="url(#gaelNeon)" stroke-width="11" opacity="0.9"/>
        <circle cx="110" cy="112" r="82" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.85"/>
        <!-- Destellos de Tokens y Diamantes -->
        <polygon points="32,60 36,48 40,60 52,64 40,68 36,80 32,68 20,64" fill="#fde047"/>
        <polygon points="184,56 188,46 192,56 202,60 192,64 188,74 184,64 174,60" fill="#38bdf8"/>
        <!-- Outfit Glam Streamer en San Jorge -->
        <path d="M38 250 C38 168 182 168 182 250 Z" fill="url(#gaelNeon)" stroke="#fbcfe8" stroke-width="3"/>
        <polygon points="82,166 110,226 138,166" fill="#1e1b4b"/>
        <!-- Collar brillante -->
        <path d="M90 174 Q110 190 130 174" fill="none" stroke="#fde047" stroke-width="3.5"/>
        <rect x="96" y="138" width="28" height="30" fill="#f5cba7"/>
        <!-- Rostro estilizado impecable -->
        <path d="M68 88 C68 52 152 52 152 88 C152 126 136 150 110 152 C84 150 68 126 68 88 Z" fill="#f7d5b6" stroke="#f472b6" stroke-width="2"/>
        <!-- Rubor glam -->
        <ellipse cx="80" cy="116" rx="10" ry="5" fill="#fb7185" opacity="0.65"/>
        <ellipse cx="140" cy="116" rx="10" ry="5" fill="#fb7185" opacity="0.65"/>
        <!-- Diadema de Auriculares Streamer Rosa/Cian -->
        <path d="M56 102 C54 34 166 34 164 102" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
        <rect x="46" y="90" width="16" height="32" rx="8" fill="#ec4899" stroke="#ffffff" stroke-width="2"/>
        <rect x="158" y="90" width="16" height="32" rx="8" fill="#ec4899" stroke="#ffffff" stroke-width="2"/>
        <!-- Cabello con mechas fucsia y platinadas -->
        <path d="M64 88 C62 40 100 28 124 34 C150 38 160 62 154 88 C138 62 96 58 64 88 Z" fill="#831843"/>
        <path d="M76 52 Q112 36 142 64" fill="none" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/>
        <!-- Cejas perfiladas y ojos expresivos con pestañas -->
        <path d="M76 92 Q88 86 98 92" fill="none" stroke="#4a044e" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M122 92 Q132 86 144 92" fill="none" stroke="#4a044e" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="88" cy="105" r="6" fill="#1e1b4b"/>
        <circle cx="132" cy="105" r="6" fill="#1e1b4b"/>
        <circle cx="86" cy="103" r="2.2" fill="#ffffff"/>
        <circle cx="130" cy="103" r="2.2" fill="#ffffff"/>
        <!-- Guiño / Sonrisa brillante -->
        <path d="M94 126 Q110 139 126 126 Z" fill="#e11d48" stroke="#fda4af" stroke-width="1.5"/>
      </svg>`;

    case 'derian':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="oilGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#a16207"/>
          </linearGradient>
        </defs>
        <!-- Aura Dorada de Aceite -->
        <circle cx="110" cy="130" r="88" fill="#eab308" opacity="0.18"/>
        <!-- Gotas de Aceite Dorado flotando -->
        <path d="M36 80 Q26 98 36 106 Q46 98 36 80 Z" fill="url(#oilGold)"/>
        <path d="M184 68 Q172 88 184 98 Q196 88 184 68 Z" fill="url(#oilGold)"/>
        <!-- Chaleco de Spa / Masajista Abierto con Brillo de Aceite -->
        <path d="M34 250 C34 166 186 166 186 250 Z" fill="#422006" stroke="url(#oilGold)" stroke-width="3.5"/>
        <!-- Pecho bronceado y brillante por el aceite -->
        <polygon points="82,162 110,235 138,162" fill="#d99b66"/>
        <ellipse cx="104" cy="192" rx="6" ry="14" fill="#fef08a" opacity="0.35"/>
        <rect x="94" y="138" width="32" height="30" fill="#d99b66"/>
        <!-- Rostro seductor / relajado -->
        <path d="M66 86 C66 50 154 50 154 86 C154 126 136 150 110 152 C84 150 66 126 66 86 Z" fill="#e5ab78" stroke="#a16207" stroke-width="2"/>
        <!-- Cabello ondulado con brillo -->
        <path d="M60 88 C56 38 94 26 116 28 C148 30 162 52 158 88 C144 64 80 64 60 88 Z" fill="#1c1917"/>
        <path d="M74 94 Q88 89 98 94" fill="none" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M122 92 Q134 85 145 92" fill="none" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="88" cy="105" r="5.5" fill="#1c1917"/>
        <circle cx="132" cy="105" r="5.5" fill="#1c1917"/>
        <circle cx="86" cy="103" r="2" fill="#ffffff"/>
        <circle cx="130" cy="103" r="2" fill="#ffffff"/>
        <path d="M90 126 Q110 138 130 126" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <!-- Frasco de Aceite de Masajes VIP -->
        <g transform="translate(142, 165)">
          <rect x="14" y="0" width="14" height="10" rx="3" fill="#fde047"/>
          <rect x="4" y="10" width="34" height="52" rx="10" fill="url(#oilGold)" stroke="#ffffff" stroke-width="2"/>
          <text x="21" y="40" text-anchor="middle" font-size="9" font-weight="900" fill="#422006">OIL</text>
        </g>
      </svg>`;

    case 'sandra':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sandraDress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="100%" stop-color="#9f1239"/>
          </linearGradient>
        </defs>
        <circle cx="110" cy="130" r="88" fill="#f43f5e" opacity="0.16"/>
        <!-- Cabello elegante con volumen de mamá -->
        <circle cx="62" cy="106" r="32" fill="#451a03"/>
        <circle cx="158" cy="106" r="32" fill="#451a03"/>
        <circle cx="110" cy="64" r="44" fill="#451a03"/>
        <!-- Blusa elegante roja y collar de perlas -->
        <path d="M36 250 C36 168 184 168 184 250 Z" fill="url(#sandraDress)" stroke="#fecdd3" stroke-width="3"/>
        <circle cx="88" cy="172" r="5" fill="#ffffff"/>
        <circle cx="102" cy="177" r="5" fill="#ffffff"/>
        <circle cx="118" cy="177" r="5" fill="#ffffff"/>
        <circle cx="132" cy="172" r="5" fill="#ffffff"/>
        <rect x="96" y="138" width="28" height="28" fill="#f3c6a0"/>
        <!-- Aretes de oro -->
        <circle cx="62" cy="120" r="6" fill="#fbbf24"/>
        <circle cx="158" cy="120" r="6" fill="#fbbf24"/>
        <!-- Rostro -->
        <path d="M68 88 C68 54 152 54 152 88 C152 126 136 150 110 152 C84 150 68 126 68 88 Z" fill="#f7d3b0" stroke="#e11d48" stroke-width="2"/>
        <path d="M64 86 C64 46 156 46 156 86 C138 66 82 66 64 86 Z" fill="#5c2406"/>
        <!-- Cejas arqueadas de sospecha materna -->
        <path d="M74 92 L98 99" stroke="#3b1502" stroke-width="4" stroke-linecap="round"/>
        <path d="M146 92 L122 99" stroke="#3b1502" stroke-width="4" stroke-linecap="round"/>
        <circle cx="88" cy="106" r="5.5" fill="#1c1917"/>
        <circle cx="132" cy="106" r="5.5" fill="#1c1917"/>
        <circle cx="86" cy="104" r="2" fill="#ffffff"/>
        <circle cx="130" cy="104" r="2" fill="#ffffff"/>
        <path d="M92 129 Q110 121 128 129" fill="none" stroke="#be123c" stroke-width="4" stroke-linecap="round"/>
      </svg>`;

    case 'thug':
      return `<svg viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 175 C22 112 118 112 118 175 Z" fill="#1f2937" stroke="#ef4444" stroke-width="3"/>
        <circle cx="70" cy="68" r="32" fill="#d6a27c" stroke="#111827" stroke-width="2.5"/>
        <path d="M36 58 C36 24 104 24 104 58 Z" fill="#111827"/>
        <rect x="44" y="58" width="52" height="14" rx="4" fill="#090d16" stroke="#ef4444" stroke-width="1.8"/>
        <path d="M56 86 Q70 78 84 86" fill="none" stroke="#111827" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`;

    case 'usher':
      return `<svg viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 175 C22 112 118 112 118 175 Z" fill="#991b1b" stroke="#fde047" stroke-width="3"/>
        <polygon points="55,118 70,132 85,118" fill="#fde047"/>
        <circle cx="70" cy="68" r="32" fill="#e5b899" stroke="#fde047" stroke-width="2"/>
        <rect x="42" y="30" width="56" height="20" rx="4" fill="#dc2626" stroke="#fde047" stroke-width="2"/>
        <rect x="44" y="60" width="24" height="14" rx="3" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
        <rect x="72" y="60" width="24" height="14" rx="3" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>
      </svg>`;

    case 'drone':
    case 'drone_jair':
      return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="75" rx="52" ry="28" fill="#1e293b" stroke="#f59e0b" stroke-width="3.5"/>
        <ellipse cx="32" cy="42" rx="26" ry="6" fill="#38bdf8" opacity="0.8"/>
        <ellipse cx="128" cy="42" rx="26" ry="6" fill="#38bdf8" opacity="0.8"/>
        <line x1="42" y1="42" x2="54" y2="62" stroke="#94a3b8" stroke-width="5"/>
        <line x1="118" y1="42" x2="106" y2="62" stroke="#94a3b8" stroke-width="5"/>
        <circle cx="80" cy="75" r="16" fill="#ef4444" stroke="#fca5a5" stroke-width="3"/>
        <circle cx="75" cy="70" r="4" fill="#ffffff"/>
      </svg>`;

    default:
      return '';
  }
}
