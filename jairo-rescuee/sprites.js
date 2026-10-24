// ============================================================================
// ILUSTRACIONES VECTORIALES HD DE PERSONAJES Y SPRITES (UI + MOTOR CANVAS)
// ============================================================================
// Da es "gemelo" de J: misma cara, mismo cabello y misma barba. Solo cambia la ropa (azul en vez de cuero negro y rojo).
function getDaSVG() {
  return getRescueCharSVG('j')
    .replace('points="86,168 110,222 134,168" fill="#dc2626"', 'points="86,168 110,222 134,168" fill="#f8fafc"')
    .replace(/jSkin/g, 'daSkin')
    .replace(/jJacket/g, 'daJacket')
    .replace(/jGold/g, 'daCyan')
    .replace(/#1e293b/g, '#2563eb')
    .replace(/#0f172a/g, '#1e3a8a')
    .replace(/#090d16/g, '#172554')
    .replace(/#fde047/g, '#bae6fd')
    .replace(/#d97706/g, '#0284c7')
    .replace(/#fbbf24/g, '#7dd3fc')
    .replace(/#334155/g, '#1d4ed8')
    .replace(/#f59e0b/g, '#3b82f6')
    .replace(/#dc2626/g, '#0ea5e9')
    .replace(/#ef4444/g, '#38bdf8')
    .replace(/#991b1b/g, '#075985');
}

function getRescueCharSVG(charId) {
  if (charId === 'da') return getDaSVG();
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
          <linearGradient id="jairCorset" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4c1d95"/>
            <stop offset="55%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#090514"/>
          </linearGradient>
          <linearGradient id="jairHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1c0b2e"/>
            <stop offset="100%" stop-color="#7e22ce"/>
          </linearGradient>
          <linearGradient id="jairLip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fb2c5f"/>
            <stop offset="100%" stop-color="#9f1239"/>
          </linearGradient>
        </defs>
        <circle cx="110" cy="130" r="88" fill="#c026d3" opacity="0.2"/>
        <!-- Capa de reina villana -->
        <path d="M22 252 L44 138 L110 158 L176 138 L198 252 Z" fill="#581c87" stroke="#e879f9" stroke-width="2.5"/>
        <!-- Melena larga detrás -->
        <path d="M54 92 C34 140 40 200 60 236 C70 210 66 170 72 130 Z" fill="url(#jairHair)"/>
        <path d="M166 92 C186 140 180 200 160 236 C150 210 154 170 148 130 Z" fill="url(#jairHair)"/>
        <!-- Corset de cuero con escote y hombreras de pinchos -->
        <path d="M44 252 C46 176 82 168 110 178 C138 168 174 176 176 252 Z" fill="url(#jairCorset)" stroke="#f0abfc" stroke-width="3"/>
        <path d="M86 176 Q110 206 134 176" fill="#e9b394" stroke="#be185d" stroke-width="2"/>
        <path d="M92 184 Q110 198 128 184" fill="none" stroke="#fda4af" stroke-width="2" opacity="0.7"/>
        <polygon points="38,176 66,160 74,190 44,200" fill="#7e22ce" stroke="#f0abfc" stroke-width="2"/>
        <polygon points="182,176 154,160 146,190 176,200" fill="#7e22ce" stroke="#f0abfc" stroke-width="2"/>
        <polygon points="36,168 44,150 52,166" fill="#f0abfc"/>
        <polygon points="184,168 176,150 168,166" fill="#f0abfc"/>
        <!-- Cinturón de cadenas -->
        <path d="M60 224 Q110 236 160 224" fill="none" stroke="#fde047" stroke-width="3" stroke-dasharray="6 3"/>
        <!-- Cuello fino y gargantilla -->
        <rect x="98" y="140" width="24" height="34" rx="9" fill="#e9b394"/>
        <path d="M95 160 Q110 170 125 160" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <circle cx="110" cy="168" r="4" fill="#fde047"/>
        <!-- Rostro delicado -->
        <path d="M68 86 C68 52 152 52 152 86 C152 124 136 148 110 152 C84 148 68 124 68 86 Z" fill="#f1c7a8" stroke="#be185d" stroke-width="2"/>
        <!-- Flequillo largo de reina -->
        <path d="M60 94 C52 40 94 22 112 24 C138 22 170 42 160 94 C150 66 132 52 118 58 C108 70 86 64 74 80 C68 84 64 88 60 94 Z" fill="url(#jairHair)"/>
        <!-- Cejas altas arqueadas y delineado de gato -->
        <path d="M76 90 Q88 80 100 88" fill="none" stroke="#1c0b2e" stroke-width="3.6" stroke-linecap="round"/>
        <path d="M144 90 Q132 80 120 88" fill="none" stroke="#1c0b2e" stroke-width="3.6" stroke-linecap="round"/>
        <path d="M76 106 Q88 98 102 104 L108 98" fill="none" stroke="#090514" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M144 106 Q132 98 118 104 L112 98" fill="none" stroke="#090514" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Ojos rojos con pestañas largas -->
        <ellipse cx="90" cy="108" rx="8" ry="6" fill="#ffffff"/>
        <ellipse cx="130" cy="108" rx="8" ry="6" fill="#ffffff"/>
        <circle cx="90" cy="108" r="4.6" fill="#dc2626"/>
        <circle cx="130" cy="108" r="4.6" fill="#dc2626"/>
        <circle cx="88.5" cy="106.5" r="1.7" fill="#ffffff"/>
        <circle cx="128.5" cy="106.5" r="1.7" fill="#ffffff"/>
        <path d="M80 102 L74 96 M86 100 L83 92 M94 100 L96 92" stroke="#090514" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M140 102 L146 96 M134 100 L137 92 M126 100 L124 92" stroke="#090514" stroke-width="2.3" stroke-linecap="round"/>
        <!-- Sombra de ojos violeta y rubor -->
        <ellipse cx="90" cy="98" rx="11" ry="4" fill="#c026d3" opacity="0.4"/>
        <ellipse cx="130" cy="98" rx="11" ry="4" fill="#c026d3" opacity="0.4"/>
        <ellipse cx="78" cy="124" rx="10" ry="5" fill="#fb7185" opacity="0.5"/>
        <ellipse cx="142" cy="124" rx="10" ry="5" fill="#fb7185" opacity="0.5"/>
        <!-- Nariz pequeña y lunar -->
        <path d="M110 112 L107 123 L113 124" fill="none" stroke="#c68b59" stroke-width="2" stroke-linecap="round"/>
        <circle cx="128" cy="134" r="1.8" fill="#4a044e"/>
        <!-- Labios rojos carnosos con sonrisa pícara -->
        <path d="M94 132 Q102 126 110 130 Q118 126 126 132 Q118 148 110 148 Q102 148 94 132 Z" fill="url(#jairLip)" stroke="#7f1d1d" stroke-width="1.5"/>
        <path d="M100 133 Q110 138 120 133" fill="none" stroke="#fecdd3" stroke-width="1.6" opacity="0.8"/>
        <!-- Corona de villana -->
        <polygon points="86,34 94,14 102,30 110,8 118,30 126,14 134,34" fill="#fde047" stroke="#b45309" stroke-width="2"/>
        <circle cx="110" cy="14" r="3.4" fill="#ef4444"/>
      </svg>`;

    case 'javier':
      return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="javCrop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f472b6"/>
            <stop offset="100%" stop-color="#6d28d9"/>
          </linearGradient>
          <linearGradient id="javHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b1d0f"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <circle cx="110" cy="130" r="88" fill="#60a5fa" opacity="0.18"/>
        <!-- Melena larga ondulada -->
        <path d="M58 90 C30 134 36 196 58 238 C74 214 66 176 74 134 Z" fill="url(#javHair)"/>
        <path d="M162 90 C190 134 184 196 162 238 C146 214 154 176 146 134 Z" fill="url(#javHair)"/>
        <!-- Bomber corta (crop) con ombligo al aire y falda -->
        <path d="M42 214 C44 170 80 164 110 172 C140 164 176 170 178 214 Z" fill="url(#javCrop)" stroke="#fbcfe8" stroke-width="3"/>
        <path d="M82 170 Q110 196 138 170" fill="#f3d0b6" stroke="#f9a8d4" stroke-width="2"/>
        <rect x="50" y="206" width="120" height="8" rx="4" fill="#fde047"/>
        <path d="M60 214 L56 252 L164 252 L160 214 Z" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2.5"/>
        <path d="M78 214 L74 252 M110 214 L110 252 M142 214 L146 252" stroke="#60a5fa" stroke-width="2" opacity="0.7"/>
        <ellipse cx="110" cy="222" rx="5" ry="3" fill="#e0a883"/>
        <rect x="98" y="140" width="24" height="34" rx="9" fill="#f3d0b6"/>
        <!-- Rostro suave -->
        <path d="M68 88 C68 52 152 52 152 88 C152 126 136 150 110 153 C84 150 68 126 68 88 Z" fill="#f8d8bd" stroke="#f472b6" stroke-width="2"/>
        <!-- Pelo con raya al medio y mechones -->
        <path d="M60 96 C50 38 92 22 110 26 C130 22 172 40 160 96 C152 70 130 58 112 52 C94 58 70 72 60 96 Z" fill="url(#javHair)"/>
        <path d="M96 30 Q108 52 100 72 M124 30 Q112 52 120 72" fill="none" stroke="#fbbf24" stroke-width="2.5" opacity="0.55"/>
        <!-- Moñito rosa -->
        <path d="M138 40 L158 30 L156 52 Z M138 40 L124 28 L124 50 Z" fill="#ec4899" stroke="#fbcfe8" stroke-width="1.5"/>
        <circle cx="138" cy="40" r="4.5" fill="#f9a8d4"/>
        <!-- Gafas 3D de cine, estilo glam -->
        <rect x="66" y="94" width="40" height="24" rx="10" fill="#ffffff" stroke="#be185d" stroke-width="2.6"/>
        <rect x="114" y="94" width="40" height="24" rx="10" fill="#ffffff" stroke="#be185d" stroke-width="2.6"/>
        <rect x="104" y="100" width="12" height="6" fill="#be185d"/>
        <rect x="70" y="97" width="32" height="18" rx="8" fill="#ef4444" opacity="0.88"/>
        <rect x="118" y="97" width="32" height="18" rx="8" fill="#06b6d4" opacity="0.88"/>
        <line x1="74" y1="112" x2="84" y2="100" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
        <line x1="122" y1="112" x2="132" y2="100" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
        <!-- Pestañas sobre las gafas y cejas finas -->
        <path d="M70 94 L64 86 M80 92 L77 83 M92 92 L93 84" stroke="#1c0b0b" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M150 94 L156 86 M140 92 L143 83 M128 92 L127 84" stroke="#1c0b0b" stroke-width="2.3" stroke-linecap="round"/>
        <ellipse cx="78" cy="128" rx="9" ry="4.6" fill="#fb7185" opacity="0.6"/>
        <ellipse cx="142" cy="128" rx="9" ry="4.6" fill="#fb7185" opacity="0.6"/>
        <!-- Gloss rosado y guiño coqueto -->
        <path d="M95 133 Q103 128 110 132 Q117 128 125 133 Q117 148 110 148 Q103 148 95 133 Z" fill="#f43f5e" stroke="#fda4af" stroke-width="1.5"/>
        <path d="M102 136 Q110 140 118 136" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.85"/>
        <!-- Balde de crispetas abrazado -->
        <g transform="translate(138, 170) scale(0.9)">
          <circle cx="14" cy="4" r="10" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/>
          <circle cx="28" cy="0" r="12" fill="#fde047" stroke="#eab308" stroke-width="1.5"/>
          <circle cx="44" cy="4" r="10" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/>
          <polygon points="4,8 52,8 46,62 10,62" fill="#dc2626" stroke="#fde047" stroke-width="2.5"/>
          <rect x="16" y="10" width="8" height="50" fill="#ffffff"/>
          <rect x="32" y="10" width="8" height="50" fill="#ffffff"/>
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
