// ============================================================================
// JAIRO RESCUEE — MOTOR GRÁFICO HD, SPRITES VECTORIALES Y CONTROL RESPONSIVE
// ============================================================================

const state = {
  maxUnlockedLevel: parseInt(localStorage.getItem('jairorescue_max_level') || '1', 10),
  completedLevels: JSON.parse(localStorage.getItem('jairorescue_completed') || '[]'),
  bones: parseInt(localStorage.getItem('jairorescue_bones') || '0', 10),
  upgrades: JSON.parse(localStorage.getItem('jairorescue_upgrades') || '{}'),
  soundEnabled: true,
  currentLevelNum: 1,
  isPlaying: false,
  isPausedForDialogue: false,
  dialogueQueue: [],
  onDialogueDone: null
};

// ---------------- CACHÉ DE SPRITES SVG DE ALTA DEFINICIÓN ----------------
const SPRITE_CACHE = {};

function preloadSprites() {
  const ids = ['j', 'jairo', 'jair', 'javier', 'gael', 'derian', 'sandra', 'thug', 'usher', 'drone', 'drone_jair', 'da'];
  ids.forEach(id => {
    const svgString = getRescueCharSVG(id);
    if (!svgString) return;
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
    SPRITE_CACHE[id] = img;
  });
}

// ---------------- SISTEMA DE SONIDO SINTETIZADO (WEB AUDIO API) ----------------
let audioCtx = null;

function playSfx(type) {
  if (!state.soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'jump') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(290, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.13);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'shoot') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'bone') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.07);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'special') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(880, now + 0.16);
      osc.frequency.setValueAtTime(1174.66, now + 0.24);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'bark') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.5, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    }
  } catch (e) {}
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'toast-item';
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3400);
}

function saveProgress() {
  localStorage.setItem('jairorescue_max_level', String(state.maxUnlockedLevel));
  localStorage.setItem('jairorescue_completed', JSON.stringify(state.completedLevels));
  localStorage.setItem('jairorescue_bones', String(state.bones));
  localStorage.setItem('jairorescue_upgrades', JSON.stringify(state.upgrades));
}

// ---------------- CONFIGURACIÓN DE CANVAS HD Y RESPONSIVE ----------------
const canvas = document.getElementById('rescue-canvas');
const ctx = canvas.getContext('2d');
const LOGICAL_H = 500;
const LANDSCAPE_W = 960;
const PORTRAIT_W = 560;
let LOGICAL_W = LANDSCAPE_W;

// Ajusta el ancho lógico del mundo según la orientación para aprovechar toda la pantalla
function applyLayout() {
  const portrait = window.innerHeight > window.innerWidth * 1.05;
  LOGICAL_W = portrait ? PORTRAIT_W : LANDSCAPE_W;
  const container = canvas.parentElement;
  if (container) container.style.setProperty('--ar', String(LOGICAL_W / LOGICAL_H));
  document.body.classList.toggle('is-portrait', portrait);
  setupHiDPICanvas();
}

function setupHiDPICanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = LOGICAL_W * dpr;
  canvas.height = LOGICAL_H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener('resize', applyLayout);
window.addEventListener('orientationchange', () => setTimeout(applyLayout, 150));

const keys = {
  left: false,
  right: false
};

let world = {
  levelCfg: null,
  cameraX: 0,
  tick: 0,
  player: null,
  platforms: [],
  bonesList: [],
  oilBottles: [],
  enemies: [],
  projectiles: [],
  enemyProjectiles: [],
  particles: [],
  floatingTexts: [],
  boss: null,
  goalX: 2000,
  specialCooldown: 0,
  flashTimer: 0
};

function getMaxHearts() {
  return 3 + (state.upgrades.sandra_shield || 0);
}

function getShotDamage() {
  return 1 + (state.upgrades.gael_ring || 0) * 0.6;
}

function getSpeedMultiplier() {
  return 1 + (state.upgrades.derian_oil || 0) * 0.12;
}

// ---------------- CONSTRUCCIÓN DE NIVEL (1 A 10) ----------------
function buildLevelWorld(levelNum) {
  const cfg = RESCUE_LEVELS.find(l => l.level === levelNum) || RESCUE_LEVELS[0];
  world.levelCfg = cfg;
  world.cameraX = 0;
  world.tick = 0;
  world.projectiles = [];
  world.enemyProjectiles = [];
  world.particles = [];
  world.floatingTexts = [];
  world.specialCooldown = 0;
  world.flashTimer = 0;

  const maxHp = getMaxHearts();
  world.player = {
    x: 90,
    y: 330,
    w: 46,
    h: 64,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: false,
    jumpsLeft: 2,
    hp: maxHp,
    maxHp: maxHp,
    invuln: 0,
    oilBoostTimer: 0,
    shootAnim: 0,
    hasGael: cfg.ally === 'gael' || levelNum >= 5
  };

  world.platforms = [];
  world.bonesList = [];
  world.oilBottles = [];
  world.enemies = [];

  // Suelo inicial seguro
  world.platforms.push({ x: 0, y: 425, w: 430, h: 75, type: 'ground' });

  let cursorX = 465;
  const endSectionX = cfg.length - 500;
  let stepIndex = 0;

  while (cursorX < endSectionX) {
    const gap = 65 + ((stepIndex * 27) % 52);
    cursorX += gap;

    const platW = 165 + ((stepIndex * 43) % 120);
    const platY = 250 + ((stepIndex * 61) % 150);
    const isSlippery = cfg.slippery || (levelNum >= 6 && stepIndex % 3 === 0);

    world.platforms.push({
      x: cursorX,
      y: platY,
      w: platW,
      h: 26,
      type: isSlippery ? 'oil_plat' : 'plat'
    });

    if (stepIndex % 2 === 0) {
      world.platforms.push({
        x: cursorX - 30,
        y: 425,
        w: platW + 60,
        h: 75,
        type: cfg.slippery ? 'oil_ground' : 'ground'
      });
    }

    if (stepIndex % 2 === 0) {
      world.bonesList.push({
        x: cursorX + platW * 0.5,
        y: platY - 36,
        r: 14,
        collected: false
      });
    }

    if (stepIndex === 2 || stepIndex === 6) {
      world.oilBottles.push({
        x: cursorX + platW * 0.35,
        y: platY - 38,
        collected: false
      });
    }

    const enemyType =
      cfg.theme === 'cinema'
        ? 'usher'
        : stepIndex % 3 === 1
        ? 'drone'
        : 'thug';

    const enemyY = enemyType === 'drone' ? platY - 82 : platY - 56;
    const enemyHp = 2 + Math.floor(levelNum / 3);

    world.enemies.push({
      x: cursorX + platW * 0.5,
      y: enemyY,
      minX: cursorX + 12,
      maxX: cursorX + platW - 48,
      w: 46,
      h: 56,
      vx: (1.45 + levelNum * 0.13) * (stepIndex % 2 === 0 ? 1 : -1),
      hp: enemyHp,
      maxHp: enemyHp,
      type: enemyType,
      shootTimer: 85 + (stepIndex * 29) % 90
    });

    cursorX += platW;
    stepIndex++;
  }

  // Arena final del nivel
  const arenaX = endSectionX + 40;
  const arenaW = 460;
  world.platforms.push({
    x: arenaX,
    y: 425,
    w: arenaW,
    h: 75,
    type: cfg.slippery ? 'oil_ground' : 'ground'
  });

  world.platforms.push({ x: arenaX + 45, y: 305, w: 120, h: 22, type: 'plat' });
  world.platforms.push({ x: arenaX + 220, y: 305, w: 120, h: 22, type: 'plat' });

  // La meta queda cómodamente dentro de la pantalla y el jugador la alcanza sin topar con paredes
  world.goalX = cfg.length - 130;

  if (cfg.boss) {
    world.boss = {
      id: cfg.boss.id,
      spriteId: cfg.boss.id.includes('javier')
        ? 'javier'
        : cfg.boss.id.includes('drone')
        ? 'drone_jair'
        : 'jair',
      name: cfg.boss.name,
      hp: cfg.boss.hp,
      maxHp: cfg.boss.hp,
      color: cfg.boss.color,
      quote: cfg.boss.quote,
      x: arenaX + 240,
      y: 315,
      w: 84,
      h: 110,
      vx: -2.2,
      minX: arenaX + 45,
      maxX: cfg.length - 170,
      attackTimer: 72,
      jumpTimer: 115,
      vy: 0,
      defeated: false
    };
  } else {
    world.boss = null;
  }

  // Aliado DA: aparece en El Manzanareño (nivel 7) y en Virocasa (niveles 8-10)
  world.da = null;
  if (cfg.da) {
    if (cfg.da === 'mid') {
      const target = cfg.length * 0.5;
      const spot = world.platforms
        .filter(pl => pl.type !== 'ground' && pl.type !== 'oil_ground' && pl.w >= 150)
        .sort((a, b) => Math.abs(a.x + a.w / 2 - target) - Math.abs(b.x + b.w / 2 - target))[0];
      const sx = spot ? spot.x + spot.w / 2 - 23 : target;
      const sy = spot ? spot.y - 64 : 300;
      world.da = { x: sx, y: sy, w: 46, h: 64, joined: false, shootFlash: 0 };
    } else {
      world.da = { x: world.player.x - 70, y: world.player.y, w: 46, h: 64, joined: true, shootFlash: 0 };
    }
  }

  updateHudUI();
}

// ---------------- CONTROLES Y ACCIONES DE J ----------------
function triggerJump() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  const p = world.player;
  if (p.jumpsLeft > 0) {
    p.vy = -12.8 * (1 + (state.upgrades.derian_oil || 0) * 0.04);
    p.onGround = false;
    p.jumpsLeft--;
    playSfx('jump');
    spawnParticles(p.x + p.w / 2, p.y + p.h, '#fde047', 8);
  }
}

function triggerShoot() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  const p = world.player;
  p.shootAnim = 12;
  playSfx('shoot');

  world.projectiles.push({
    x: p.facing > 0 ? p.x + p.w : p.x - 10,
    y: p.y + 26,
    vx: p.facing * 11.5,
    vy: 0,
    r: 8,
    damage: getShotDamage(),
    color: p.oilBoostTimer > 0 ? '#facc15' : '#f59e0b',
    glow: '#fde047',
    type: 'j_shot'
  });

  if (world.da && world.da.joined) {
    world.da.shootFlash = 10;
    world.projectiles.push({
      x: world.da.x + (p.facing > 0 ? world.da.w : -8),
      y: world.da.y + 28,
      vx: p.facing * 12,
      vy: 0,
      r: 7,
      damage: getShotDamage() * 0.9,
      color: '#38bdf8',
      glow: '#bae6fd',
      type: 'da_shot'
    });
  }

  if (p.hasGael) {
    world.projectiles.push({
      x: p.facing > 0 ? p.x + p.w - 8 : p.x - 8,
      y: p.y + 8,
      vx: p.facing * 13,
      vy: -0.4,
      r: 7,
      damage: getShotDamage() * 0.78,
      color: '#ec4899',
      glow: '#f9a8d4',
      type: 'gael_token'
    });
  }
}

function triggerSpecialPower() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  if (world.specialCooldown > 0) {
    showToast('⏳ Recargando... hasta el Aro LED necesita un respiro, ¡paciencia!');
    return;
  }

  playSfx('special');
  world.specialCooldown = 340;
  world.flashTimer = 28;
  world.player.oilBoostTimer = 250;

  const camLeft = world.cameraX - 80;
  const camRight = world.cameraX + LOGICAL_W + 80;

  world.enemies.forEach(en => {
    if (en.x >= camLeft && en.x <= camRight) {
      en.hp -= 4.5 + (state.upgrades.gael_ring || 0) + (world.da && world.da.joined ? 1.5 : 0);
      spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#ec4899', 15);
    }
  });
  world.enemies = world.enemies.filter(en => en.hp > 0);

  if (world.boss && !world.boss.defeated && Math.abs(world.boss.x - world.player.x) < 700) {
    world.boss.hp -= 5.5 + (state.upgrades.gael_ring || 0) + (world.da && world.da.joined ? 1.5 : 0);
    spawnParticles(world.boss.x + world.boss.w / 2, world.boss.y + 45, '#ec4899', 22);
    if (world.boss.hp <= 0) {
      handleBossDefeated();
    }
  }

  world.floatingTexts.push({
    x: world.player.x - 20,
    y: world.player.y - 26,
    text: '🎥 ¡SHOW PRIVADO DE GAEL + ACEITE DE DERIAN! 🔥',
    color: '#f9a8d4',
    life: 60
  });
}

function handleBossDefeated() {
  if (!world.boss || world.boss.defeated) return;
  world.boss.defeated = true;
  world.boss.hp = 0;
  playSfx('win');
  spawnParticles(world.boss.x + 40, world.boss.y + 50, '#fbbf24', 36);
  world.floatingTexts.push({
    x: world.boss.x - 20,
    y: world.boss.y - 24,
    text: `💥 ¡${world.boss.name} DERROTADO!`,
    color: '#fde047',
    life: 90
  });
}

function spawnParticles(x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    world.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 7.5,
      vy: (Math.random() - 0.7) * 6.5,
      r: 3 + Math.random() * 4.5,
      color,
      life: 24 + Math.random() * 16
    });
  }
}

// ---------------- ACTUALIZACIÓN FÍSICA (60 FPS) ----------------
function updateWorld() {
  if (!state.isPlaying || state.isPausedForDialogue) return;

  world.tick++;
  const p = world.player;
  const cfg = world.levelCfg;

  if (world.specialCooldown > 0) world.specialCooldown--;
  if (world.flashTimer > 0) world.flashTimer--;
  if (p.invuln > 0) p.invuln--;
  if (p.oilBoostTimer > 0) p.oilBoostTimer--;
  if (p.shootAnim > 0) p.shootAnim--;

  const cdLabel = document.getElementById('special-cd-label');
  if (cdLabel) {
    cdLabel.textContent =
      world.specialCooldown > 0 ? `${Math.ceil(world.specialCooldown / 60)}s` : 'LISTO';
  }

  const baseSpeed = 4.9 * getSpeedMultiplier() * (p.oilBoostTimer > 0 ? 1.32 : 1);
  if (keys.left) {
    p.vx = cfg.slippery ? p.vx * 0.86 - baseSpeed * 0.22 : -baseSpeed;
    p.facing = -1;
  } else if (keys.right) {
    p.vx = cfg.slippery ? p.vx * 0.86 + baseSpeed * 0.22 : baseSpeed;
    p.facing = 1;
  } else {
    p.vx *= cfg.slippery ? 0.94 : 0.72;
  }

  p.vx = Math.max(-baseSpeed * 1.35, Math.min(baseSpeed * 1.35, p.vx));
  p.x += p.vx;
  if (p.x < 12) p.x = 12;
  if (p.x > cfg.length - 48) p.x = cfg.length - 48;

  const prevBottom = p.y + p.h;
  p.vy += 0.62;
  p.y += p.vy;
  p.onGround = false;

  for (const plat of world.platforms) {
    if (
      p.x + p.w > plat.x + 8 &&
      p.x < plat.x + plat.w - 8 &&
      prevBottom <= plat.y + 14 &&
      p.y + p.h >= plat.y &&
      p.vy >= 0
    ) {
      p.y = plat.y - p.h;
      p.vy = 0;
      p.onGround = true;
      p.jumpsLeft = 2;
    }
  }

  if (p.y > LOGICAL_H + 90) {
    damagePlayer(1, '¡Caíste! Sandra dice que mires por dónde andas, no por dónde miras.');
    p.x = Math.max(80, p.x - 160);
    p.y = 200;
    p.vy = 0;
  }

  const targetCam = p.x - 250;
  world.cameraX += (targetCam - world.cameraX) * 0.14;
  world.cameraX = Math.max(0, Math.min(cfg.length - LOGICAL_W, world.cameraX));

  for (const b of world.bonesList) {
    if (!b.collected && Math.hypot(p.x + p.w / 2 - b.x, p.y + p.h / 2 - b.y) < 38) {
      b.collected = true;
      state.bones++;
      saveProgress();
      updateHudUI();
      playSfx('bone');
      spawnParticles(b.x, b.y, '#fbbf24', 12);
      world.floatingTexts.push({
        x: b.x - 20,
        y: b.y - 12,
        text: '+1 🦴 ¡Hueso bien duro!',
        color: '#fde047',
        life: 42
      });
    }
  }

  // Aliado DA: se une al tocarlo y luego sigue a J
  if (world.da) {
    const d = world.da;
    if (d.shootFlash > 0) d.shootFlash--;
    if (!d.joined) {
      if (Math.abs(p.x - d.x) < 70 && Math.abs(p.y - d.y) < 90) {
        d.joined = true;
        playSfx('special');
        spawnParticles(d.x + d.w / 2, d.y + 20, '#38bdf8', 18);
        showToast('🤝 ¡DA se une al rescate! Dispara junto a J y vive en Virocasa.');
        world.floatingTexts.push({
          x: d.x - 30,
          y: d.y - 14,
          text: '🤝 DA: "Yo te cubro la espalda, J"',
          color: '#7dd3fc',
          life: 70
        });
      }
    } else {
      d.x += (p.x - p.facing * 84 - d.x) * 0.1;
      d.y += (p.y - d.y) * 0.22;
      d.facing = p.facing;
    }
  }

  for (const oil of world.oilBottles) {
    if (!oil.collected && Math.hypot(p.x + p.w / 2 - oil.x, p.y + p.h / 2 - oil.y) < 40) {
      oil.collected = true;
      p.oilBoostTimer = 300;
      if (p.hp < p.maxHp) p.hp++;
      updateHudUI();
      playSfx('special');
      spawnParticles(oil.x, oil.y, '#eab308', 16);
      world.floatingTexts.push({
        x: oil.x - 30,
        y: oil.y - 16,
        text: '🧴 ¡ACEITE DE DERIAN! Todo resbala rico (+Vida y Turbo)',
        color: '#fef08a',
        life: 55
      });
    }
  }

  for (let i = world.projectiles.length - 1; i >= 0; i--) {
    const proj = world.projectiles[i];
    proj.x += proj.vx;
    proj.y += proj.vy;

    if (proj.x < world.cameraX - 60 || proj.x > world.cameraX + LOGICAL_W + 60) {
      world.projectiles.splice(i, 1);
      continue;
    }

    let hit = false;
    for (let j = world.enemies.length - 1; j >= 0; j--) {
      const en = world.enemies[j];
      if (
        proj.x > en.x &&
        proj.x < en.x + en.w &&
        proj.y > en.y &&
        proj.y < en.y + en.h
      ) {
        en.hp -= proj.damage;
        spawnParticles(proj.x, proj.y, proj.color, 7);
        hit = true;
        if (en.hp <= 0) {
          spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#f97316', 16);
          world.enemies.splice(j, 1);
        }
        break;
      }
    }

    if (!hit && world.boss && !world.boss.defeated) {
      const b = world.boss;
      if (proj.x > b.x && proj.x < b.x + b.w && proj.y > b.y && proj.y < b.y + b.h) {
        b.hp -= proj.damage;
        spawnParticles(proj.x, proj.y, '#ef4444', 9);
        hit = true;
        if (b.hp <= 0) {
          handleBossDefeated();
        }
      }
    }

    if (hit) {
      world.projectiles.splice(i, 1);
    }
  }

  for (const en of world.enemies) {
    en.x += en.vx;
    if (en.x < en.minX || en.x > en.maxX) en.vx *= -1;

    en.shootTimer--;
    if (en.shootTimer <= 0 && Math.abs(en.x - p.x) < 430) {
      en.shootTimer = 115;
      const dir = p.x < en.x ? -1 : 1;
      world.enemyProjectiles.push({
        x: en.x + en.w / 2,
        y: en.y + 24,
        vx: dir * 5.2,
        vy: 0,
        r: 7,
        color: en.type === 'usher' ? '#fde047' : '#ef4444'
      });
    }

    if (
      p.invuln <= 0 &&
      p.x + p.w > en.x + 6 &&
      p.x < en.x + en.w - 6 &&
      p.y + p.h > en.y + 6 &&
      p.y < en.y + en.h - 6
    ) {
      if (p.vy > 1 && prevBottom <= en.y + 22) {
        en.hp = 0;
        p.vy = -10.5;
        playSfx('jump');
        spawnParticles(en.x + 22, en.y + 24, '#fbbf24', 14);
      } else {
        damagePlayer(1);
      }
    }
  }
  world.enemies = world.enemies.filter(en => en.hp > 0);

  const bossHud = document.getElementById('boss-hud');
  if (world.boss && !world.boss.defeated && p.x > world.goalX - 580) {
    bossHud.classList.remove('hidden');
    const b = world.boss;
    document.getElementById('boss-name').textContent = `😈 JEFE: ${b.name}`;
    const pct = Math.max(0, Math.round((b.hp / b.maxHp) * 100));
    document.getElementById('boss-hp-text').textContent = `${pct}%`;
    document.getElementById('boss-bar-fill').style.width = `${pct}%`;

    b.x += b.vx;
    if (b.x < b.minX || b.x > b.maxX) b.vx *= -1;

    b.jumpTimer--;
    if (b.jumpTimer <= 0) {
      b.vy = -10.5;
      b.jumpTimer = 95;
    }
    b.vy += 0.55;
    b.y += b.vy;
    if (b.y > 315) {
      b.y = 315;
      b.vy = 0;
    }

    b.attackTimer--;
    if (b.attackTimer <= 0) {
      b.attackTimer = 58;
      const dir = p.x < b.x ? -1 : 1;
      world.enemyProjectiles.push({
        x: b.x + b.w / 2,
        y: b.y + 42,
        vx: dir * 6.8,
        vy: -1.1,
        r: 10,
        color: b.id.includes('javier') ? '#fde047' : '#ef4444'
      });
      if (b.id === 'jair_final') {
        world.enemyProjectiles.push({
          x: b.x + b.w / 2,
          y: b.y + 72,
          vx: dir * 7.6,
          vy: 0.4,
          r: 9,
          color: '#ec4899'
        });
      }
    }

    if (
      p.invuln <= 0 &&
      p.x + p.w > b.x + 10 &&
      p.x < b.x + b.w - 10 &&
      p.y + p.h > b.y + 10 &&
      p.y < b.y + b.h - 10
    ) {
      damagePlayer(1);
    }
  } else {
    bossHud.classList.add('hidden');
  }

  for (let i = world.enemyProjectiles.length - 1; i >= 0; i--) {
    const ep = world.enemyProjectiles[i];
    ep.x += ep.vx;
    ep.y += ep.vy;
    if (
      p.invuln <= 0 &&
      Math.hypot(p.x + p.w / 2 - ep.x, p.y + p.h / 2 - ep.y) < ep.r + 18
    ) {
      damagePlayer(1);
      world.enemyProjectiles.splice(i, 1);
      continue;
    }
    if (ep.x < world.cameraX - 80 || ep.x > world.cameraX + LOGICAL_W + 80) {
      world.enemyProjectiles.splice(i, 1);
    }
  }

  for (let i = world.particles.length - 1; i >= 0; i--) {
    const pt = world.particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life--;
    if (pt.life <= 0) world.particles.splice(i, 1);
  }

  for (let i = world.floatingTexts.length - 1; i >= 0; i--) {
    const ft = world.floatingTexts[i];
    ft.y -= 0.8;
    ft.life--;
    if (ft.life <= 0) world.floatingTexts.splice(i, 1);
  }

  // Detección de meta / portal o jaula de Jairo
  const distGoalX = Math.abs((p.x + p.w / 2) - world.goalX);
  if (distGoalX < 65) {
    if (world.boss && !world.boss.defeated) {
      if (world.tick % 45 === 0) {
        world.floatingTexts.push({
          x: world.goalX - 60,
          y: 290,
          text: '🔒 ¡Primero termina con la jefa, no te apures!',
          color: '#fca5a5',
          life: 30
        });
      }
    } else {
      completeCurrentLevel();
    }
  }
}

function damagePlayer(amount, customMsg = null) {
  const p = world.player;
  if (p.invuln > 0) return;
  p.hp -= amount;
  p.invuln = 65;
  playSfx('hit');
  spawnParticles(p.x + p.w / 2, p.y + p.h / 2, '#ef4444', 14);
  updateHudUI();

  if (customMsg) showToast(customMsg);

  if (p.hp <= 0) {
    state.isPlaying = false;
    openResultModal(false);
  }
}

// ============================================================================
// RENDERIZADO GRÁFICO HD CON SPRITES VECTORIALES Y PARALAJE MULTICAPA
// ============================================================================
function drawSpriteCharacter(spriteId, x, y, w, h, facing = 1, isMoving = false, bounceSpeed = 0.22) {
  const img = SPRITE_CACHE[spriteId];
  ctx.save();

  // Sombra elíptica suave bajo los pies
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h - 2, w * 0.42, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  const walkCycle = isMoving ? Math.sin(world.tick * bounceSpeed) : 0;
  const bobY = isMoving ? Math.abs(walkCycle) * -5 : Math.sin(world.tick * 0.06) * 2;

  // Piernas animadas estilo arcade
  ctx.strokeStyle = spriteId === 'j' ? '#1e293b' : spriteId === 'javier' ? '#1e3a8a' : '#0f172a';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';

  const hipX = x + w / 2;
  const hipY = y + h - 16 + bobY;
  const legSpread = walkCycle * 10;

  ctx.beginPath();
  ctx.moveTo(hipX - 5, hipY);
  ctx.lineTo(hipX - 6 - legSpread, y + h - 3);
  ctx.moveTo(hipX + 5, hipY);
  ctx.lineTo(hipX + 6 + legSpread, y + h - 3);
  ctx.stroke();

  // Botas / tenis
  ctx.fillStyle = spriteId === 'j' ? '#f59e0b' : '#ef4444';
  ctx.fillRect(hipX - 11 - legSpread, y + h - 6, 10, 5);
  ctx.fillRect(hipX + 1 + legSpread, y + h - 6, 10, 5);

  // Dibujar el Sprite Vectorial HD con volteo horizontal según dirección
  ctx.translate(x + w / 2, y + h / 2 + bobY - 4);
  ctx.scale(facing, 1);
  if (isMoving) {
    ctx.rotate(walkCycle * 0.05);
  }

  if (img && img.complete) {
    ctx.drawImage(img, -w * 0.68, -h * 0.62, w * 1.36, h * 1.22);
  } else {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-w / 2, -h / 2, w, h);
  }

  ctx.restore();
}

function drawParallaxBackground(cfg) {
  // 1. Cielo nocturno profundo con gradiente rico
  const skyGrad = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
  if (cfg.theme === 'cinema') {
    skyGrad.addColorStop(0, '#1a0514');
    skyGrad.addColorStop(0.5, '#310a24');
    skyGrad.addColorStop(1, '#090611');
  } else if (cfg.theme.includes('sanjorge')) {
    skyGrad.addColorStop(0, '#0d0626');
    skyGrad.addColorStop(0.55, '#1e1145');
    skyGrad.addColorStop(1, '#08142c');
  } else if (cfg.theme === 'manzanareno') {
    skyGrad.addColorStop(0, '#2b1205');
    skyGrad.addColorStop(0.5, '#5a2a0b');
    skyGrad.addColorStop(1, '#140a04');
  } else if (cfg.theme === 'derian_spa') {
    skyGrad.addColorStop(0, '#271504');
    skyGrad.addColorStop(0.55, '#422306');
    skyGrad.addColorStop(1, '#120b04');
  } else if (cfg.theme.includes('virocasa')) {
    skyGrad.addColorStop(0, '#24050e');
    skyGrad.addColorStop(0.5, '#3b0918');
    skyGrad.addColorStop(1, '#090d1a');
  } else {
    skyGrad.addColorStop(0, '#070c1e');
    skyGrad.addColorStop(0.55, '#111e3d');
    skyGrad.addColorStop(1, '#060a14');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  // Luna llena brillante y estrellas
  ctx.save();
  ctx.fillStyle = 'rgba(254, 240, 138, 0.14)';
  ctx.beginPath();
  ctx.arc(LOGICAL_W - 140, 82, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(LOGICAL_W - 140, 82, 34, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 24; i++) {
    const sx = ((i * 97) % LOGICAL_W);
    const sy = ((i * 43) % 210);
    const alpha = 0.35 + Math.sin(world.tick * 0.04 + i) * 0.3;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(sx, sy, 2.2, 2.2);
  }
  ctx.restore();

  // 2. Montañas lejanas de Manizales y Cables Aéreos (Paralaje 0.15x)
  ctx.save();
  const farOffset = -(world.cameraX * 0.15) % 960;
  for (let base = farOffset - 960; base < LOGICAL_W + 960; base += 960) {
    ctx.fillStyle = 'rgba(8, 12, 26, 0.85)';
    ctx.beginPath();
    ctx.moveTo(base, LOGICAL_H);
    ctx.lineTo(base, 310);
    ctx.quadraticCurveTo(base + 240, 210, base + 480, 295);
    ctx.quadraticCurveTo(base + 720, 190, base + 960, 310);
    ctx.lineTo(base + 960, LOGICAL_H);
    ctx.closePath();
    ctx.fill();

    // Línea del Cable Aéreo de Manizales / San Jorge
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(base, 170);
    ctx.lineTo(base + 960, 130);
    ctx.stroke();

    // Cabina del cable animada
    const cabinX = base + ((world.tick * 1.2) % 960);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(cabinX, 152, 24, 18);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(cabinX + 4, 155, 16, 8);
  }
  ctx.restore();

  // 3. Edificios Temáticos en Plano Medio (Paralaje 0.4x)
  ctx.save();
  const midOffset = -(world.cameraX * 0.4) % 440;
  for (let bx = midOffset - 440; bx < LOGICAL_W + 440; bx += 440) {
    // Silueta de edificios
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(bx + 20, 165, 180, 280);
    ctx.fillRect(bx + 220, 195, 190, 250);

    // Bordes de neón según el nivel
    ctx.strokeStyle =
      cfg.theme === 'cinema'
        ? '#3b82f6'
        : cfg.theme.includes('gael')
        ? '#ec4899'
        : cfg.theme === 'derian_spa' || cfg.theme === 'manzanareno'
        ? '#eab308'
        : '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx + 20, 165, 180, 280);
    ctx.strokeRect(bx + 220, 195, 190, 250);

    // Ventanas iluminadas
    ctx.fillStyle = 'rgba(253, 224, 71, 0.22)';
    for (let wy = 190; wy < 380; wy += 42) {
      ctx.fillRect(bx + 42, wy, 28, 22);
      ctx.fillRect(bx + 92, wy, 28, 22);
      ctx.fillRect(bx + 142, wy, 28, 22);
    }

    // Letrero luminoso temático en el edificio
    ctx.fillStyle = 'rgba(9, 13, 24, 0.92)';
    ctx.fillRect(bx + 235, 215, 160, 54);
    ctx.strokeStyle = '#fde047';
    ctx.strokeRect(bx + 235, 215, 160, 54);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 12px Segoe UI, sans-serif';
    let titleSign = '🏠 VIROCENTRO';
    let subSign = 'CASA DE SANDRA (CHISMOSA)';
    if (cfg.theme === 'cinema') {
      titleSign = '🍿 CINE VIP: SALA 4';
      subSign = 'ÚLTIMA FILA: JAVIER & JAIRO 💋';
    } else if (cfg.theme === 'sanjorge') {
      titleSign = '⛰️ BARRIO SAN JORGE';
      subSign = 'CUESTAS QUE DAN CALOR';
    } else if (cfg.theme === 'sanjorge_gael') {
      titleSign = '🎥 GAEL STREAM VIP';
      subSign = 'SHOW PRIVADO • +10K TOKENS';
    } else if (cfg.theme === 'manzanareno') {
      titleSign = '🍽️ EL MANZANAREÑO';
      subSign = 'BANDEJA PAISA BIEN PICANTE';
    } else if (cfg.theme === 'derian_spa') {
      titleSign = '🧴 SPA DE DERIAN';
      subSign = 'MASAJES "FELICES" EN ACEITE';
    } else if (cfg.theme.includes('virocasa')) {
      titleSign = '🚨 FORTALEZA VIROCASA';
      subSign = 'ALCOBA DE LA REINA JAIR';
    }
    ctx.fillText(titleSign, bx + 246, 238);
    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 10px Segoe UI, sans-serif';
    ctx.fillText(subSign, bx + 246, 256);
  }
  ctx.restore();
}

function drawPlatform3D(plat) {
  const isOil = plat.type.includes('oil');
  ctx.save();

  // Sombra inferior
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(plat.x + 4, plat.y + 6, plat.w, plat.h);

  // Cuerpo de la plataforma con gradiente 3D
  const pGrad = ctx.createLinearGradient(0, plat.y, 0, plat.y + plat.h);
  if (isOil) {
    pGrad.addColorStop(0, '#713f12');
    pGrad.addColorStop(1, '#271504');
  } else {
    pGrad.addColorStop(0, '#334155');
    pGrad.addColorStop(1, '#0f172a');
  }
  ctx.fillStyle = pGrad;
  ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

  // Borde metálico / arquitectónico
  ctx.strokeStyle = isOil ? '#eab308' : '#475569';
  ctx.lineWidth = 2;
  ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);

  // Superficie superior (Aceite brillante de Derian con gotas o borde neón)
  if (isOil) {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(plat.x, plat.y, plat.w, 8);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(plat.x + 6, plat.y + 1, plat.w - 12, 3);
    // Gotas de aceite escurriendo
    for (let ox = plat.x + 22; ox < plat.x + plat.w - 18; ox += 38) {
      const drip = 6 + Math.sin(world.tick * 0.08 + ox) * 3;
      ctx.beginPath();
      ctx.arc(ox, plat.y + 8 + drip, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#eab308';
      ctx.fill();
    }
  } else {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(plat.x, plat.y, plat.w, 6);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(plat.x + 4, plat.y + 1, plat.w - 8, 2);
  }

  ctx.restore();
}

function p0Facing(d) {
  return world.player && world.player.x < d.x ? -1 : 1;
}

function renderWorld() {
  ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
  const cfg = world.levelCfg;
  if (!cfg) return;

  drawParallaxBackground(cfg);

  if (world.flashTimer > 0) {
    ctx.fillStyle = `rgba(236, 72, 153, ${world.flashTimer / 45})`;
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
  }

  ctx.save();
  ctx.translate(-world.cameraX, 0);

  // 1. Plataformas 3D
  for (const plat of world.platforms) {
    drawPlatform3D(plat);
  }

  // 2. Huesos Dorados de Jairo (Dibujados vectorialmente con brillo)
  for (const b of world.bonesList) {
    if (b.collected) continue;
    const floatY = b.y + Math.sin(world.tick * 0.09 + b.x) * 5;
    ctx.save();
    ctx.translate(b.x, floatY);
    ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.fillRect(-9, -4, 18, 8);
    ctx.beginPath();
    ctx.arc(-10, -5, 5, 0, Math.PI * 2);
    ctx.arc(-10, 5, 5, 0, Math.PI * 2);
    ctx.arc(10, -5, 5, 0, Math.PI * 2);
    ctx.arc(10, 5, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // 3. Frascos de Aceite de Derian
  for (const oil of world.oilBottles) {
    if (oil.collected) continue;
    const floatY = oil.y + Math.sin(world.tick * 0.08 + oil.x) * 5;
    ctx.save();
    ctx.translate(oil.x, floatY);
    ctx.fillStyle = 'rgba(234, 179, 8, 0.28)';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    if (SPRITE_CACHE.derian && SPRITE_CACHE.derian.complete) {
      ctx.drawImage(SPRITE_CACHE.derian, -22, -24, 44, 48);
    }
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('🧴 ACEITE (resbala rico)', -22, 30);
    ctx.restore();
  }

  // 4. Meta del Nivel o Jaula Dorada con el Sprite HD de Jairo
  if (cfg.level === 10) {
    ctx.save();
    const cageX = world.goalX - 36;
    const cageY = 335;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.16)';
    ctx.fillRect(cageX, cageY, 80, 90);
    if (SPRITE_CACHE.jairo && SPRITE_CACHE.jairo.complete) {
      const jairoBounce = Math.abs(Math.sin(world.tick * 0.12)) * -8;
      ctx.drawImage(SPRITE_CACHE.jairo, cageX + 6, cageY + 10 + jairoBounce, 68, 76);
    }
    // Barrotes dorados de la jaula
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(cageX, cageY, 80, 90);
    for (let bx = cageX + 16; bx < cageX + 80; bx += 16) {
      ctx.beginPath();
      ctx.moveTo(bx, cageY);
      ctx.lineTo(bx, cageY + 90);
      ctx.stroke();
    }
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('🐶 ¡SÁCALO DE LA JAULA!', cageX - 24, cageY - 10);
    ctx.restore();
  } else {
    ctx.save();
    const portalX = world.goalX;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.24)';
    ctx.beginPath();
    ctx.arc(portalX, 380, 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('META ▸', portalX - 22, 332);
    ctx.restore();
  }

  // 5. Enemigos con Sprites Vectoriales HD
  for (const en of world.enemies) {
    const facing = en.vx >= 0 ? 1 : -1;
    drawSpriteCharacter(en.type, en.x, en.y, en.w, en.h, facing, true, 0.18);

    // Barra de vida sobre el enemigo
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(en.x + 4, en.y - 10, en.w - 8, 5);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(en.x + 4, en.y - 10, ((en.w - 8) * Math.max(0, en.hp)) / en.maxHp, 5);
  }

  // 6. Jefe del Nivel (Javier / Mega-Dron / Jair) con Sprite HD
  if (world.boss && !world.boss.defeated) {
    const b = world.boss;
    const facing = world.player.x < b.x ? -1 : 1;

    // Aura de jefe
    ctx.save();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.beginPath();
    ctx.arc(b.x + b.w / 2, b.y + b.h / 2, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawSpriteCharacter(b.spriteId, b.x, b.y, b.w, b.h, facing, true, 0.16);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(b.name, b.x - 18, b.y - 12);
  }

  // 6.5 Aliado DA (mismo look que J, otra ropa): esperando en El Manzanareño o siguiendo a J
  if (world.da) {
    const d = world.da;
    const dFacing = d.joined ? (d.facing || 1) : (p0Facing(d));
    const moving = d.joined && Math.abs(world.player.vx) > 0.4;
    drawSpriteCharacter('da', d.x, d.y, d.w, d.h, dFacing, moving, 0.25);
    ctx.save();
    ctx.fillStyle = '#7dd3fc';
    ctx.font = 'bold 12px Segoe UI, sans-serif';
    ctx.fillText(d.joined ? '🤝 DA' : '🤝 DA (¡acércate!)', d.x - (d.joined ? 2 : 32), d.y - 10 + (d.joined ? 0 : Math.sin(world.tick * 0.12) * 4));
    if (d.shootFlash > 0) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.beginPath();
      ctx.arc(d.x + d.w / 2 + dFacing * 30, d.y + 30, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 7. Jugador J
  const p = world.player;
  if (p.invuln % 6 < 4) {
    if (p.oilBoostTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.26)';
      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const isMoving = Math.abs(p.vx) > 0.4 && p.onGround;
    drawSpriteCharacter('j', p.x, p.y, p.w, p.h, p.facing, isMoving, 0.25);
  }

  // 8. Aliado GAEL flotando junto a J con su Sprite HD y Aro de Luz LED
  if (p.hasGael) {
    const gx = p.x - p.facing * 48;
    const gy = p.y - 22 + Math.sin(world.tick * 0.09) * 7;
    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(gx + 22, gy + 24, 26, 0, Math.PI * 2);
    ctx.stroke();
    if (SPRITE_CACHE.gael && SPRITE_CACHE.gael.complete) {
      ctx.drawImage(SPRITE_CACHE.gael, gx - 2, gy - 2, 48, 54);
    }
    ctx.restore();
  }

  // 9. Proyectiles con estela luminosa
  for (const proj of world.projectiles) {
    ctx.save();
    ctx.shadowColor = proj.glow || proj.color;
    ctx.shadowBlur = 12;
    ctx.fillStyle = proj.color;
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, proj.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, proj.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const ep of world.enemyProjectiles) {
    ctx.save();
    ctx.shadowColor = ep.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = ep.color;
    ctx.beginPath();
    ctx.arc(ep.x, ep.y, ep.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 10. Partículas y textos flotantes
  for (const pt of world.particles) {
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const ft of world.floatingTexts) {
    ctx.fillStyle = ft.color;
    ctx.font = 'bold 14px Segoe UI, sans-serif';
    ctx.fillText(ft.text, ft.x, ft.y);
  }

  ctx.restore();
}

function gameLoop() {
  updateWorld();
  renderWorld();
  requestAnimationFrame(gameLoop);
}

// ---------------- FLUJO DE NIVELES Y DIÁLOGOS ----------------
function startLevel(levelNum) {
  state.currentLevelNum = levelNum;
  buildLevelWorld(levelNum);

  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('play-screen').classList.remove('hidden');
  closeModal('modal-result');
  applyLayout();

  state.isPlaying = true;
  const cfg = world.levelCfg;

  if (cfg.introDialogue && cfg.introDialogue.length > 0) {
    startDialogueSequence(cfg.introDialogue, () => {
      state.isPausedForDialogue = false;
    });
  }
}

function completeCurrentLevel() {
  state.isPlaying = false;
  playSfx('win');

  const lvl = state.currentLevelNum;
  if (!state.completedLevels.includes(lvl)) {
    state.completedLevels.push(lvl);
  }
  if (lvl < 10 && state.maxUnlockedLevel < lvl + 1) {
    state.maxUnlockedLevel = lvl + 1;
  }
  saveProgress();
  renderMenuLevels();

  const cfg = world.levelCfg;
  if (cfg.outroDialogue && cfg.outroDialogue.length > 0) {
    startDialogueSequence(cfg.outroDialogue, () => {
      openResultModal(true);
    });
  } else {
    openResultModal(true);
  }
}

function startDialogueSequence(lines, onComplete) {
  state.isPausedForDialogue = true;
  state.dialogueQueue = [...lines];
  state.onDialogueDone = onComplete;
  document.getElementById('dialogue-overlay').classList.remove('hidden');
  showNextDialogueLine();
}

function showNextDialogueLine() {
  if (state.dialogueQueue.length === 0) {
    document.getElementById('dialogue-overlay').classList.add('hidden');
    state.isPausedForDialogue = false;
    if (state.onDialogueDone) state.onDialogueDone();
    return;
  }

  const line = state.dialogueQueue.shift();
  document.getElementById('dlg-portrait').innerHTML = getRescueCharSVG(line.speaker);
  document.getElementById('dlg-speaker').textContent = line.name;
  document.getElementById('dlg-text').textContent = line.text;
  playSfx('bone');
}

function openResultModal(isVictory) {
  const modal = document.getElementById('modal-result');
  const art = document.getElementById('result-art');
  const title = document.getElementById('result-title');
  const desc = document.getElementById('result-desc');
  const nextBtn = document.getElementById('btn-result-next');

  const lvl = state.currentLevelNum;
  if (isVictory) {
    if (lvl === 10) {
      art.innerHTML = getRescueCharSVG('jairo');
      title.textContent = '🏆 ¡JAIRO ESTÁ LIBRE (Y BIEN ACEITADO)!';
      desc.textContent =
        '¡Completaste los 10 niveles! Derrotaste a Jair y a Javier, Gael hizo su show, Derian dejó todo resbaloso y Jairo volvió a Virocentro con la colita en alto. Sandra todavía no se cree la versión oficial.';
      nextBtn.classList.add('hidden');
      playSfx('bark');
    } else {
      art.innerHTML = getRescueCharSVG(lvl >= 5 ? 'gael' : 'j');
      title.textContent = `✅ ¡NIVEL ${lvl} SUPERADO!`;
      desc.textContent = `Qué bien lo hiciste en ${world.levelCfg.location}. El Nivel ${lvl + 1} te espera, y viene más caliente.`;
      nextBtn.classList.remove('hidden');
    }
  } else {
    art.innerHTML = getRescueCharSVG('sandra');
    title.textContent = '💥 ¡SANDRA TE PILLÓ EN ALGO RARO!';
    desc.textContent =
      'Te quedaste sin corazones y sin dignidad. Compra mejoras con tus huesos o vuelve a intentarlo, campeón.';
    nextBtn.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

// ---------------- INTERFAZ DEL MENÚ, PERSONAJES Y TIENDA ----------------
function updateHudUI() {
  const p = world.player;
  const heartsEl = document.getElementById('hud-hearts');
  if (heartsEl && p) {
    heartsEl.textContent = '❤️'.repeat(Math.max(0, p.hp)) + '🖤'.repeat(Math.max(0, p.maxHp - p.hp));
  }
  const bonesEl = document.getElementById('hud-bones');
  if (bonesEl) bonesEl.textContent = state.bones;

  const badgeEl = document.getElementById('hud-level-badge');
  if (badgeEl && world.levelCfg) {
    badgeEl.textContent = `📍 NIVEL ${world.levelCfg.level}/10 • ${world.levelCfg.location.toUpperCase()}`;
  }
}

function renderMenuLevels() {
  const grid = document.getElementById('levels-grid');
  if (!grid) return;
  grid.innerHTML = '';

  RESCUE_LEVELS.forEach(lvl => {
    const unlocked = lvl.level <= state.maxUnlockedLevel;
    const completed = state.completedLevels.includes(lvl.level);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `level-card ${unlocked ? '' : 'locked'} ${lvl.boss ? 'boss-level' : ''}`;

    const statusIcon = completed ? '✅' : unlocked ? '🔓' : '🔒';
    const bossTag = lvl.boss ? ' • 😈 JEFE' : lvl.da ? ' • 🤝 DA' : lvl.ally ? ' • 🎥 GAEL' : '';

    card.innerHTML = `
      <div class="lvl-top">
        <span>NIVEL ${lvl.level}${bossTag}</span>
        <span>${statusIcon}</span>
      </div>
      <div class="lvl-name">${lvl.title}</div>
      <div class="lvl-loc">${lvl.location}</div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => startLevel(lvl.level));
    }
    grid.appendChild(card);
  });

  const progEl = document.getElementById('progress-summary');
  if (progEl) {
    progEl.textContent = `Desbloqueado: Nivel ${state.maxUnlockedLevel}/10`;
  }

  const subEl = document.getElementById('btn-play-sub');
  if (subEl) {
    const targetCfg = RESCUE_LEVELS.find(l => l.level === state.maxUnlockedLevel) || RESCUE_LEVELS[0];
    subEl.textContent = `Continuar en Nivel ${targetCfg.level}: ${targetCfg.location} ▸`;
  }
}

function renderCastStripAndModal() {
  const strip = document.getElementById('cast-strip');
  const modalGrid = document.getElementById('chars-grid');
  if (!strip || !modalGrid) return;

  strip.innerHTML = '';
  modalGrid.innerHTML = '';

  Object.values(RESCUE_CHARACTERS).forEach(ch => {
    const pill = document.createElement('div');
    pill.className = 'cast-pill';
    pill.innerHTML = `
      <div class="cast-avatar">${getRescueCharSVG(ch.id)}</div>
      <div class="cast-info">
        <strong>${ch.name}</strong>
        <small>${ch.badge}</small>
      </div>
    `;
    pill.addEventListener('click', () => openModal('modal-chars'));
    strip.appendChild(pill);

    const card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML = `
      <div class="char-card-top">
        <div class="char-card-svg">${getRescueCharSVG(ch.id)}</div>
        <div>
          <strong style="color:${ch.color}; font-size:1.05rem;">${ch.name}</strong>
          <div style="font-size:0.76rem; color:#fde047; font-weight:800;">${ch.role}</div>
        </div>
      </div>
      <p>${ch.bio}</p>
    `;
    modalGrid.appendChild(card);
  });
}

function renderShopModal() {
  const countEl = document.getElementById('shop-bones-count');
  if (countEl) countEl.textContent = state.bones;

  const grid = document.getElementById('shop-grid');
  if (!grid) return;
  grid.innerHTML = '';

  RESCUE_UPGRADES.forEach(up => {
    const currentLv = state.upgrades[up.id] || 0;
    const cost = up.cost + currentLv * 3;
    const item = document.createElement('div');
    item.className = 'shop-item';
    item.innerHTML = `
      <div>
        <div style="font-size:1.5rem;">${up.icon}</div>
        <strong style="color:#fde047; font-size:0.95rem;">${up.name} (Nv. ${currentLv})</strong>
        <p style="font-size:0.8rem; color:#cbd5e1; margin-top:4px;">${up.desc}</p>
      </div>
      <button type="button" class="btn-play-main" style="padding:9px 12px; font-size:0.84rem;">
        Comprar por 🦴 ${cost} Huesos
      </button>
    `;

    item.querySelector('button').addEventListener('click', () => {
      if (state.bones < cost) {
        showToast('🦴 Te faltan huesos, y no de los que piensas. Sigue recolectando.');
        return;
      }
      state.bones -= cost;
      state.upgrades[up.id] = currentLv + 1;
      saveProgress();
      playSfx('special');
      updateHudUI();
      renderShopModal();
      showToast(`✨ ¡Mejoraste ${up.name}!`);
    });

    grid.appendChild(item);
  });
}

function openModal(id) {
  if (id === 'modal-shop') renderShopModal();
  document.getElementById(id)?.classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

// ---------------- CONTROLES TÁCTILES MULTI-TOUCH Y RESPONSIVE ----------------
function setupResponsiveControls() {
  const bindHold = (id, keyName) => {
    const el = document.getElementById(id);
    if (!el) return;

    const activate = (e) => {
      e.preventDefault();
      keys[keyName] = true;
      el.classList.add('ctrl-active');
    };
    const deactivate = (e) => {
      e.preventDefault();
      keys[keyName] = false;
      el.classList.remove('ctrl-active');
    };

    el.addEventListener('touchstart', activate, { passive: false });
    el.addEventListener('touchend', deactivate, { passive: false });
    el.addEventListener('touchcancel', deactivate, { passive: false });
    el.addEventListener('mousedown', activate);
    el.addEventListener('mouseup', deactivate);
    el.addEventListener('mouseleave', deactivate);
  };

  bindHold('ctrl-left', 'left');
  bindHold('ctrl-right', 'right');

  const bindTap = (id, actionFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        el.classList.add('ctrl-active');
        actionFn();
      },
      { passive: false }
    );
    el.addEventListener('touchend', () => el.classList.remove('ctrl-active'));
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      actionFn();
    });
  };

  bindTap('ctrl-jump', triggerJump);
  bindTap('ctrl-shoot', triggerShoot);
  bindTap('ctrl-special', triggerSpecialPower);
}

// ---------------- INICIALIZACIÓN ----------------
document.addEventListener('DOMContentLoaded', () => {
  preloadSprites();
  applyLayout();
  renderMenuLevels();
  renderCastStripAndModal();
  buildLevelWorld(state.maxUnlockedLevel);
  setupResponsiveControls();
  requestAnimationFrame(gameLoop);

  document.getElementById('btn-play-continue').addEventListener('click', () => {
    startLevel(state.maxUnlockedLevel);
  });

  document.getElementById('btn-home-menu').addEventListener('click', () => {
    state.isPlaying = false;
    document.getElementById('play-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
    renderMenuLevels();
  });

  document.getElementById('btn-unlock-all').addEventListener('click', () => {
    state.maxUnlockedLevel = 10;
    saveProgress();
    renderMenuLevels();
    playSfx('win');
    showToast('🔓 ¡Destapaste los 10 niveles! Ya puedes verlo todo, pillín.');
  });

  document.getElementById('btn-open-chars').addEventListener('click', () => openModal('modal-chars'));
  document.getElementById('btn-menu-chars').addEventListener('click', () => openModal('modal-chars'));
  document.getElementById('btn-open-shop').addEventListener('click', () => openModal('modal-shop'));
  document.getElementById('btn-menu-shop').addEventListener('click', () => openModal('modal-shop'));

  document.getElementById('btn-sound').addEventListener('click', (e) => {
    state.soundEnabled = !state.soundEnabled;
    e.currentTarget.textContent = state.soundEnabled ? '🔊' : '🔇';
  });

  document.getElementById('btn-next-dlg').addEventListener('click', showNextDialogueLine);
  document.getElementById('btn-skip-dlg').addEventListener('click', () => {
    state.dialogueQueue = [];
    showNextDialogueLine();
  });

  document.getElementById('btn-result-next').addEventListener('click', () => {
    if (state.currentLevelNum < 10) {
      startLevel(state.currentLevelNum + 1);
    }
  });
  document.getElementById('btn-result-retry').addEventListener('click', () => {
    startLevel(state.currentLevelNum);
  });
  document.getElementById('btn-result-menu').addEventListener('click', () => {
    closeModal('modal-result');
    document.getElementById('play-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
    renderMenuLevels();
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
      if (state.isPausedForDialogue) {
        e.preventDefault();
        showNextDialogueLine();
      } else if (state.isPlaying) {
        e.preventDefault();
        triggerJump();
      }
    }
    if (e.code === 'KeyJ' || e.code === 'KeyZ' || e.code === 'KeyF') triggerShoot();
    if (e.code === 'KeyK' || e.code === 'KeyX' || e.code === 'KeyE') triggerSpecialPower();
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
  });
});
