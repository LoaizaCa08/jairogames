// ============================================================================
// CALL OF J — MOTOR DE NOVELA VISUAL, ARTE SVG DINÁMICO Y EASTER EGGS
// ============================================================================

const state = {
  currentNodeId: 's1_intro',
  currentScenario: '2150',
  isTyping: false,
  typingTimer: null,
  fullText: '',
  soundEnabled: true,
  history: [],
  flags: {},
  money: 60000,
  inventory: [],
  keyBuffer: '',
  jTitleClicks: 0,
  locClicks: 0,
  roceClicks: 0,
  homeSpankClicks: 0,
  stats: {
    parche: 25,
    diegui: 50,
    che: 70,
    alerta: 15
  },
  unlockedEndings: JSON.parse(localStorage.getItem('callofj_endings') || '[]').filter(id => ENDINGS[id]),
  unlockedSecrets: JSON.parse(localStorage.getItem('callofj_secrets') || '[]').filter(id => EASTER_EGGS[id])
};

// ---------------- SISTEMA DE AUDIO SINTETIZADO (WEB AUDIO API) ----------------
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'blip') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + Math.random() * 140, now);
      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
      osc.start(now);
      osc.stop(now + 0.032);
    } else if (type === 'choice') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'spicy') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.28);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === 'secret') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(783.99, now + 0.09);
      osc.frequency.setValueAtTime(1174.66, now + 0.18);
      gain.gain.setValueAtTime(0.095, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'ghost') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.55);
      gain.gain.setValueAtTime(0.085, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'bark') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'ending') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.12);
      osc.frequency.setValueAtTime(783.99, now + 0.24);
      osc.frequency.setValueAtTime(1046.5, now + 0.36);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc.start(now);
      osc.stop(now + 0.65);
    }
  } catch (e) {
    // Ignorar si el navegador bloquea el audio antes de interactuar
  }
}

// ---------------- PARTÍCULAS, TOASTS Y EASTER EGGS ----------------
function spawnSpicyParticles(emojis = ['🔥', '🌶️', '😏', '🖐️']) {
  const layer = document.getElementById('fx-layer');
  if (!layer) return;

  const bg = document.getElementById('scene-background');
  bg.classList.remove('spicy-flash');
  void bg.offsetWidth;
  bg.classList.add('spicy-flash');

  for (let i = 0; i < 9; i++) {
    const span = document.createElement('span');
    span.className = 'fx-emoji';
    span.textContent = emojis[i % emojis.length];
    span.style.left = `${25 + Math.random() * 55}%`;
    span.style.bottom = `${20 + Math.random() * 28}%`;
    span.style.animationDelay = `${i * 0.07}s`;
    layer.appendChild(span);
    setTimeout(() => span.remove(), 2400);
  }
}

function triggerScreenShake() {
  const screen = document.getElementById('game-screen');
  if (!screen) return;
  screen.classList.remove('screen-shake');
  void screen.offsetWidth;
  screen.classList.add('screen-shake');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container || !message) return;
  const item = document.createElement('div');
  item.className = 'toast-item';
  item.textContent = message;
  container.appendChild(item);
  setTimeout(() => item.remove(), 3600);
}

function unlockSecret(eggId, customMessage) {
  const egg = EASTER_EGGS[eggId];
  if (!egg) return;

  const isNew = !state.unlockedSecrets.includes(eggId);
  if (isNew) {
    state.unlockedSecrets.push(eggId);
    localStorage.setItem('callofj_secrets', JSON.stringify(state.unlockedSecrets));
    updateSecretsCounter();
  }

  playSound('secret');
  showToast(customMessage || `🥚 ¡EASTER EGG! ${egg.title}`);

  // Si estamos en el nodo de decisión de 2150 y ya tiene >= 3 secretos, refrescar opciones para mostrar el Final Secreto
  const currentNode = STORY_NODES[state.currentNodeId];
  if (currentNode && currentNode.choices && !state.isTyping) {
    renderChoices(currentNode.choices);
  }
}

function updateSecretsCounter() {
  const total = Object.keys(EASTER_EGGS).length;
  const countText = `${state.unlockedSecrets.length}/${total}`;
  const menuEl = document.getElementById('secrets-count-menu');
  const hudEl = document.getElementById('secrets-count-hud');
  if (menuEl) menuEl.textContent = countText;
  if (hudEl) hudEl.textContent = countText;
}

function showCharacterBubble(slotEl, text) {
  const existing = slotEl.querySelector('.secret-bubble');
  if (existing) existing.remove();

  const bubble = document.createElement('div');
  bubble.className = 'secret-bubble';
  bubble.textContent = text;
  slotEl.appendChild(bubble);
  setTimeout(() => bubble.remove(), 3200);
}

function activateReyDelRoce(slotEl = null) {
  state.stats.parche = 100;
  updateStatsUI();
  spawnSpicyParticles(['👑', '🍑', '🔥', '🌶️', '😏']);
  triggerScreenShake();

  unlockSecret(
    'egg_rey_del_roce',
    '👑🍑 ¡EASTER EGG! J se coronó como EL REY DEL ROCE (le encanta rozárselo a las trans)'
  );

  // Actualizar visualmente a J en escena con su corona y movimiento de roce continuo
  const centerSlot = document.getElementById('char-center');
  const leftSlot = document.getElementById('char-left');
  const jSlot = [centerSlot, leftSlot].find(el => el && el.textContent.includes('J'));
  const targetSlot = slotEl || jSlot || centerSlot;

  if (targetSlot) {
    targetSlot.classList.add('lean-right', 'roce-king-anim');
    const fig = targetSlot.querySelector('.char-figure');
    if (fig) fig.innerHTML = getCharacterSVG('j', 'spicy');
    const tag = targetSlot.querySelector('.char-nametag');
    if (tag) tag.innerHTML = '👑 J • Rey del Roce';
    showCharacterBubble(
      targetSlot,
      '👑 «¡Soy EL REY DEL ROCE! A mí lo que más me encanta es pegarme atrás a rozárselo bien rico a las trans»'
    );
  }

  // Actualizar también el diorama del Home si está visible
  const homeJ = document.getElementById('home-char-j');
  const homeQuote = document.getElementById('home-live-quote');
  const homeStatus = document.getElementById('home-j-status-label');
  if (homeJ) {
    homeJ.innerHTML = getCharacterSVG('j', 'spicy');
    homeJ.classList.add('roce-king-anim');
  }
  if (homeStatus) {
    homeStatus.innerHTML = '👑 Estado de J: <strong>EL REY DEL ROCE (Especialista en Trans • 1000%)</strong>';
  }
  if (homeQuote) {
    homeQuote.textContent = '👑 J (El Rey del Roce): «¡Qué baile suelto ni qué nada, a mí déjenme rozándoselo pegadito a Cataleya toda la noche!» 🍑🔥';
  }
}

function handleStageCharacterClick(charId, slotEl) {
  if (charId === 'diegui') {
    showCharacterBubble(slotEl, '👻 «La verdad no estoy muerto, solo me hice el fantasma pa’ no poner plata en El Cable»');
    unlockSecret('egg_diegui_ghost', '🥚 ¡Easter Egg! Diegui confesó por qué es fantasma');
  } else if (charId === 'jairo') {
    playSound('bark');
    showCharacterBubble(slotEl, '🐶 «Guau guau (Traducción: Doña Sandra, J tiene la mano metida donde no debe)»');
    unlockSecret('egg_jairo_bark', '🥚 ¡Easter Egg! Traductor Perruno de Jairo activado');
  } else if (charId === 'j' || charId === 'cataleya') {
    state.roceClicks++;
    state.stats.parche = clampStat(state.stats.parche + 15);
    updateStatsUI();

    if (state.roceClicks >= 3) {
      state.roceClicks = 0;
      activateReyDelRoce(slotEl);
      return;
    }

    spawnSpicyParticles(['🖐️', '🔥', '🌶️', '💋']);
    const centerSlot = document.getElementById('char-center');
    if (centerSlot) centerSlot.classList.add('lean-right');
    showCharacterBubble(
      slotEl,
      charId === 'j'
        ? `😏 «Un rocecito más (${state.roceClicks}/3 pa’ coronarme El Rey del Roce)...»`
        : `🔥 «Uy J, cómo te gusta venir a rozármelo (${state.roceClicks}/3)...»`
    );
    unlockSecret('egg_j_cataleya_touch', '🥚 ¡Easter Egg! Agarrón Extra Fuera de Guion');
  } else if (charId === 'che') {
    showCharacterBubble(slotEl, '🚕 «A mí no me toquen que yo ya pedí mi taxi sano pa’ mi casa»');
    playSound('blip');
  } else if (charId === 'da') {
    showCharacterBubble(slotEl, '👀 «Me vigilan a mí toda la noche y el que se lo roza a Cataleya es J...»');
    playSound('blip');
  } else if (charId === 'sai') {
    showCharacterBubble(slotEl, '🍾 «Yo le traje a Cataleya a J porque sabía que a ese man le encanta rozárselo a las trans»');
    playSound('blip');
  } else if (charId === 'sandra') {
    showCharacterBubble(slotEl, '🚨 «¡Donde yo prenda esa luz y vea a J mandando mano en mi mueble, se acaba el mundo!»');
    playSound('blip');
  }
}

// ---------------- ILUSTRACIONES SVG DE PERSONAJES CON EXPRESIONES ----------------
function getCharacterSVG(charId, mood = 'normal') {
  switch (charId) {
    case 'j': {
      const isSpicy = mood === 'spicy';
      const isAngry = mood === 'angry';
      const isSaint = mood === 'saint';
      const isRoceKing = state.unlockedSecrets && state.unlockedSecrets.includes('egg_rey_del_roce');
      const faceColor = isAngry ? '#fca5a5' : '#f1c29b';
      const borderStroke = isSpicy ? '#ec4899' : '#f59e0b';

      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        ${isRoceKing ? `
          <polygon points="66,54 74,20 90,40 100,14 110,40 126,20 134,54" fill="#fbbf24" stroke="#f59e0b" stroke-width="2.5"/>
          <circle cx="74" cy="20" r="3.5" fill="#ec4899"/>
          <circle cx="100" cy="14" r="4" fill="#ec4899"/>
          <circle cx="126" cy="20" r="3.5" fill="#ec4899"/>
        ` : isSaint ? `<ellipse cx="100" cy="24" rx="30" ry="7" fill="rgba(253,224,71,0.12)" stroke="#fde047" stroke-width="3" stroke-dasharray="6 4"/>` : ''}
        <path d="M35 235 C35 162 165 162 165 235 Z" fill="#111827" stroke="${borderStroke}" stroke-width="2.8"/>
        <polygon points="75,165 100,198 125,165" fill="#1f2937"/>
        <circle cx="100" cy="212" r="2.5" fill="#e5e7eb"/>
        <rect x="86" y="140" width="28" height="26" fill="#eab68c"/>
        <circle cx="100" cy="105" r="42" fill="${faceColor}" stroke="${borderStroke}" stroke-width="2"/>
        ${isSpicy ? `
          <ellipse cx="76" cy="112" rx="8" ry="4.5" fill="#ec4899" opacity="0.5"/>
          <ellipse cx="124" cy="112" rx="8" ry="4.5" fill="#ec4899" opacity="0.5"/>
        ` : ''}
        <path d="M56 95 C56 50 144 50 144 95 C138 78 62 78 56 95 Z" fill="#271c19"/>
        <path d="M64 78 L68 94 L76 82 L85 95 L96 82 L104 95 L114 82 L124 94 L134 78 Z" fill="#271c19"/>
        ${isAngry ? `
          <path d="M72 89 L92 97" stroke="#271c19" stroke-width="4" stroke-linecap="round"/>
          <path d="M128 89 L108 97" stroke="#271c19" stroke-width="4" stroke-linecap="round"/>
        ` : isSpicy ? `
          <path d="M72 94 Q82 91 91 95" fill="none" stroke="#271c19" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M108 89 Q118 82 129 89" fill="none" stroke="#271c19" stroke-width="3.5" stroke-linecap="round"/>
        ` : `
          <path d="M72 93 Q82 89 91 93" fill="none" stroke="#271c19" stroke-width="3" stroke-linecap="round"/>
          <path d="M109 93 Q118 89 128 93" fill="none" stroke="#271c19" stroke-width="3" stroke-linecap="round"/>
        `}
        <circle cx="${isSpicy ? 85 : 82}" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="${isSpicy ? 121 : 118}" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="${isSpicy ? 86.5 : 83.5}" cy="100.5" r="1.5" fill="#fff"/>
        <circle cx="${isSpicy ? 122.5 : 119.5}" cy="100.5" r="1.5" fill="#fff"/>
        <path d="M80 120 Q100 113 120 120 Q123 139 100 145 Q77 139 80 120 Z" fill="none" stroke="#291d18" stroke-width="5.5" stroke-linecap="round"/>
        ${isAngry ? `
          <path d="M87 131 Q100 121 113 131" fill="none" stroke="#7f1d1d" stroke-width="3.5" stroke-linecap="round"/>
        ` : isSpicy ? `
          <path d="M84 124 Q102 136 117 120 Z" fill="#ffffff"/>
          <path d="M102 129 Q110 137 115 127 Z" fill="#f43f5e"/>
        ` : `
          <path d="M85 123 Q100 135 115 123 Z" fill="#ffffff"/>
        `}
        ${isSpicy ? `
          <g transform="translate(142, 162) rotate(-12)">
            <circle cx="16" cy="18" r="12" fill="#f1c29b" stroke="#ec4899" stroke-width="2"/>
            <line x1="8" y1="10" x2="5" y2="0" stroke="#f1c29b" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="14" y1="8" x2="14" y2="-3" stroke="#f1c29b" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="20" y1="9" x2="22" y2="-1" stroke="#f1c29b" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="25" y1="13" x2="29" y2="5" stroke="#f1c29b" stroke-width="4" stroke-linecap="round"/>
          </g>
        ` : ''}
      </svg>`;
    }

    case 'sai':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 235 C30 160 170 160 170 235 Z" fill="#18181b" stroke="#ec4899" stroke-width="2.5"/>
        <path d="M74 170 Q100 198 126 170" fill="none" stroke="#fbbf24" stroke-width="3.5"/>
        <rect x="86" y="138" width="28" height="26" fill="#eab68c"/>
        <circle cx="100" cy="102" r="42" fill="#f3c6a0" stroke="#ec4899" stroke-width="2"/>
        <path d="M55 95 C52 44 148 44 145 95 C135 70 65 70 55 95 Z" fill="#171717"/>
        <path d="M72 90 Q82 86 91 90" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round"/>
        <path d="M109 90 Q118 86 128 90" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round"/>
        <circle cx="82" cy="100" r="4.5" fill="#171717"/>
        <circle cx="118" cy="100" r="4.5" fill="#171717"/>
        <circle cx="83.5" cy="98.5" r="1.5" fill="#fff"/>
        <circle cx="119.5" cy="98.5" r="1.5" fill="#fff"/>
        <path d="M82 117 Q100 133 118 117 Z" fill="#ffffff" stroke="#7c2d12" stroke-width="1.5"/>
      </svg>`;

    case 'da':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 235 C34 156 166 156 166 235 Z" fill="#0f172a" stroke="#3b82f6" stroke-width="2.5"/>
        <line x1="100" y1="162" x2="100" y2="235" stroke="#1e293b" stroke-width="3"/>
        <circle cx="100" cy="176" r="3" fill="#e2e8f0"/>
        <circle cx="100" cy="198" r="3" fill="#e2e8f0"/>
        <circle cx="100" cy="220" r="3" fill="#e2e8f0"/>
        <rect x="87" y="132" width="26" height="30" fill="#f1c29b"/>
        <circle cx="100" cy="96" r="41" fill="#f5cba7" stroke="#60a5fa" stroke-width="2"/>
        <path d="M58 88 C58 44 142 44 142 88 C128 66 72 66 58 88 Z" fill="#18181b"/>
        <path d="M73 86 Q82 82 91 86" fill="none" stroke="#18181b" stroke-width="3" stroke-linecap="round"/>
        <path d="M109 86 Q118 82 127 86" fill="none" stroke="#18181b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="82" cy="95" r="4.5" fill="#18181b"/>
        <circle cx="118" cy="95" r="4.5" fill="#18181b"/>
        <circle cx="83.5" cy="93.5" r="1.5" fill="#fff"/>
        <circle cx="119.5" cy="93.5" r="1.5" fill="#fff"/>
        <path d="M84 114 Q100 126 116 114 Z" fill="#ffffff" stroke="#7c2d12" stroke-width="1.5"/>
      </svg>`;

    case 'che':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 235 C32 162 168 162 168 235 Z" fill="#064e3b" stroke="#10b981" stroke-width="2.5"/>
        <rect x="87" y="138" width="26" height="26" fill="#eab68c"/>
        <circle cx="100" cy="102" r="41" fill="#f3c6a0" stroke="#10b981" stroke-width="2"/>
        <path d="M58 84 C58 46 142 46 142 84 L58 84 Z" fill="#271c19"/>
        <path d="M73 91 L91 93 M109 93 L127 91" stroke="#271c19" stroke-width="3" stroke-linecap="round"/>
        <circle cx="82" cy="101" r="4.5" fill="#1c1917"/>
        <circle cx="118" cy="101" r="4.5" fill="#1c1917"/>
        <circle cx="83.5" cy="99.5" r="1.5" fill="#fff"/>
        <circle cx="119.5" cy="99.5" r="1.5" fill="#fff"/>
        <path d="M84 118 Q100 114 116 118" fill="none" stroke="#3f2e26" stroke-width="3" stroke-linecap="round"/>
        <path d="M88 137 Q100 143 112 137" fill="none" stroke="#3f2e26" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M88 123 Q100 128 112 123" fill="none" stroke="#7c2d12" stroke-width="2.8" stroke-linecap="round"/>
      </svg>`;

    case 'diegui':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="125" r="88" fill="#38bdf8" opacity="0.2"/>
        <circle cx="100" cy="120" r="65" fill="#7dd3fc" opacity="0.18"/>
        <ellipse cx="100" cy="34" rx="34" ry="8" fill="none" stroke="#fde047" stroke-width="4"/>
        <path d="M42 225 C42 158 158 158 158 225 Q138 210 124 225 Q110 237 100 223 Q90 237 76 225 Q62 210 42 225 Z" fill="#0284c7" stroke="#bae6fd" stroke-width="2.5" opacity="0.88"/>
        <rect x="87" y="138" width="26" height="24" fill="#bae6fd"/>
        <circle cx="100" cy="102" r="40" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="2.5"/>
        <path d="M62 85 C62 48 138 48 138 85 C124 68 76 68 62 85 Z" fill="#0c4a6e"/>
        <circle cx="83" cy="100" r="5" fill="#0f172a"/>
        <circle cx="117" cy="100" r="5" fill="#0f172a"/>
        <circle cx="84.5" cy="98.5" r="1.8" fill="#fff"/>
        <circle cx="118.5" cy="98.5" r="1.8" fill="#fff"/>
        <path d="M86 117 Q100 113 114 117" fill="none" stroke="#0c4a6e" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M88 123 Q100 132 112 123" fill="none" stroke="#0c4a6e" stroke-width="2.8" stroke-linecap="round"/>
        <ellipse cx="100" cy="136" rx="6" ry="3" fill="#0c4a6e"/>
      </svg>`;

    case 'cataleya': {
      const isFlirty = mood === 'flirty';
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 82 C44 34 156 34 154 82 L164 218 L36 218 Z" fill="#c88a36" stroke="#e5b567" stroke-width="2"/>
        <path d="M52 78 C52 40 148 40 148 78 L156 214 L44 214 Z" fill="#dca048"/>
        <rect x="88" y="138" width="24" height="26" rx="6" fill="#f5cba7"/>
        <path d="M38 235 C40 164 160 164 162 235 Z" fill="#be185d" stroke="#f472b6" stroke-width="2.5"/>
        <path d="M74 162 Q100 188 126 162 Z" fill="#f5cba7"/>
        <circle cx="100" cy="104" r="38" fill="#f7d3b5" stroke="#e5b567" stroke-width="2"/>
        <path d="M56 96 C54 46 146 46 144 96 C134 72 115 66 106 66 C88 66 68 76 56 96 Z" fill="#e5b567"/>
        <path d="M56 88 C58 64 88 60 108 64 C84 72 68 88 66 176 L50 176 C48 130 52 105 56 88 Z" fill="#eab869"/>
        <path d="M108 64 C128 64 144 76 146 96 C150 122 152 148 150 176 L134 176 C134 102 124 76 108 64 Z" fill="#dca048"/>
        <ellipse cx="79" cy="113" rx="${isFlirty ? 9 : 7.5}" ry="4.5" fill="#fb7185" opacity="${isFlirty ? 0.65 : 0.45}"/>
        <ellipse cx="121" cy="113" rx="${isFlirty ? 9 : 7.5}" ry="4.5" fill="#fb7185" opacity="${isFlirty ? 0.65 : 0.45}"/>
        <path d="M74 93 Q83 89 91 93" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>
        <path d="M109 93 Q117 89 126 93" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>
        ${isFlirty ? `
          <path d="M77 102 Q83 97 89 102" fill="none" stroke="#1c1917" stroke-width="3.2" stroke-linecap="round"/>
        ` : `
          <circle cx="83" cy="102" r="4.5" fill="#1c1917"/>
          <circle cx="84.5" cy="100.5" r="1.5" fill="#fff"/>
        `}
        <circle cx="117" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="118.5" cy="100.5" r="1.5" fill="#fff"/>
        <path d="M90 123 Q100 120 110 123 Q100 132 90 123 Z" fill="#e11d48"/>
        <circle cx="62" cy="112" r="3.5" fill="#fbbf24"/>
        <circle cx="138" cy="112" r="3.5" fill="#fbbf24"/>
      </svg>`;
    }

    case 'antonia':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 84 C38 36 162 36 160 84 L170 212 L30 212 Z" fill="#4a2c18" stroke="#6b4226" stroke-width="2"/>
        <rect x="84" y="138" width="32" height="26" rx="8" fill="#c68b59"/>
        <path d="M24 235 C22 156 178 156 176 235 Z" fill="#7c3aed" stroke="#c4b5fd" stroke-width="2.5"/>
        <path d="M74 162 Q100 182 126 162 Z" fill="#c68b59"/>
        <ellipse cx="100" cy="106" rx="46" ry="42" fill="#c68b59" stroke="#a36b3b" stroke-width="2"/>
        <ellipse cx="72" cy="115" rx="9" ry="5" fill="#e11d48" opacity="0.28"/>
        <ellipse cx="128" cy="115" rx="9" ry="5" fill="#e11d48" opacity="0.28"/>
        <path d="M52 98 C50 44 150 44 148 98 C134 72 66 72 52 98 Z" fill="#4a2c18"/>
        <path d="M52 90 C54 66 86 60 104 64 C80 72 62 88 58 168 L42 168 C42 128 46 104 52 90 Z" fill="#5c3820"/>
        <path d="M104 64 C124 64 144 76 148 96 C154 122 156 146 154 168 L138 168 C138 102 124 76 104 64 Z" fill="#5c3820"/>
        <path d="M71 91 Q81 87 90 91" fill="none" stroke="#29170b" stroke-width="3" stroke-linecap="round"/>
        <path d="M110 91 Q119 87 129 91" fill="none" stroke="#29170b" stroke-width="3" stroke-linecap="round"/>
        <circle cx="81" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="119" cy="102" r="4.5" fill="#1c1917"/>
        <circle cx="82.5" cy="100.5" r="1.5" fill="#fff"/>
        <circle cx="120.5" cy="100.5" r="1.5" fill="#fff"/>
        <rect x="65" y="93" width="31" height="19" rx="6" fill="rgba(255,255,255,0.12)" stroke="#1e1b4b" stroke-width="2.6"/>
        <rect x="104" y="93" width="31" height="19" rx="6" fill="rgba(255,255,255,0.12)" stroke="#1e1b4b" stroke-width="2.6"/>
        <line x1="96" y1="101" x2="104" y2="101" stroke="#fbbf24" stroke-width="2.5"/>
        <line x1="55" y1="99" x2="65" y2="100" stroke="#1e1b4b" stroke-width="2.2"/>
        <line x1="135" y1="100" x2="145" y2="99" stroke="#1e1b4b" stroke-width="2.2"/>
        <path d="M88 125 Q100 134 112 125" fill="none" stroke="#9f1239" stroke-width="3.8" stroke-linecap="round"/>
      </svg>`;

    case 'sandra':
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <circle cx="46" cy="112" r="24" fill="#64748b" opacity="0.75"/>
        <circle cx="154" cy="112" r="24" fill="#64748b" opacity="0.75"/>
        <circle cx="100" cy="52" r="22" fill="#64748b" opacity="0.6"/>
        <path d="M36 235 C36 166 164 166 164 235 Z" fill="#e11d48" stroke="#fecdd3" stroke-width="3"/>
        <circle cx="100" cy="108" r="42" fill="#fbd38d" stroke="#f43f5e" stroke-width="3"/>
        <path d="M56 100 C54 55 146 55 144 100 Z" fill="#451a03"/>
        <path d="M74 94 L92 99 M126 94 L108 99" stroke="#451a03" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="84" cy="106" r="4.5" fill="#0f172a"/>
        <circle cx="116" cy="106" r="4.5" fill="#0f172a"/>
        <path d="M88 129 Q100 124 112 129" fill="none" stroke="#881337" stroke-width="3.5" stroke-linecap="round"/>
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

    default:
      return '';
  }
}

// ---------------- ARTE DE FONDOS DE LOS ESCENARIOS Y SUB-ESCENAS ----------------
function getScenarioArtSVG(scenarioId, subScene = null) {
  const mode = subScene || scenarioId;

  if (mode === 'cable') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Montañas nocturnas de Manizales -->
      <path d="M0 440 Q260 330 560 410 T1200 370 L1200 700 L0 700 Z" fill="#080612" opacity="0.92"/>
      <!-- Luces cálidas de la ciudad en la montaña -->
      <circle cx="130" cy="420" r="2.5" fill="#fde047" opacity="0.85"/>
      <circle cx="195" cy="435" r="2" fill="#f97316" opacity="0.8"/>
      <circle cx="275" cy="415" r="2.5" fill="#38bdf8" opacity="0.8"/>
      <circle cx="340" cy="438" r="2" fill="#fde047" opacity="0.75"/>
      <circle cx="850" cy="410" r="2.5" fill="#fde047" opacity="0.85"/>
      <circle cx="930" cy="425" r="2" fill="#f97316" opacity="0.75"/>
      <circle cx="1020" cy="402" r="2.5" fill="#38bdf8" opacity="0.8"/>
      <!-- Cables aéreos cruzando el cielo nocturno -->
      <path d="M0 190 Q600 250 1200 175" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.45"/>
      <!-- Cabina del Cable Aéreo -->
      <g transform="translate(290, 204)" opacity="0.8">
        <line x1="20" y1="0" x2="20" y2="18" stroke="#f59e0b" stroke-width="2.5"/>
        <rect x="4" y="18" width="32" height="24" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
      </g>
      <g transform="translate(880, 192)" opacity="0.8">
        <line x1="20" y1="0" x2="20" y2="18" stroke="#f59e0b" stroke-width="2.5"/>
        <rect x="4" y="18" width="32" height="24" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
      </g>
      <!-- Torre Emblemática de El Cable (ubicada al costado izquierdo para no chocar con los personajes) -->
      <g opacity="0.65" stroke="#f59e0b" stroke-width="2.5" fill="none">
        <polygon points="115,425 148,145 182,145 215,425"/>
        <line x1="125" y1="350" x2="205" y2="350"/>
        <line x1="133" y1="275" x2="197" y2="275"/>
        <line x1="141" y1="205" x2="189" y2="205"/>
        <line x1="125" y1="350" x2="197" y2="275"/>
        <line x1="205" y1="350" x2="133" y2="275"/>
        <line x1="133" y1="275" x2="189" y2="205"/>
        <line x1="197" y1="275" x2="141" y2="205"/>
        <rect x="136" y="125" width="58" height="20" rx="4" fill="#0f172a"/>
      </g>
      <!-- Letrero Superior de El Cable -->
      <rect x="430" y="34" width="340" height="54" rx="14" fill="rgba(15,23,42,0.88)" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="600" y="69" text-anchor="middle" fill="#fbbf24" font-size="26" font-family="sans-serif" font-weight="900" letter-spacing="6">EL CABLE</text>
    </svg>`;
  } else if (mode === 'violeta') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <polygon points="600,20 90,620 310,620" fill="#a855f7" opacity="0.22"/>
      <polygon points="600,20 890,620 1110,620" fill="#d946ef" opacity="0.22"/>
      <rect x="370" y="32" width="460" height="104" rx="20" fill="rgba(24,10,42,0.92)" stroke="#c084fc" stroke-width="3.5"/>
      <text x="600" y="94" text-anchor="middle" fill="#f5d0fe" font-size="48" font-family="sans-serif" font-weight="900" letter-spacing="10">VIOLETA</text>
      <text x="600" y="120" text-anchor="middle" fill="#facc15" font-size="14" font-family="sans-serif" font-weight="800" letter-spacing="5">GUARITOS Y DESCONTROL</text>
    </svg>`;
  } else if (mode === '2150_street') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="500" width="1200" height="200" fill="#090d16"/>
      <line x1="0" y1="500" x2="1200" y2="500" stroke="#475569" stroke-width="3"/>
      <rect x="90" y="42" width="220" height="68" rx="14" fill="rgba(12,6,26,0.9)" stroke="#ec4899" stroke-width="3"/>
      <text x="200" y="87" text-anchor="middle" fill="#ffffff" font-size="32" font-family="sans-serif" font-weight="900" letter-spacing="6">2150</text>
      <g transform="translate(810, 290)" opacity="0.88">
        <path d="M30 70 L65 25 L215 25 L255 70 L290 75 L290 115 L10 115 L10 70 Z" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
        <rect x="118" y="8" width="54" height="17" rx="5" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
        <text x="145" y="20" text-anchor="middle" fill="#090d16" font-size="11" font-family="sans-serif" font-weight="900">TAXI</text>
        <polygon points="75,33 135,33 135,66 50,66" fill="#0f172a"/>
        <polygon points="145,33 205,33 235,66 145,66" fill="#0f172a"/>
        <circle cx="75" cy="115" r="24" fill="#1e293b" stroke="#94a3b8" stroke-width="5"/>
        <circle cx="225" cy="115" r="24" fill="#1e293b" stroke="#94a3b8" stroke-width="5"/>
        <circle cx="14" cy="88" r="8" fill="#ef4444"/>
      </g>
    </svg>`;
  } else if (scenarioId === '2150' || mode === '2150') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 460 Q220 360 460 430 T920 390 T1200 440 L1200 700 L0 700 Z" fill="#090514" opacity="0.9"/>
      <polygon points="600,25 120,620 280,620" fill="#ec4899" opacity="0.18"/>
      <polygon points="600,25 920,620 1080,620" fill="#06b6d4" opacity="0.18"/>
      <polygon points="600,25 480,620 720,620" fill="#a855f7" opacity="0.14"/>
      <rect x="400" y="34" width="400" height="108" rx="20" fill="rgba(12,6,26,0.9)" stroke="#ec4899" stroke-width="3.5"/>
      <text x="600" y="98" text-anchor="middle" fill="#ffffff" font-size="54" font-family="sans-serif" font-weight="900" letter-spacing="10">2150</text>
      <text x="600" y="126" text-anchor="middle" fill="#38bdf8" font-size="15" font-family="sans-serif" font-weight="800" letter-spacing="8">CLUB</text>
    </svg>`;
  } else if (mode === 'virocasa_dark') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="1200" height="700" fill="#03050a" opacity="0.88"/>
      <rect x="450" y="36" width="300" height="58" rx="12" fill="rgba(15,23,42,0.9)" stroke="#f43f5e" stroke-width="2.5"/>
      <text x="600" y="68" text-anchor="middle" fill="#fda4af" font-size="20" font-family="sans-serif" font-weight="900" letter-spacing="3">APAGÓN EN VIROCASA</text>
      <text x="600" y="86" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="700">SIN LUZ Y A DOS MANOS</text>
      <polygon points="960,130 935,175 965,175 940,225 995,165 962,165" fill="#fde047"/>
    </svg>`;
  } else if (scenarioId === 'virocasa') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="75" width="230" height="170" rx="8" fill="#090d16" stroke="#475569" stroke-width="5"/>
      <line x1="205" y1="75" x2="205" y2="245" stroke="#475569" stroke-width="4"/>
      <line x1="90" y1="160" x2="320" y2="160" stroke="#475569" stroke-width="4"/>
      <circle cx="145" cy="120" r="16" fill="#fde047" opacity="0.65"/>
      <rect x="860" y="95" width="230" height="135" rx="8" fill="#090d16" stroke="#38bdf8" stroke-width="3"/>
      <rect x="460" y="36" width="280" height="58" rx="12" fill="rgba(15,23,42,0.88)" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="600" y="67" text-anchor="middle" fill="#f8fafc" font-size="22" font-family="sans-serif" font-weight="800" letter-spacing="3">VIROCASA</text>
      <text x="600" y="85" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="700">CASA DE J Y DA</text>
    </svg>`;
  } else if (scenarioId === 'virocentro') {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <line x1="600" y1="0" x2="600" y2="50" stroke="#d97706" stroke-width="4"/>
      <polygon points="555,50 645,50 670,90 530,90" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
      <rect x="90" y="90" width="200" height="170" rx="6" fill="#0f172a" stroke="#92400e" stroke-width="5"/>
      <line x1="190" y1="90" x2="190" y2="260" stroke="#92400e" stroke-width="4"/>
      <rect x="420" y="115" width="75" height="90" rx="4" fill="#451a03" stroke="#fbbf24" stroke-width="2.5"/>
      <rect x="515" y="125" width="75" height="80" rx="4" fill="#451a03" stroke="#fbbf24" stroke-width="2.5"/>
      <rect x="610" y="115" width="75" height="90" rx="4" fill="#451a03" stroke="#fbbf24" stroke-width="2.5"/>
      <polygon points="900,450 1160,150 1160,450" fill="#451a03" stroke="#92400e" stroke-width="4" opacity="0.7"/>
    </svg>`;
  }
  return '';
}

// ---------------- ACTUALIZACIÓN DE INTERFAZ Y HUD ----------------
function clampStat(val) {
  return Math.max(5, Math.min(100, val));
}

function updateStatsUI() {
  document.getElementById('bar-parche').style.width = `${state.stats.parche}%`;
  document.getElementById('bar-diegui').style.width = `${state.stats.diegui}%`;
  document.getElementById('bar-che').style.width = `${state.stats.che}%`;
  document.getElementById('bar-alerta').style.width = `${state.stats.alerta}%`;

  const vp = document.getElementById('val-parche');
  const vd = document.getElementById('val-diegui');
  const vc = document.getElementById('val-che');
  const va = document.getElementById('val-alerta');
  if (vp) vp.textContent = `${state.stats.parche}%`;
  if (vd) vd.textContent = `${state.stats.diegui}%`;
  if (vc) vc.textContent = `${state.stats.che}%`;
  if (va) va.textContent = `${state.stats.alerta}%`;
}

function applyEffects(effects) {
  if (!effects) return;
  if (effects.parche) state.stats.parche = clampStat(state.stats.parche + effects.parche);
  if (effects.diegui) state.stats.diegui = clampStat(state.stats.diegui + effects.diegui);
  if (effects.che) state.stats.che = clampStat(state.stats.che + effects.che);
  if (effects.alerta) state.stats.alerta = clampStat(state.stats.alerta + effects.alerta);
  updateStatsUI();
}

function setScenarioVisuals(scenarioId, subScene = null, locationLabel = null) {
  state.currentScenario = scenarioId;
  const bgEl = document.getElementById('scene-background');
  const artEl = document.getElementById('scene-art');
  const locNameEl = document.getElementById('location-name');

  bgEl.className = `bg-${scenarioId}`;
  artEl.innerHTML = getScenarioArtSVG(scenarioId, subScene);

  if (locationLabel) {
    locNameEl.textContent = locationLabel.toUpperCase();
  } else {
    const scObj = SCENARIOS.find(s => s.id === scenarioId);
    if (scObj) {
      locNameEl.textContent = `${scObj.title.toUpperCase()}`;
    }
  }
}

function showChapterBanner(bannerData) {
  const banner = document.getElementById('chapter-banner');
  document.getElementById('banner-subtitle').textContent = bannerData.subtitle;
  document.getElementById('banner-title').textContent = bannerData.title;
  document.getElementById('banner-desc').textContent = bannerData.desc;

  banner.classList.remove('hidden');
  banner.style.animation = 'none';
  banner.offsetHeight;
  banner.style.animation = null;

  setTimeout(() => {
    banner.classList.add('hidden');
  }, 2500);
}

// ---------------- RENDERIZADO DE PERSONAJES EN ESCENA ----------------
function renderStageSlots(slots = {}, activeSlot = null, moods = {}, leanJ = null) {
  const positions = ['left', 'center', 'right'];
  positions.forEach(pos => {
    const container = document.getElementById(`char-${pos}`);
    const charId = slots[pos];

    if (!charId || !CHARACTERS[charId]) {
      container.innerHTML = '';
      container.className = `char-slot slot-${pos}`;
      container.onclick = null;
      return;
    }

    const charData = CHARACTERS[charId];
    const isActive = activeSlot === pos;
    const ghostClass = charData.isGhost ? 'ghost-char' : '';
    const stateClass = isActive ? 'active' : 'inactive';
    const leanClass = (charId === 'j' && leanJ === 'right') ? 'lean-right' : '';
    const charMood = moods[charId] || 'normal';

    const isRoceKing = charId === 'j' && state.unlockedSecrets.includes('egg_rey_del_roce');
    const roceAnimClass = (isRoceKing && leanJ === 'right') ? 'roce-king-anim' : '';
    const displayTag = isRoceKing ? '👑 J • Rey del Roce' : charData.name;

    container.className = `char-slot slot-${pos} ${stateClass} ${ghostClass} ${leanClass} ${roceAnimClass}`;
    container.title = `Toca a ${charData.name} para reacción secreta`;
    container.innerHTML = `
      <div class="char-figure">${getCharacterSVG(charId, charMood)}</div>
      <div class="char-nametag" style="border-color: ${charData.color}; color: ${charData.color}">
        ${displayTag}
      </div>
    `;
    container.onclick = (e) => {
      e.stopPropagation();
      handleStageCharacterClick(charId, container);
    };
  });
}

// ---------------- MÁQUINA DE ESCRIBIR Y NODOS ----------------
function typeText(text) {
  clearInterval(state.typingTimer);
  state.isTyping = true;
  state.fullText = text;

  const textEl = document.getElementById('dialogue-text');
  textEl.textContent = '';

  let idx = 0;
  state.typingTimer = setInterval(() => {
    textEl.textContent += text.charAt(idx);
    if (idx % 3 === 0) playSound('blip');
    idx++;
    if (idx >= text.length) {
      finishTyping();
    }
  }, 19);
}

function finishTyping() {
  clearInterval(state.typingTimer);
  state.isTyping = false;
  document.getElementById('dialogue-text').textContent = state.fullText;

  const node = STORY_NODES[state.currentNodeId];
  if (node && node.choices) {
    renderChoices(node.choices);
  } else if (node && node.endingId) {
    renderEndingTrigger(node.endingId);
  }
}

function resolveAutoBranchByFlags() {
  if (state.flags.violeta_vip && state.flags.escala_virocasa) {
    return {
      next: 's2_f1_arrive_virocasa',
      desc: 'Como prendiste a Cataleya en el VIP de Violeta y dejaron lista la llave en Virocasa → Se escabullen juntos a encerrarse en Virocasa (Rama Final 1) 🏠🔥'
    };
  }
  if (state.flags.violeta_guaro_full && state.flags.cable_muslo) {
    return {
      next: 's1_canon_step1_hot_door',
      desc: 'Como jugaste bajo la mesa en El Cable y llenaste a todos de guarito en Violeta → Cataleya te deja hirviendo en la puerta y coge taxi (Rama Canon) 🚕😡'
    };
  }
  if (state.flags.escala_virocasa || state.flags.cable_barra) {
    return {
      next: 's2_intro',
      desc: 'Por tus agarrones previos detrás de la barra y en la nevera → Todo el grupo aterriza a rematar en Virocasa y Virocentro (Ramas 3, 4 y 5) 🛋️🐶'
    };
  }
  return {
    next: 's2_f1_arrive_virocasa',
    desc: 'Por tu decisión en el rincón VIP de Violeta → Cataleya no aguanta más y se lleva a J directo a Virocasa (Rama Final 1) 💋🔥'
  };
}

function formatCOP(val) {
  return '$' + Number(val || 0).toLocaleString('es-CO');
}

function updateMoneyUI() {
  const hudEl = document.getElementById('hud-money');
  const bagEl = document.getElementById('bag-money-label');
  if (hudEl) hudEl.textContent = `$${Math.round(state.money / 1000)}k`;
  if (bagEl) bagEl.textContent = formatCOP(state.money);
}

function giveItemToJ(itemId) {
  const item = GAME_ITEMS[itemId];
  if (!item) return;
  if (!state.inventory.includes(itemId)) {
    state.inventory.push(itemId);
    showToast(`${item.icon} ¡Obtuviste: ${item.name}!`);
  }
  updateActiveFlagsUI();
}

function renderChoices(choices) {
  const container = document.getElementById('choices-container');
  const hint = document.getElementById('dialogue-hint');
  hint.textContent = 'Elige una decisión (explora, juega desafíos o usa ítems del bolsillo)...';
  container.innerHTML = '';

  const allChoices = choices.map(c => {
    if (c.autoBranchByFlags) {
      const resolved = resolveAutoBranchByFlags();
      return {
        ...c,
        text: `🔗 [SEGÚN TUS DECISIONES PREVIAS]: ${resolved.desc}`,
        next: resolved.next
      };
    }
    return c;
  });

  // Si estamos en 2150 después de la mandada de mano y el jugador descubrió >= 3 Easter Eggs, inyectar la opción del Final Secreto 6
  if (state.currentNodeId === 's1_2150_reaction' && state.unlockedSecrets.length >= 3) {
    allChoices.push({
      text: '✨ [OPCIÓN SECRETA DESBLOQUEADA] J usa el poder prohibido de las Tres Casas: coronar en 2150, Virocasa y Virocentro la misma noche.',
      tag: 'Final Secreto 6 🥚👑',
      secretChoice: true,
      effects: { parche: 100 },
      next: 's1_secret_multiverse_ending'
    });
  }

  allChoices.forEach(choice => {
    const missingItem = choice.requireItem && !state.inventory.includes(choice.requireItem);
    const reqObj = choice.requireItem ? GAME_ITEMS[choice.requireItem] : null;

    const btn = document.createElement('button');
    const styleClass = missingItem
      ? 'choice-locked'
      : choice.secretChoice
      ? 'choice-secret'
      : choice.spicyChoice
      ? 'choice-spicy'
      : '';
    btn.className = `choice-btn ${styleClass}`;
    btn.innerHTML = `
      <span>▸ ${choice.text} ${missingItem && reqObj ? `<strong style="color:#fbbf24;">(Requiere ${reqObj.icon} ${reqObj.name} — Toca para ir a Tienda/Minijuegos)</strong>` : ''}</span>
      ${choice.tag ? `<span class="choice-tag">${choice.tag}</span>` : ''}
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (missingItem) {
        playSound('blip');
        showToast(`🎒 Necesitas ${reqObj.icon} ${reqObj.name}. ¡Cómpralo en la tienda o gánalo en un minijuego!`);
        openModal('modal-bag');
        return;
      }

      playSound(choice.secretChoice ? 'secret' : choice.spicyChoice ? 'spicy' : 'choice');
      if (choice.setFlags) {
        state.flags = { ...state.flags, ...choice.setFlags };
      }
      if (choice.giveMoney) {
        state.money += choice.giveMoney;
        updateMoneyUI();
      }
      if (choice.giveItem) {
        giveItemToJ(choice.giveItem);
      }
      applyEffects(choice.effects);

      if (choice.minigameId) {
        launchMinigame(choice.minigameId, () => {
          container.classList.add('hidden');
          loadNode(choice.next, true);
        });
        return;
      }

      container.classList.add('hidden');
      loadNode(choice.next, true);
    });
    container.appendChild(btn);
  });

  container.classList.remove('hidden');
}

function renderEndingTrigger(endingId) {
  const container = document.getElementById('choices-container');
  const hint = document.getElementById('dialogue-hint');
  const ending = ENDINGS[endingId];

  unlockEnding(endingId);
  playSound('ending');

  hint.textContent = '¡Has desbloqueado un final de Call of J!';
  container.innerHTML = `
    <div class="ending-card unlocked" style="margin-bottom: 6px;">
      <div class="ending-status">🏆 ${ending.title}</div>
      <h3 style="margin-bottom: 5px; font-size: 1rem;">${ending.subtitle}</h3>
      <p style="font-size: 0.88rem; color: #e2e8f0; line-height: 1.44;">${ending.description}</p>
    </div>
  `;

  const btnReplay = document.createElement('button');
  btnReplay.className = 'choice-btn choice-spicy';
  btnReplay.innerHTML = `<span>🔄 Jugar de nuevo desde El Cable (conservando tus ítems y plata ganada)</span><span class="choice-tag">Nueva Partida+</span>`;
  btnReplay.addEventListener('click', (e) => {
    e.stopPropagation();
    startNewGame('s1_intro', '2150', true);
  });

  const btnScenarios = document.createElement('button');
  btnScenarios.className = 'choice-btn';
  btnScenarios.innerHTML = `<span>🗺️ Saltar a cualquiera de los 3 escenarios (2150, Virocasa o Virocentro)</span><span class="choice-tag">Mapa</span>`;
  btnScenarios.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal('modal-map');
  });

  container.appendChild(btnReplay);
  container.appendChild(btnScenarios);
  container.classList.remove('hidden');
}

function updateBackButtonUI() {
  const btnBack = document.getElementById('btn-back-step');
  if (!btnBack) return;
  if (state.history.length > 0) {
    btnBack.classList.remove('hidden');
  } else {
    btnBack.classList.add('hidden');
  }
}

function goBackStep(e) {
  if (e) e.stopPropagation();
  if (state.history.length === 0) return;
  const prev = state.history.pop();
  state.stats = { ...prev.stats };
  state.flags = { ...(prev.flags || {}) };
  updateStatsUI();
  loadNode(prev.nodeId, false);
}

function updateActiveFlagsUI() {
  const bar = document.getElementById('active-flags-bar');
  if (!bar) return;
  const labels = {
    cable_muslo: '🦵 Muslo',
    cable_barra: '🍋 Barra',
    violeta_vip: '🔥 VIP Violeta',
    violeta_guaro_full: '🥃 Guaro',
    escala_virocasa: '🗝️ Escala Virocasa'
  };
  const chips = Object.entries(labels)
    .filter(([k]) => state.flags[k])
    .map(([, text]) => `<span class="flag-chip">${text}</span>`);

  state.inventory.forEach(itemId => {
    const it = GAME_ITEMS[itemId];
    if (it) chips.push(`<span class="flag-chip">${it.icon} ${it.name}</span>`);
  });

  if (state.unlockedSecrets.includes('egg_rey_del_roce')) {
    chips.push('<span class="flag-chip">👑 Rey del Roce</span>');
  }
  bar.innerHTML = chips.join('');
}

function loadNode(nodeId, pushHistory = true) {
  const node = STORY_NODES[nodeId];
  if (!node) return;

  if (pushHistory && state.currentNodeId && state.currentNodeId !== nodeId) {
    state.history.push({
      nodeId: state.currentNodeId,
      stats: { ...state.stats },
      flags: { ...state.flags }
    });
  }
  updateBackButtonUI();
  updateActiveFlagsUI();

  state.currentNodeId = nodeId;
  document.getElementById('choices-container').classList.add('hidden');
  document.getElementById('dialogue-hint').textContent = 'Toca o presiona [Espacio] para continuar ▸';

  // Mostrar botón de "🍑 Rozárselo" cuando J y Cataleya están juntos en escena
  const btnQuickRoce = document.getElementById('btn-quick-roce');
  if (btnQuickRoce) {
    const slotValues = Object.values(node.slots || {});
    if (slotValues.includes('j') && slotValues.includes('cataleya')) {
      btnQuickRoce.classList.remove('hidden');
    } else {
      btnQuickRoce.classList.add('hidden');
    }
  }

  if (node.scenario) {
    setScenarioVisuals(node.scenario, node.subScene || null, node.locationLabel || null);
  }

  if (node.chapterBanner) {
    showChapterBanner(node.chapterBanner);
  }

  if (node.sfx) {
    playSound(node.sfx);
  }

  if (node.toast) {
    showToast(node.toast);
  }

  const dialogueBox = document.getElementById('dialogue-box');
  const spicyInd = document.getElementById('spicy-indicator');
  if (node.isSpicy) {
    dialogueBox.classList.add('spicy-box');
    spicyInd.classList.remove('hidden');
    spawnSpicyParticles();
    if (node.leanJ) triggerScreenShake();
  } else {
    dialogueBox.classList.remove('spicy-box');
    spicyInd.classList.add('hidden');
  }

  const badgeEl = document.getElementById('speaker-badge');
  badgeEl.textContent = node.speaker || 'NARRADOR';

  const speakerChar = Object.values(CHARACTERS).find(
    c => c.name.toLowerCase() === (node.speaker || '').toLowerCase()
  );
  if (speakerChar) {
    badgeEl.style.background = speakerChar.color;
    badgeEl.style.color = '#090b12';
  } else {
    badgeEl.style.background = '#f59e0b';
    badgeEl.style.color = '#090b12';
  }

  renderStageSlots(node.slots, node.activeSlot, node.moods || {}, node.leanJ || null);

  let composedText = node.text;
  if (node.flagText) {
    const extraParts = Object.entries(node.flagText)
      .filter(([flagKey]) => state.flags[flagKey])
      .map(([, txt]) => txt);
    if (extraParts.length > 0) {
      composedText += ' ' + extraParts.join(' ');
    }
  }
  typeText(composedText);
}

function handleDialogueAdvance() {
  const node = STORY_NODES[state.currentNodeId];
  if (!node) return;

  if (state.isTyping) {
    finishTyping();
    return;
  }

  if (node.choices || node.endingId) {
    return;
  }

  if (node.next) {
    playSound('blip');
    loadNode(node.next, true);
  }
}

// ---------------- GESTIÓN DE PARTIDA Y MODALES ----------------
function startNewGame(startNode = 's1_intro', scenarioId = '2150', keepProgress = false) {
  state.stats = { parche: 25, diegui: 50, che: 70, alerta: 15 };
  state.history = [];
  state.flags = {};
  if (!keepProgress) {
    state.money = Math.max(state.money, 60000);
  }
  updateStatsUI();
  updateMoneyUI();

  document.getElementById('title-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.getElementById('top-bar').classList.remove('hidden');

  setScenarioVisuals(scenarioId);
  loadNode(startNode, false);
}

function returnToMenu() {
  clearInterval(state.typingTimer);
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  document.getElementById('title-screen').classList.remove('hidden');
  document.getElementById('scene-background').className = 'bg-2150';
  document.getElementById('scene-art').innerHTML = getScenarioArtSVG('2150', '2150');
  updateEndingsCounter();
  updateSecretsCounter();
}

function unlockEnding(endingId) {
  if (!state.unlockedEndings.includes(endingId)) {
    state.unlockedEndings.push(endingId);
    localStorage.setItem('callofj_endings', JSON.stringify(state.unlockedEndings));
  }
  updateEndingsCounter();
}

function updateEndingsCounter() {
  const total = Object.keys(ENDINGS).length;
  document.getElementById('endings-count').textContent = `${state.unlockedEndings.length}/${total}`;
}

const HOME_LIVE_MOMENTS = [
  {
    sideChar: 'diegui',
    jMood: 'spicy',
    catMood: 'flirty',
    heat: 92,
    status: '🌶️ Estado de J: <strong>Mandando Mano en 2150 (Calentura 92%)</strong>',
    quote: 'J: «Che, quédese tranquilo que yo cuido a Cataleya de Da...» (5 minutos después en 2150 mandándole toda la mano) 🖐️🔥'
  },
  {
    sideChar: 'sai',
    jMood: 'spicy',
    catMood: 'flirty',
    heat: 98,
    status: '🥃 Estado de J: <strong>Prendido con Guaritos en Violeta (98%)</strong>',
    quote: 'Cataleya: «Uy J, esos guaritos de Violeta te pusieron esa mano rapidísima... llévame pa’ Virocasa ya» 💋🔥'
  },
  {
    sideChar: 'da',
    jMood: 'angry',
    catMood: 'flirty',
    heat: 100,
    status: '🚕 Estado de J: <strong>Emputado Caminando por el Taxi Canon (100%)</strong>',
    quote: 'Cataleya coge taxi, Da y Sai consiguen pareja heterosexual en ambiente y J sale bravo caminando solo 🚕😡'
  },
  {
    sideChar: 'jairo',
    jMood: 'spicy',
    catMood: 'flirty',
    heat: 99,
    status: '🐶 Estado de J: <strong>Peligro en el Sillón de Virocentro (99%)</strong>',
    quote: 'Jairo el Pomerania: «¡Guau guau! ¡Doña Sandra, baje con las 3 hermanas que J tiene a Cataleya en el mueble!» 🚨🐶'
  }
];

let currentHomeMomentIdx = 0;

function renderHomeDiorama(idx = 0) {
  const moment = HOME_LIVE_MOMENTS[idx % HOME_LIVE_MOMENTS.length];
  const sideEl = document.getElementById('home-char-side');
  const jEl = document.getElementById('home-char-j');
  const catEl = document.getElementById('home-char-cat');
  const quoteEl = document.getElementById('home-live-quote');
  const statusEl = document.getElementById('home-j-status-label');
  const fillEl = document.getElementById('home-heat-fill');

  if (sideEl) sideEl.innerHTML = getCharacterSVG(moment.sideChar, 'normal');
  if (jEl) jEl.innerHTML = getCharacterSVG('j', moment.jMood);
  if (catEl) catEl.innerHTML = getCharacterSVG('cataleya', moment.catMood);
  if (quoteEl) quoteEl.textContent = moment.quote;
  if (statusEl) statusEl.innerHTML = moment.status;
  if (fillEl) fillEl.style.width = `${moment.heat}%`;
}

function triggerHomeSpankAction() {
  state.homeSpankClicks++;
  if (state.homeSpankClicks >= 3 && !state.unlockedSecrets.includes('egg_rey_del_roce')) {
    state.homeSpankClicks = 0;
    activateReyDelRoce();
    return;
  }

  currentHomeMomentIdx = (currentHomeMomentIdx + 1) % HOME_LIVE_MOMENTS.length;
  renderHomeDiorama(currentHomeMomentIdx);
  playSound('spicy');
  spawnSpicyParticles(['🖐️', '🔥', '🌶️', '💋', '🥃']);

  const jEl = document.getElementById('home-char-j');
  if (jEl) {
    jEl.classList.remove('grab-pulse');
    void jEl.offsetWidth;
    jEl.classList.add('grab-pulse');
    setTimeout(() => jEl.classList.remove('grab-pulse'), 550);
  }
}

function populateHomeRoutes() {
  const grid = document.getElementById('home-routes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const quickRoutes = [
    {
      step: '🥃 PARADA 1',
      name: 'El Cable → Violeta → 2150',
      desc: 'Guaritos en Violeta, J manda mano y el Taxi Canon.',
      node: 's1_intro',
      scenario: '2150'
    },
    {
      step: '🛋️ PARADA 2',
      name: 'Virocasa (J y Da)',
      desc: 'Mano en la nevera, sofá a cuotas y apagón.',
      node: 's2_intro',
      scenario: 'virocasa'
    },
    {
      step: '🐶 PARADA 3',
      name: 'Virocentro Familiar',
      desc: 'Cataleya, Jairo el Pomerania y Doña Sandra.',
      node: 's3_intro',
      scenario: 'virocentro'
    }
  ];

  quickRoutes.forEach(r => {
    const card = document.createElement('div');
    card.className = 'home-route-card';
    card.innerHTML = `
      <span class="home-route-step">${r.step}</span>
      <div class="home-route-name">${r.name}</div>
      <div class="home-route-desc">${r.desc}</div>
    `;
    card.addEventListener('click', () => {
      playSound('spicy');
      startNewGame(r.node, r.scenario);
    });
    grid.appendChild(card);
  });
}

function populateCastPreview() {
  const container = document.getElementById('hero-cast-preview');
  container.innerHTML = '';
  const roleBadges = {
    j: '🔥 Mano Larga',
    cataleya: '💋 Para J',
    sai: '🥃 El del Plan',
    da: '👀 Vigilado',
    antonia: '👓 Testigo VIP',
    che: '🚕 Cero Raras',
    diegui: '👻 Guía del Bien',
    jairo: '🐶 Alarma',
    sandra: '🚨 Mamá y 3 Hnas'
  };

  Object.values(CHARACTERS).forEach(char => {
    const card = document.createElement('div');
    card.className = 'cast-mini-card';
    card.title = `${char.name} — Haz clic para ver su historia`;
    card.innerHTML = `
      <div class="cast-mini-avatar">${getCharacterSVG(char.id, char.id === 'j' ? 'spicy' : char.id === 'cataleya' ? 'flirty' : 'normal')}</div>
      <div class="cast-mini-name">${char.name}</div>
      <div class="cast-mini-role">${roleBadges[char.id] || ''}</div>
    `;
    card.addEventListener('click', () => openModal('modal-lore'));
    container.appendChild(card);
  });
}

function populateLoreModal() {
  const grid = document.getElementById('lore-grid');
  grid.innerHTML = '';
  Object.values(CHARACTERS).forEach(char => {
    const card = document.createElement('div');
    card.className = 'lore-card';
    card.innerHTML = `
      <div class="lore-card-top">
        <div class="lore-avatar">${getCharacterSVG(char.id, char.id === 'j' ? 'spicy' : 'normal')}</div>
        <div>
          <div class="lore-name" style="color: ${char.color}">${char.name}</div>
        </div>
      </div>
      <p class="lore-bio">${char.bio}</p>
      <div class="lore-traits">
        ${char.traits.map(t => `<span class="trait-chip">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

function populateScenariosModal() {
  const grid = document.getElementById('scenarios-grid');
  grid.innerHTML = '';
  SCENARIOS.forEach(sc => {
    const card = document.createElement('div');
    card.className = 'scenario-card';
    card.innerHTML = `
      <span class="scenario-badge">${sc.number}</span>
      <h3>${sc.title}</h3>
      <p>${sc.description}</p>
      <button class="btn-secondary" data-start-node="${sc.startNode}" data-scenario="${sc.id}">
        ▶ Ir a ${sc.title}
      </button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      closeModal('modal-map');
      startNewGame(sc.startNode, sc.id);
    });
    grid.appendChild(card);
  });
}

function populateEndingsModal() {
  const grid = document.getElementById('endings-grid');
  grid.innerHTML = '';
  Object.values(ENDINGS).forEach(end => {
    const isUnlocked = state.unlockedEndings.includes(end.id);
    const card = document.createElement('div');
    card.className = `ending-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="ending-status">${isUnlocked ? '🏆 DESBLOQUEADO' : '🔒 BLOQUEADO'}</div>
      <h3 style="margin-bottom: 6px;">${end.title}</h3>
      <p style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.45;">
        ${isUnlocked ? end.description : 'Toma distintas decisiones (o descubre los Easter Eggs) para desbloquear este final.'}
      </p>
    `;
    grid.appendChild(card);
  });
}

let currentPhoneTab = 'group';
let extraCataleyaMsgs = [];
let musicInterval = null;
let musicEnabled = false;
let beatStep = 0;

function toggleClubBeat() {
  musicEnabled = !musicEnabled;
  const btn = document.getElementById('btn-music');
  if (btn) btn.classList.toggle('hud-btn-active', musicEnabled);

  if (!musicEnabled) {
    if (musicInterval) clearInterval(musicInterval);
    musicInterval = null;
    showToast('🔇 Ritmo de 2150 desactivado');
    return;
  }

  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  showToast('🎵 ¡Ritmo Nocturno de Violeta / 2150 activado!');

  if (musicInterval) clearInterval(musicInterval);
  musicInterval = setInterval(() => {
    if (!musicEnabled || !state.soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      // Bajo dembow suave según el paso
      const bassNotes = [65.41, 65.41, 98.0, 82.41];
      const freq = bassNotes[beatStep % bassNotes.length];
      osc.type = beatStep % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.14);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      beatStep++;
    } catch (e) {}
  }, 280);
}

function populatePhoneModal(tab = currentPhoneTab) {
  currentPhoneTab = tab;
  const list = document.getElementById('phone-messages-list');
  const tabGroup = document.getElementById('tab-group-chat');
  const tabCat = document.getElementById('tab-cataleya-chat');
  if (!list) return;

  if (tabGroup && tabCat) {
    tabGroup.classList.toggle('active', tab === 'group');
    tabCat.classList.toggle('active', tab === 'cataleya');
  }

  const badge = document.getElementById('phone-badge-hud');
  if (badge) badge.classList.add('hidden');

  if (tab === 'group') {
    const msgs = [
      { sender: 'Sai', color: '#ec4899', text: 'Muchachos, ya voy subiendo a El Cable con Antonia y le llevo a Cataleya de regalo exclusivo a J 😏🔥', time: '9:15 PM' },
      { sender: 'Che', color: '#10b981', text: 'Ojo pues con Da hoy, J ayúdeme a cuidarlo pa’ que no ataque a Cataleya.', time: '9:18 PM' },
      { sender: 'J', self: true, text: 'Tranquilo Che, yo me siento pegadito a Cataleya toda la noche solo pa’ cuidarla 🙏😇', time: '9:20 PM' },
      { sender: 'Sai', color: '#ec4899', text: '¡Primero parada obligatoria en Violeta a darnos unos guaritos y de ahí nos vamos bien tomados pa’ 2150! 🥃🔥', time: '10:35 PM' },
      { sender: 'Diegui (Fantasma)', color: '#38bdf8', text: '👻 Audio (0:12): «Da, baja ese guarito en Violeta y camina por el sendero del bien...»', time: '11:10 PM' },
      { sender: 'Da', color: '#3b82f6', text: '¡¡Huy cómo así que me cuidaban a mí y J ya le está mandando mano y rozándoselo a Cataleya en lo oscuro de 2150!! 👀🔥', time: '1:15 AM' }
    ];

    if (state.unlockedSecrets.includes('egg_rey_del_roce')) {
      msgs.push({
        sender: 'Sai',
        color: '#ec4899',
        text: '👑 JAJAJA oficien la coronación: J se proclamó EL REY DEL ROCE en pleno 2150, no se despega de Cataleya ni con agua caliente 🍑🔥',
        time: '1:40 AM'
      });
    }
    if (state.unlockedEndings.includes('end_2_canon_taxi')) {
      msgs.push({
        sender: 'Da',
        color: '#3b82f6',
        text: '🚕 JAJAJA Cataleya cogió taxi y dejó a J hirviendo. Aquí quedamos Sai y yo con pareja heterosexual en pleno ambiente y J salió bravo caminando solo 😂🚶‍♂️',
        time: '2:30 AM'
      });
    }
    if (state.unlockedEndings.includes('end_1_virocasa_intimo')) {
      msgs.push({
        sender: 'Da',
        color: '#3b82f6',
        text: '¡¡J ÁBRAME LA PUERTA DE VIROCASA QUE YO TAMBIÉN VIVO AQUÍ Y SE ESCUCHA TODO HASTA EL ANDÉN!! 🏠🔊',
        time: '2:45 AM'
      });
    }

    list.innerHTML = msgs.map(m => `
      <div class="chat-msg ${m.self ? 'msg-self' : ''}">
        <div class="chat-msg-sender" style="color: ${m.self ? '#fde047' : m.color}">${m.sender}</div>
        <div>${m.text}</div>
        <div class="chat-msg-time">${m.time}</div>
      </div>
    `).join('');
  } else {
    const catMsgs = [
      { sender: 'Cataleya 💋', color: '#e879f9', text: 'Hola J... Sai me contó que me trajo a El Cable especialmente para ti 😘', time: '9:30 PM' },
      { sender: 'J', self: true, text: 'Espere que nos tomemos unos guaritos en Violeta y subamos a 2150... le tengo guardado un rocecito especial 😏🔥', time: '10:50 PM' },
      { sender: 'Cataleya 💋', color: '#e879f9', text: 'Uy J, esa mano tuya en 2150 no respeta nada... me tienes temblando 🔥🍑', time: '1:20 AM' },
      ...extraCataleyaMsgs
    ];

    list.innerHTML = catMsgs.map(m => `
      <div class="chat-msg ${m.self ? 'msg-self' : ''}">
        <div class="chat-msg-sender" style="color: ${m.self ? '#fde047' : m.color}">${m.sender}</div>
        <div>${m.text}</div>
        <div class="chat-msg-time">${m.time}</div>
      </div>
    `).join('') + `
      <button id="btn-send-cat-msg" class="choice-btn choice-spicy" style="margin-top: 6px;">
        <span>📤 Enviar a Cataleya: «¿Cuándo otro rocecito del Rey del Roce? 👑🍑🔥»</span>
      </button>
    `;

    const sendBtn = document.getElementById('btn-send-cat-msg');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        playSound('spicy');
        const replies = [
          'Cataleya: «¡Cuando quieras mi Rey del Roce!Pero que no nos pille Jairo en Virocentro 🐶🔥»',
          'Cataleya: «Uy J, todavía me acuerdo de esos guaritos en Violeta y de cómo me mandaste mano en 2150 💋»',
          'Cataleya: «Tranca la puerta de Virocasa que Da se quede afuera otra vez 😏🏠»'
        ];
        extraCataleyaMsgs.push(
          { sender: 'J', self: true, text: '¿Cuándo otro rocecito bien pegado? 👑🍑🔥', time: 'Ahora' },
          { sender: 'Cataleya 💋', color: '#e879f9', text: replies[extraCataleyaMsgs.length % replies.length], time: 'Ahora' }
        );
        populatePhoneModal('cataleya');
      });
    }
  }
}

function handleSecretCodeSubmit() {
  const input = document.getElementById('secret-code-input');
  if (!input) return;
  const val = input.value.trim().toUpperCase();
  if (!val) return;
  input.value = '';

  if (val.includes('ROCE')) {
    activateReyDelRoce();
    populateSecretsModal();
  } else if (val.includes('MANO') || val.includes('2150')) {
    state.stats.parche = 100;
    updateStatsUI();
    spawnSpicyParticles(['🖐️', '🔥', '🌶️', '🍑']);
    triggerScreenShake();
    unlockSecret('egg_code_mano', '🥚 ¡CÓDIGO PROHIBIDO ACTIVADO! Calentura de J al 100%');
    populateSecretsModal();
  } else {
    showToast('❌ Código desconocido. Prueba con: ROCE, MANO o 2150');
  }
}

let currentBagTab = 'items';
let activeMgTimer = null;

function populateBagModal(tab = currentBagTab) {
  currentBagTab = tab;
  updateMoneyUI();
  const area = document.getElementById('bag-content-area');
  const tabItems = document.getElementById('tab-bag-items');
  const tabArcade = document.getElementById('tab-bag-arcade');
  if (!area) return;

  if (tabItems && tabArcade) {
    tabItems.classList.toggle('active', tab === 'items');
    tabArcade.classList.toggle('active', tab === 'arcade');
  }

  if (tab === 'items') {
    area.innerHTML = `<div class="endings-grid" id="bag-items-grid"></div>`;
    const grid = document.getElementById('bag-items-grid');

    Object.values(GAME_ITEMS).forEach(item => {
      const owned = state.inventory.includes(item.id);
      const card = document.createElement('div');
      card.className = `ending-card ${owned ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div class="ending-status">${owned ? '✅ EN EL BOLSILLO DE J' : `💵 PRECIO: ${formatCOP(item.price)}`}</div>
        <h3 style="margin-bottom: 6px;">${item.icon} ${item.name}</h3>
        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.42; margin-bottom: 10px;">${item.desc}</p>
        <button class="btn-secondary" style="width: 100%;">
          ${owned ? '✨ Usar / Activar Efecto' : `🛒 Comprar (${formatCOP(item.price)})`}
        </button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        if (owned) {
          playSound('spicy');
          state.stats.parche = clampStat(state.stats.parche + 25);
          updateStatsUI();
          spawnSpicyParticles([item.icon, '🔥', '🌶️', '🍑']);
          if (item.id === 'perfume_roce') activateReyDelRoce();
          showToast(`${item.icon} ¡Usaste ${item.name}! Calentura de J al máximo.`);
        } else {
          if (state.money < item.price) {
            playSound('bark');
            showToast('💸 No te alcanza la plata. ¡Juega un Minijuego en la pestaña Arcade para ganar billetes!');
            return;
          }
          state.money -= item.price;
          updateMoneyUI();
          giveItemToJ(item.id);
          playSound('secret');
          populateBagModal('items');
          // Refrescar opciones activas por si desbloqueó una opción en escena
          const currentNode = STORY_NODES[state.currentNodeId];
          if (currentNode && currentNode.choices && !state.isTyping) {
            renderChoices(currentNode.choices);
          }
        }
      });
      grid.appendChild(card);
    });
  } else {
    area.innerHTML = `<div class="endings-grid" id="bag-arcade-grid"></div>`;
    const grid = document.getElementById('bag-arcade-grid');

    Object.values(MINIGAMES).forEach(mg => {
      const rewardIt = GAME_ITEMS[mg.rewardItem];
      const card = document.createElement('div');
      card.className = 'ending-card unlocked';
      card.innerHTML = `
        <div class="ending-status">🕹️ RECOMPENSA: +${formatCOP(mg.rewardMoney)} ${rewardIt ? `+ ${rewardIt.icon} ${rewardIt.name}` : ''}</div>
        <h3 style="margin-bottom: 6px;">${mg.title}</h3>
        <p style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.42; margin-bottom: 10px;">${mg.instructions}</p>
        <button class="btn-home-spank" style="width: 100%; padding: 9px 14px;">▶ Jugar Ahora</button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        closeModal('modal-bag');
        launchMinigame(mg.id, () => {
          openModal('modal-bag');
          populateBagModal('arcade');
        });
      });
      grid.appendChild(card);
    });
  }
}

// ---------------- MOTOR DE LOS 3 MINIJUEGOS EN TIEMPO REAL ----------------
function stopMinigameLoop() {
  if (activeMgTimer) {
    clearInterval(activeMgTimer);
    activeMgTimer = null;
  }
}

function launchMinigame(mgId, onComplete = null) {
  const mg = MINIGAMES[mgId];
  if (!mg) {
    if (onComplete) onComplete();
    return;
  }

  stopMinigameLoop();
  const modal = document.getElementById('modal-minigame');
  const titleEl = document.getElementById('mg-title');
  const instEl = document.getElementById('mg-instructions');
  const stageEl = document.getElementById('mg-stage');

  titleEl.textContent = mg.title;
  instEl.textContent = mg.instructions;
  stageEl.innerHTML = '';
  modal.classList.remove('hidden');

  const finishVictory = () => {
    stopMinigameLoop();
    playSound('ending');
    state.money += mg.rewardMoney || 15000;
    updateMoneyUI();
    if (mg.rewardItem) giveItemToJ(mg.rewardItem);
    spawnSpicyParticles(['🏆', '🔥', '🍑', '💵', '🥃']);

    const rewardObj = GAME_ITEMS[mg.rewardItem];
    stageEl.innerHTML = `
      <div style="font-size: 2.2rem;">🏆🔥</div>
      <h3 style="color: #fde047;">¡DESAFÍO SUPERADO POR J!</h3>
      <p style="color: #e2e8f0; font-size: 0.9rem;">
        Ganaste <strong>+${formatCOP(mg.rewardMoney)}</strong> ${rewardObj ? `y desbloqueaste <strong>${rewardObj.icon} ${rewardObj.name}</strong>` : ''}.
      </p>
      <button id="btn-mg-continue" class="btn-primary" style="max-width: 280px;">▶ Continuar</button>
    `;
    document.getElementById('btn-mg-continue').addEventListener('click', () => {
      modal.classList.add('hidden');
      const currentNode = STORY_NODES[state.currentNodeId];
      if (currentNode && currentNode.choices && !state.isTyping) {
        renderChoices(currentNode.choices);
      }
      if (onComplete) onComplete();
    });
  };

  if (mg.type === 'timing') {
    // MINIJUEGO 1: Barra de precisión de Guaritos y Roce en Violeta
    let pos = 10;
    let dir = 1;
    let hits = 0;

    stageEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:14px;">
        <div style="width:74px; height:84px;">${getCharacterSVG('j', 'spicy')}</div>
        <div style="font-size:1.7rem;">🥃🍑</div>
        <div style="width:74px; height:84px;">${getCharacterSVG('cataleya', 'flirty')}</div>
      </div>
      <div id="mg-score-label" style="font-weight:800; color:#f9a8d4;">Guaritos con Roce acertados: 0 / ${mg.targetHits}</div>
      <div class="mg-meter-track">
        <div class="mg-meter-zone"></div>
        <div id="mg-cursor" class="mg-meter-cursor" style="left: 10%;"></div>
      </div>
      <button id="btn-mg-hit" class="btn-primary" style="max-width:320px;">🥃 ¡FONDO Y ROCE AHORA!</button>
    `;

    const cursorEl = document.getElementById('mg-cursor');
    const scoreEl = document.getElementById('mg-score-label');

    activeMgTimer = setInterval(() => {
      pos += dir * 3.6;
      if (pos >= 94) { pos = 94; dir = -1; }
      if (pos <= 2) { pos = 2; dir = 1; }
      if (cursorEl) cursorEl.style.left = `${pos}%`;
    }, 28);

    document.getElementById('btn-mg-hit').addEventListener('click', () => {
      if (pos >= 33 && pos <= 66) {
        hits++;
        playSound('spicy');
        spawnSpicyParticles(['🥃', '🔥', '🍑']);
        scoreEl.textContent = `¡ROCE PERFECTO! Guaritos acertados: ${hits} / ${mg.targetHits}`;
        if (hits >= mg.targetHits) {
          finishVictory();
        }
      } else {
        playSound('bark');
        scoreEl.textContent = `¡Casi te pilla Che! Intenta cuando esté en la zona rosada (${hits}/${mg.targetHits})`;
      }
    });
  } else if (mg.type === 'stealth_mash') {
    // MINIJUEGO 2: El Rey del Roce en 2150 (Luz Verde / Luz Roja)
    let progress = 15;
    let isWatching = false;
    let ticks = 0;

    stageEl.innerHTML = `
      <div id="mg-eye" class="mg-eye-badge mg-eye-safe">🟢 PISTA OSCURA EN 2150 — ¡ROZÁSELO YA!</div>
      <div style="display:flex; align-items:center; gap:8px;">
        <div id="mg-j-fig" style="width:82px; height:94px;">${getCharacterSVG('j', 'spicy')}</div>
        <div style="width:82px; height:94px;">${getCharacterSVG('cataleya', 'flirty')}</div>
      </div>
      <div style="width:100%; text-align:left; font-size:0.8rem; font-weight:800; color:#fde047;">
        Calentura del Roce con Cataleya: <span id="mg-roce-pct">15%</span>
      </div>
      <div class="mg-progress-bar">
        <div id="mg-roce-fill" class="mg-progress-fill" style="width:15%;"></div>
      </div>
      <button id="btn-mg-mash" class="btn-primary" style="max-width:340px;">🍑 ¡ROZÁRSELO Y MANDAR MANO!</button>
    `;

    const eyeEl = document.getElementById('mg-eye');
    const pctEl = document.getElementById('mg-roce-pct');
    const fillEl = document.getElementById('mg-roce-fill');

    activeMgTimer = setInterval(() => {
      ticks++;
      if (ticks % 7 === 0) {
        isWatching = !isWatching;
        if (eyeEl) {
          eyeEl.className = `mg-eye-badge ${isWatching ? 'mg-eye-danger' : 'mg-eye-safe'}`;
          eyeEl.textContent = isWatching
            ? '🚨 ¡DA Y SAI VOLTEARON A MIRAR! (¡QUIETO!)'
            : '🟢 PISTA OSCURA EN 2150 — ¡DALE ROCE A FONDO!';
        }
      }
    }, 340);

    document.getElementById('btn-mg-mash').addEventListener('click', () => {
      if (isWatching) {
        playSound('bark');
        progress = Math.max(10, progress - 14);
        showToast('👀 ¡Te vieron mandando mano! Espera a que se ponga en verde');
      } else {
        playSound('spicy');
        progress = Math.min(100, progress + 18);
        spawnSpicyParticles(['🍑', '👑', '🔥']);
      }
      if (pctEl) pctEl.textContent = `${progress}%`;
      if (fillEl) fillEl.style.width = `${progress}%`;

      if (progress >= 100) {
        activateReyDelRoce();
        finishVictory();
      }
    });
  } else {
    // MINIJUEGO 3: Equilibrio de Mano y Galletas a Jairo en Virocentro
    let passion = 20;
    let noise = 25;

    stageEl.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-around; width:100%;">
        <div style="width:74px; height:84px;">${getCharacterSVG('jairo', 'normal')}</div>
        <div style="width:78px; height:88px;">${getCharacterSVG('j', 'spicy')}</div>
        <div style="width:78px; height:88px;">${getCharacterSVG('cataleya', 'flirty')}</div>
      </div>
      <div style="width:100%; text-align:left; font-size:0.78rem; font-weight:800; color:#f9a8d4;">
        🔥 Pasión en el Sillón con Cataleya: <span id="mg-pas-lbl">20%</span>
      </div>
      <div class="mg-progress-bar">
        <div id="mg-pas-bar" class="mg-progress-fill" style="width:20%;"></div>
      </div>
      <div style="width:100%; text-align:left; font-size:0.78rem; font-weight:800; color:#fde047;">
        🐶 Sospecha de Jairo el Pomerania (No dejes que llegue a 100%): <span id="mg-noi-lbl">25%</span>
      </div>
      <div class="mg-progress-bar">
        <div id="mg-noi-bar" class="mg-progress-fill" style="width:25%; background:linear-gradient(90deg,#eab308,#ef4444);"></div>
      </div>
      <div class="mg-actions-row">
        <button id="btn-mg-hand" class="btn-home-spank" style="padding:10px 16px;">🖐️ Mandar Mano (+20% Pasión / +22% Ruido)</button>
        <button id="btn-mg-cookie" class="btn-secondary" style="border-color:#fbbf24; color:#fde047;">🦴 Dar Galleta a Jairo (-30% Ruido)</button>
      </div>
    `;

    const updateBars = () => {
      document.getElementById('mg-pas-lbl').textContent = `${passion}%`;
      document.getElementById('mg-pas-bar').style.width = `${passion}%`;
      document.getElementById('mg-noi-lbl').textContent = `${noise}%`;
      document.getElementById('mg-noi-bar').style.width = `${noise}%`;
    };

    document.getElementById('btn-mg-hand').addEventListener('click', () => {
      playSound('spicy');
      passion = Math.min(100, passion + 20);
      noise = Math.min(100, noise + 22);
      spawnSpicyParticles(['🖐️', '🔥', '💋']);
      if (noise >= 100) {
        playSound('bark');
        noise = 55;
        passion = Math.max(20, passion - 15);
        showToast('🐶 ¡Jairo ladró! Tírale una galleta antes de seguir mandando mano');
      }
      updateBars();
      if (passion >= 100) finishVictory();
    });

    document.getElementById('btn-mg-cookie').addEventListener('click', () => {
      playSound('choice');
      noise = Math.max(5, noise - 30);
      updateBars();
    });
  }
}

function populateSecretsModal() {
  const grid = document.getElementById('secrets-grid');
  grid.innerHTML = '';
  Object.values(EASTER_EGGS).forEach(egg => {
    const isUnlocked = state.unlockedSecrets.includes(egg.id);
    const card = document.createElement('div');
    card.className = `ending-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="ending-status">${isUnlocked ? '🥚 DESCUBIERTO' : '🕵️ PISTA SECRETA'}</div>
      <h3 style="margin-bottom: 6px;">${egg.title}</h3>
      <p style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.45;">
        ${isUnlocked ? egg.description : `<strong>Pista:</strong> ${egg.hint}`}
      </p>
    `;
    grid.appendChild(card);
  });
}

function openModal(id) {
  if (id === 'modal-bag') populateBagModal('items');
  if (id === 'modal-phone') populatePhoneModal('group');
  if (id === 'modal-lore') populateLoreModal();
  if (id === 'modal-map') populateScenariosModal();
  if (id === 'modal-endings') populateEndingsModal();
  if (id === 'modal-secrets') populateSecretsModal();
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  if (id === 'modal-minigame') stopMinigameLoop();
  document.getElementById(id).classList.add('hidden');
}

// ---------------- EVENT LISTENERS Y TRIGGERS DE EASTER EGGS ----------------
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('scene-background').className = 'bg-2150';
  document.getElementById('scene-art').innerHTML = getScenarioArtSVG('2150', '2150');
  renderHomeDiorama(0);
  populateHomeRoutes();
  populateCastPreview();
  updateEndingsCounter();
  updateSecretsCounter();

  document.getElementById('btn-home-spank').addEventListener('click', (e) => {
    e.stopPropagation();
    triggerHomeSpankAction();
  });

  document.getElementById('home-stage-card').addEventListener('click', () => {
    triggerHomeSpankAction();
  });

  document.getElementById('btn-start-game').addEventListener('click', () => {
    playSound('choice');
    startNewGame('s1_intro', '2150');
  });

  document.getElementById('btn-menu').addEventListener('click', returnToMenu);
  document.getElementById('btn-back-step').addEventListener('click', goBackStep);

  document.getElementById('btn-quick-roce').addEventListener('click', (e) => {
    e.stopPropagation();
    const centerSlot = document.getElementById('char-center');
    handleStageCharacterClick('j', centerSlot);
    updateActiveFlagsUI();
  });

  document.getElementById('btn-bag-hud').addEventListener('click', () => openModal('modal-bag'));
  document.getElementById('btn-open-bag-menu').addEventListener('click', () => openModal('modal-bag'));
  document.getElementById('tab-bag-items').addEventListener('click', () => populateBagModal('items'));
  document.getElementById('tab-bag-arcade').addEventListener('click', () => populateBagModal('arcade'));
  document.getElementById('btn-close-mg').addEventListener('click', () => closeModal('modal-minigame'));

  document.getElementById('btn-phone-hud').addEventListener('click', () => openModal('modal-phone'));
  document.getElementById('btn-open-phone-menu').addEventListener('click', () => openModal('modal-phone'));
  document.getElementById('tab-group-chat').addEventListener('click', () => populatePhoneModal('group'));
  document.getElementById('tab-cataleya-chat').addEventListener('click', () => populatePhoneModal('cataleya'));

  document.getElementById('btn-submit-code').addEventListener('click', handleSecretCodeSubmit);
  document.getElementById('secret-code-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSecretCodeSubmit();
  });

  document.getElementById('btn-open-lore-menu')?.addEventListener('click', () => openModal('modal-lore'));
  document.getElementById('btn-lore').addEventListener('click', () => openModal('modal-lore'));

  document.getElementById('btn-open-map-menu')?.addEventListener('click', () => openModal('modal-map'));
  document.getElementById('btn-map').addEventListener('click', () => openModal('modal-map'));

  document.getElementById('btn-open-endings').addEventListener('click', () => openModal('modal-endings'));
  document.getElementById('btn-open-secrets').addEventListener('click', () => openModal('modal-secrets'));
  document.getElementById('btn-secrets-hud').addEventListener('click', () => openModal('modal-secrets'));

  document.getElementById('btn-music').addEventListener('click', toggleClubBeat);

  // Easter Egg 1: Tocar 5 veces la letra J del título
  document.getElementById('secret-j-letter').addEventListener('click', () => {
    state.jTitleClicks++;
    playSound('spicy');
    if (state.jTitleClicks >= 5) {
      state.jTitleClicks = 0;
      spawnSpicyParticles(['🖐️', '🌶️', '🔥', '😏']);
      unlockSecret('egg_title_j', '🥚 ¡Secreto 1! Cerebro de J: 99% mandar mano a Cataleya, 1% cuidar a Da');
    }
  });

  // Easter Egg 5: Tocar 3 veces el cartel de ubicación en el HUD
  document.getElementById('hud-location').addEventListener('click', () => {
    state.locClicks++;
    if (state.locClicks >= 3) {
      state.locClicks = 0;
      const reports = {
        '2150': '📻 [CÁMARA DE SEGURIDAD 2150]: «Operador, haga zoom al palco... ¡el man que decía cuidar al amigo ya le tiene la mano metida a la rubia!»',
        'virocasa': '📻 [VECINO DE VIROCASA]: «¡Aló Policía! En la casa donde viven J y Da llevan media hora haciendo rechinar ese colchón y el pobre Da sigue afuera en el andén»',
        'virocentro': '📻 [WHATSAPP FAMILIA VIROCENTRO]: «Sandra: Niñas, ¿por qué Jairo está ladrando tanto abajo en la sala? ¡Bajemos ya a prender la luz!»'
      };
      unlockSecret('egg_location_radio', reports[state.currentScenario] || reports['2150']);
    }
  });

  document.getElementById('btn-audio').addEventListener('click', (e) => {
    state.soundEnabled = !state.soundEnabled;
    e.currentTarget.classList.toggle('hud-btn-muted', !state.soundEnabled);
    e.currentTarget.innerHTML = state.soundEnabled
      ? `<svg class="ui-icon icon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`
      : `<svg class="ui-icon icon-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });

  document.getElementById('dialogue-box').addEventListener('click', handleDialogueAdvance);

  window.addEventListener('keydown', (e) => {
    // Detector de código secreto en el teclado (MANO, 2150 o ROCE)
    if (e.key && e.key.length === 1) {
      state.keyBuffer = (state.keyBuffer + e.key.toUpperCase()).slice(-8);
      if (state.keyBuffer.endsWith('ROCE')) {
        state.keyBuffer = '';
        activateReyDelRoce();
      } else if (state.keyBuffer.endsWith('MANO') || state.keyBuffer.endsWith('2150')) {
        state.keyBuffer = '';
        state.stats.parche = 100;
        updateStatsUI();
        spawnSpicyParticles(['🖐️', '🔥', '🌶️', '🍑']);
        triggerScreenShake();
        unlockSecret('egg_code_mano', '🥚 ¡CÓDIGO PROHIBIDO ACTIVADO! Calentura de J al 100%');
      }
    }

    if (e.code === 'Space' || e.code === 'Enter') {
      const gameVisible = !document.getElementById('game-screen').classList.contains('hidden');
      const modalOpen = Array.from(document.querySelectorAll('.modal-backdrop')).some(
        m => !m.classList.contains('hidden')
      );
      if (gameVisible && !modalOpen) {
        e.preventDefault();
        handleDialogueAdvance();
      }
    }
  });
});
