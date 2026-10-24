// ============================================================================
// JAIRO RESCUEE — MOTOR ARCADE DE 10 NIVELES (PLATAFORMAS, ALIADOS Y JEFES)
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
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.13);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'shoot') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
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

// ---------------- ESTADO DEL MUNDO ARCADE EN EL CANVAS ----------------
const canvas = document.getElementById('rescue-canvas');
const ctx = canvas.getContext('2d');

const keys = {
  left: false,
  right: false
};

let world = {
  levelCfg: null,
  cameraX: 0,
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
  world.projectiles = [];
  world.enemyProjectiles = [];
  world.particles = [];
  world.floatingTexts = [];
  world.specialCooldown = 0;
  world.flashTimer = 0;

  const maxHp = getMaxHearts();
  world.player = {
    x: 90,
    y: 340,
    w: 38,
    h: 54,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: false,
    jumpsLeft: 2,
    hp: maxHp,
    maxHp: maxHp,
    invuln: 0,
    oilBoostTimer: 0,
    hasGael: cfg.ally === 'gael' || levelNum >= 5
  };

  world.platforms = [];
  world.bonesList = [];
  world.oilBottles = [];
  world.enemies = [];

  // Suelo inicial seguro
  world.platforms.push({ x: 0, y: 430, w: 420, h: 70, type: 'ground' });

  let cursorX = 460;
  const endSectionX = cfg.length - 480;
  let stepIndex = 0;

  while (cursorX < endSectionX) {
    const gap = 65 + ((stepIndex * 29) % 55);
    cursorX += gap;

    const platW = 150 + ((stepIndex * 47) % 120);
    const platY = 250 + ((stepIndex * 67) % 165);
    const isSlippery = cfg.slippery || (levelNum >= 6 && stepIndex % 3 === 0);

    world.platforms.push({
      x: cursorX,
      y: platY,
      w: platW,
      h: 22,
      type: isSlippery ? 'oil_plat' : 'plat'
    });

    // Añadir suelo bajo algunas secciones para que sea muy jugable
    if (stepIndex % 2 === 0) {
      world.platforms.push({
        x: cursorX - 30,
        y: 430,
        w: platW + 60,
        h: 70,
        type: cfg.slippery ? 'oil_ground' : 'ground'
      });
    }

    // Hueso dorado coleccionable
    if (stepIndex % 2 === 0) {
      world.bonesList.push({
        x: cursorX + platW * 0.5,
        y: platY - 34,
        r: 13,
        collected: false
      });
    }

    // Frasco de Aceite de Derian (Da turbo y cura 1 corazón)
    if (stepIndex === 3 || stepIndex === 7) {
      world.oilBottles.push({
        x: cursorX + platW * 0.35,
        y: platY - 36,
        collected: false
      });
    }

    // Enemigos patrullando
    const enemyType =
      cfg.theme === 'cinema'
        ? 'usher'
        : stepIndex % 3 === 1
        ? 'drone'
        : 'thug';

    const enemyY = enemyType === 'drone' ? platY - 75 : platY - 46;
    const enemyHp = 2 + Math.floor(levelNum / 3);

    world.enemies.push({
      x: cursorX + platW * 0.5,
      y: enemyY,
      minX: cursorX + 10,
      maxX: cursorX + platW - 36,
      w: 36,
      h: 46,
      vx: (1.4 + levelNum * 0.14) * (stepIndex % 2 === 0 ? 1 : -1),
      hp: enemyHp,
      maxHp: enemyHp,
      type: enemyType,
      shootTimer: 80 + (stepIndex * 25) % 90
    });

    cursorX += platW;
    stepIndex++;
  }

  // Arena final del nivel
  const arenaX = endSectionX + 40;
  const arenaW = 540;
  world.platforms.push({
    x: arenaX,
    y: 430,
    w: arenaW,
    h: 70,
    type: cfg.slippery ? 'oil_ground' : 'ground'
  });

  // Dos plataformas de apoyo en la arena final
  world.platforms.push({ x: arenaX + 70, y: 315, w: 120, h: 18, type: 'plat' });
  world.platforms.push({ x: arenaX + 310, y: 315, w: 120, h: 18, type: 'plat' });

  world.goalX = arenaX + arenaW - 95;

  // Configurar Jefe si el nivel tiene Jefe (Niveles 3, 6, 9, 10)
  if (cfg.boss) {
    world.boss = {
      id: cfg.boss.id,
      name: cfg.boss.name,
      hp: cfg.boss.hp,
      maxHp: cfg.boss.hp,
      color: cfg.boss.color,
      quote: cfg.boss.quote,
      x: arenaX + 340,
      y: 330,
      w: 64,
      h: 96,
      vx: -2.2,
      minX: arenaX + 60,
      maxX: arenaX + arenaW - 110,
      attackTimer: 75,
      jumpTimer: 120,
      vy: 0,
      defeated: false
    };
  } else {
    world.boss = null;
  }

  updateHudUI();
}

// ---------------- CONTROLES Y ACCIONES DE J ----------------
function triggerJump() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  const p = world.player;
  if (p.jumpsLeft > 0) {
    p.vy = -12.6 * (1 + (state.upgrades.derian_oil || 0) * 0.04);
    p.onGround = false;
    p.jumpsLeft--;
    playSfx('jump');
    spawnParticles(p.x + p.w / 2, p.y + p.h, '#fde047', 6);
  }
}

function triggerShoot() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  const p = world.player;
  playSfx('shoot');

  // Disparo principal de J
  world.projectiles.push({
    x: p.facing > 0 ? p.x + p.w : p.x - 14,
    y: p.y + 22,
    vx: p.facing * 11,
    vy: 0,
    r: 7,
    damage: getShotDamage(),
    color: p.oilBoostTimer > 0 ? '#eab308' : '#f59e0b',
    label: '🔥'
  });

  // Si Gael está aliado (Nivel 5+ o desbloqueado), Gael dispara un rayo de Aro LED / Token
  if (p.hasGael) {
    world.projectiles.push({
      x: p.facing > 0 ? p.x + p.w - 6 : p.x - 10,
      y: p.y + 6,
      vx: p.facing * 12.5,
      vy: -0.6,
      r: 6,
      damage: getShotDamage() * 0.75,
      color: '#ec4899',
      label: '💎'
    });
  }
}

function triggerSpecialPower() {
  if (!state.isPlaying || state.isPausedForDialogue) return;
  if (world.specialCooldown > 0) {
    showToast('⏳ Cargando Poder Especial de Gael y Derian...');
    return;
  }

  playSfx('special');
  world.specialCooldown = 360; // 6 segundos a 60fps
  world.flashTimer = 26;
  world.player.oilBoostTimer = 240; // 4 segundos de Aceite Turbo de Derian

  // Onda destructora de Aro de Luz de Gael + Aceite de Derian a todos los enemigos en pantalla
  const camLeft = world.cameraX - 60;
  const camRight = world.cameraX + canvas.width + 60;

  world.enemies.forEach(en => {
    if (en.x >= camLeft && en.x <= camRight) {
      en.hp -= 4 + (state.upgrades.gael_ring || 0);
      spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#ec4899', 12);
    }
  });
  world.enemies = world.enemies.filter(en => en.hp > 0);

  if (world.boss && !world.boss.defeated && Math.abs(world.boss.x - world.player.x) < 650) {
    world.boss.hp -= 5 + (state.upgrades.gael_ring || 0);
    spawnParticles(world.boss.x + world.boss.w / 2, world.boss.y + 40, '#ec4899', 18);
    if (world.boss.hp <= 0) {
      handleBossDefeated();
    }
  }

  world.floatingTexts.push({
    x: world.player.x,
    y: world.player.y - 24,
    text: '🎥 ¡FLASH DE GAEL + ACEITE DE DERIAN! 🧴',
    color: '#f472b6',
    life: 55
  });
}

function handleBossDefeated() {
  if (!world.boss || world.boss.defeated) return;
  world.boss.defeated = true;
  world.boss.hp = 0;
  playSfx('win');
  spawnParticles(world.boss.x + 30, world.boss.y + 40, '#fbbf24', 30);
  world.floatingTexts.push({
    x: world.boss.x,
    y: world.boss.y - 20,
    text: `💥 ¡${world.boss.name} DERROTADO!`,
    color: '#fde047',
    life: 80
  });
}

function spawnParticles(x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    world.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.7) * 6,
      r: 3 + Math.random() * 4,
      color,
      life: 24 + Math.random() * 15
    });
  }
}

// ---------------- ACTUALIZACIÓN FÍSICA (60 FPS) ----------------
function updateWorld() {
  if (!state.isPlaying || state.isPausedForDialogue) return;

  const p = world.player;
  const cfg = world.levelCfg;

  if (world.specialCooldown > 0) world.specialCooldown--;
  if (world.flashTimer > 0) world.flashTimer--;
  if (p.invuln > 0) p.invuln--;
  if (p.oilBoostTimer > 0) p.oilBoostTimer--;

  const cdLabel = document.getElementById('special-cd-label');
  if (cdLabel) {
    cdLabel.textContent =
      world.specialCooldown > 0 ? `${Math.ceil(world.specialCooldown / 60)}s` : 'LISTO';
  }

  // Movimiento horizontal (con efecto resbaloso de aceite de Derian si aplica)
  const baseSpeed = 4.8 * getSpeedMultiplier() * (p.oilBoostTimer > 0 ? 1.32 : 1);
  if (keys.left) {
    p.vx = cfg.slippery ? p.vx * 0.85 - baseSpeed * 0.22 : -baseSpeed;
    p.facing = -1;
  } else if (keys.right) {
    p.vx = cfg.slippery ? p.vx * 0.85 + baseSpeed * 0.22 : baseSpeed;
    p.facing = 1;
  } else {
    p.vx *= cfg.slippery ? 0.94 : 0.72;
  }

  p.vx = Math.max(-baseSpeed * 1.35, Math.min(baseSpeed * 1.35, p.vx));
  p.x += p.vx;
  if (p.x < 10) p.x = 10;
  if (p.x > cfg.length - 40) p.x = cfg.length - 40;

  // Gravedad y salto
  const prevBottom = p.y + p.h;
  p.vy += 0.62;
  p.y += p.vy;
  p.onGround = false;

  // Colisión con plataformas
  for (const plat of world.platforms) {
    if (
      p.x + p.w > plat.x + 6 &&
      p.x < plat.x + plat.w - 6 &&
      prevBottom <= plat.y + 12 &&
      p.y + p.h >= plat.y &&
      p.vy >= 0
    ) {
      p.y = plat.y - p.h;
      p.vy = 0;
      p.onGround = true;
      p.jumpsLeft = 2;
    }
  }

  // Caída al vacío
  if (p.y > canvas.height + 90) {
    damagePlayer(1, '¡Caíste! Ten cuidado con las lomas y el aceite');
    p.x = Math.max(80, p.x - 160);
    p.y = 220;
    p.vy = 0;
  }

  // Cámara sigue a J
  const targetCam = p.x - 240;
  world.cameraX += (targetCam - world.cameraX) * 0.14;
  world.cameraX = Math.max(0, Math.min(cfg.length - canvas.width, world.cameraX));

  // Recoger Huesos Dorados de Jairo
  for (const b of world.bonesList) {
    if (!b.collected && Math.hypot(p.x + p.w / 2 - b.x, p.y + p.h / 2 - b.y) < 34) {
      b.collected = true;
      state.bones++;
      saveProgress();
      updateHudUI();
      playSfx('bone');
      spawnParticles(b.x, b.y, '#fbbf24', 10);
      world.floatingTexts.push({
        x: b.x,
        y: b.y - 10,
        text: '+1 🦴 Hueso de Jairo',
        color: '#fde047',
        life: 40
      });
    }
  }

  // Recoger Frascos de Aceite de Derian
  for (const oil of world.oilBottles) {
    if (!oil.collected && Math.hypot(p.x + p.w / 2 - oil.x, p.y + p.h / 2 - oil.y) < 36) {
      oil.collected = true;
      p.oilBoostTimer = 300;
      if (p.hp < p.maxHp) p.hp++;
      updateHudUI();
      playSfx('special');
      spawnParticles(oil.x, oil.y, '#eab308', 14);
      world.floatingTexts.push({
        x: oil.x,
        y: oil.y - 15,
        text: '🧴 ¡ACEITE DE DERIAN! (+Vida y Turbo)',
        color: '#facc15',
        life: 55
      });
    }
  }

  // Actualizar proyectiles de J y Gael
  for (let i = world.projectiles.length - 1; i >= 0; i--) {
    const proj = world.projectiles[i];
    proj.x += proj.vx;
    proj.y += proj.vy;

    if (proj.x < world.cameraX - 50 || proj.x > world.cameraX + canvas.width + 50) {
      world.projectiles.splice(i, 1);
      continue;
    }

    let hit = false;
    // Impacto contra enemigos
    for (let j = world.enemies.length - 1; j >= 0; j--) {
      const en = world.enemies[j];
      if (
        proj.x > en.x &&
        proj.x < en.x + en.w &&
        proj.y > en.y &&
        proj.y < en.y + en.h
      ) {
        en.hp -= proj.damage;
        spawnParticles(proj.x, proj.y, proj.color, 6);
        hit = true;
        if (en.hp <= 0) {
          spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#f97316', 14);
          world.enemies.splice(j, 1);
        }
        break;
      }
    }

    // Impacto contra Jefe (Javier / Mega-Dron / Jair)
    if (!hit && world.boss && !world.boss.defeated) {
      const b = world.boss;
      if (proj.x > b.x && proj.x < b.x + b.w && proj.y > b.y && proj.y < b.y + b.h) {
        b.hp -= proj.damage;
        spawnParticles(proj.x, proj.y, '#ef4444', 8);
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

  // Actualizar enemigos
  for (const en of world.enemies) {
    en.x += en.vx;
    if (en.x < en.minX || en.x > en.maxX) en.vx *= -1;

    // Disparo enemigo ocasional
    en.shootTimer--;
    if (en.shootTimer <= 0 && Math.abs(en.x - p.x) < 420) {
      en.shootTimer = 110;
      const dir = p.x < en.x ? -1 : 1;
      world.enemyProjectiles.push({
        x: en.x + en.w / 2,
        y: en.y + 20,
        vx: dir * 5.2,
        vy: 0,
        r: 6,
        color: en.type === 'usher' ? '#fde047' : '#ef4444'
      });
    }

    // Colisión con J
    if (
      p.invuln <= 0 &&
      p.x + p.w > en.x + 4 &&
      p.x < en.x + en.w - 4 &&
      p.y + p.h > en.y + 4 &&
      p.y < en.y + en.h - 4
    ) {
      // Si J cae encima del enemigo lo aplasta
      if (p.vy > 1 && prevBottom <= en.y + 18) {
        en.hp = 0;
        p.vy = -10;
        playSfx('jump');
        spawnParticles(en.x + 18, en.y + 20, '#fbbf24', 12);
      } else {
        damagePlayer(1);
      }
    }
  }
  world.enemies = world.enemies.filter(en => en.hp > 0);

  // Actualizar Jefe (Javier o Jair)
  const bossHud = document.getElementById('boss-hud');
  if (world.boss && !world.boss.defeated && p.x > world.goalX - 550) {
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
    if (b.y > 334) {
      b.y = 334;
      b.vy = 0;
    }

    b.attackTimer--;
    if (b.attackTimer <= 0) {
      b.attackTimer = 58;
      const dir = p.x < b.x ? -1 : 1;
      // Javier lanza bombas de crispetas, Jair lanza ondas rojas dobles
      world.enemyProjectiles.push({
        x: b.x + b.w / 2,
        y: b.y + 34,
        vx: dir * 6.8,
        vy: -1.2,
        r: 9,
        color: b.id.includes('javier') ? '#fde047' : '#ef4444'
      });
      if (b.id === 'jair_final') {
        world.enemyProjectiles.push({
          x: b.x + b.w / 2,
          y: b.y + 62,
          vx: dir * 7.6,
          vy: 0.4,
          r: 8,
          color: '#ec4899'
        });
      }
    }

    if (
      p.invuln <= 0 &&
      p.x + p.w > b.x + 6 &&
      p.x < b.x + b.w - 6 &&
      p.y + p.h > b.y + 6 &&
      p.y < b.y + b.h - 6
    ) {
      damagePlayer(1);
    }
  } else {
    bossHud.classList.add('hidden');
  }

  // Proyectiles enemigos
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
    if (ep.x < world.cameraX - 80 || ep.x > world.cameraX + canvas.width + 80) {
      world.enemyProjectiles.splice(i, 1);
    }
  }

  // Partículas y textos flotantes
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

  // Verificar llegada a la meta / jaula de Jairo
  if (Math.abs(p.x - world.goalX) < 48 && p.y > 260) {
    if (world.boss && !world.boss.defeated) {
      world.floatingTexts.push({
        x: world.goalX - 40,
        y: 310,
        text: '🔒 ¡Derrota al Jefe primero!',
        color: '#fca5a5',
        life: 20
      });
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

// ---------------- RENDERIZADO DEL CANVAS ----------------
function renderWorld() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cfg = world.levelCfg;
  if (!cfg) return;

  // Fondo temático según la locación (Virocentro, Cine, San Jorge, Spa de Derian, Virocasa)
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (cfg.theme === 'cinema') {
    grad.addColorStop(0, '#2a0818');
    grad.addColorStop(1, '#090712');
  } else if (cfg.theme.includes('sanjorge')) {
    grad.addColorStop(0, '#1e1035');
    grad.addColorStop(1, '#081226');
  } else if (cfg.theme === 'derian_spa') {
    grad.addColorStop(0, '#362207');
    grad.addColorStop(1, '#0f0c06');
  } else if (cfg.theme.includes('virocasa')) {
    grad.addColorStop(0, '#2b0912');
    grad.addColorStop(1, '#090d1a');
  } else {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#060913');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Flash del Aro de Luz de Gael cuando usa el poder especial
  if (world.flashTimer > 0) {
    ctx.fillStyle = `rgba(236, 72, 153, ${world.flashTimer / 45})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Carteles decorativos de fondo en paralaje
  ctx.save();
  const bgOffset = -(world.cameraX * 0.35) % 480;
  for (let x = bgOffset; x < canvas.width + 480; x += 480) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(x + 40, 90, 220, 95);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.22)';
    ctx.strokeRect(x + 40, 90, 220, 95);

    ctx.fillStyle = 'rgba(253, 224, 71, 0.55)';
    ctx.font = 'bold 14px Segoe UI, sans-serif';
    let signText = '📍 VIROCENTRO';
    if (cfg.theme === 'cinema') signText = '🍿 CINE VIP: J & JAVIER';
    else if (cfg.theme === 'sanjorge') signText = '⛰️ LOMAS DE SAN JORGE';
    else if (cfg.theme === 'sanjorge_gael') signText = '🎥 GAEL WEBCAM STUDIO • SAN JORGE';
    else if (cfg.theme === 'derian_spa') signText = '🧴 MASAJES EN ACEITE DERIAN';
    else if (cfg.theme.includes('virocasa')) signText = '🏠 FORTALEZA VIROCASA';
    ctx.fillText(signText, x + 55, 138);
  }
  ctx.restore();

  ctx.save();
  ctx.translate(-world.cameraX, 0);

  // Dibujar Plataformas
  for (const plat of world.platforms) {
    if (plat.type.includes('oil')) {
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      // Capa superior de aceite brillante de Derian
      ctx.fillStyle = '#facc15';
      ctx.fillRect(plat.x, plat.y, plat.w, 6);
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(plat.x, plat.y, plat.w, 4);
    }
  }

  // Dibujar Huesos Dorados de Jairo
  for (const b of world.bonesList) {
    if (b.collected) continue;
    ctx.font = '22px Segoe UI Emoji, sans-serif';
    ctx.fillText('🦴', b.x - 11, b.y + 8);
  }

  // Dibujar Frascos de Aceite de Derian
  for (const oil of world.oilBottles) {
    if (oil.collected) continue;
    ctx.font = '24px Segoe UI Emoji, sans-serif';
    ctx.fillText('🧴', oil.x - 12, oil.y + 8);
  }

  // Dibujar Meta o Jaula Dorada de Jairo en el Nivel 10
  if (cfg.level === 10) {
    // Jaula Dorada con Jairo adentro
    ctx.fillStyle = 'rgba(251, 191, 36, 0.18)';
    ctx.fillRect(world.goalX - 28, 355, 68, 75);
    ctx.font = '38px Segoe UI Emoji, sans-serif';
    ctx.fillText('🐶', world.goalX - 14, 408);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(world.goalX - 28, 355, 68, 75);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('¡JAIRO!', world.goalX - 16, 345);
  } else {
    ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.fillRect(world.goalX - 20, 350, 50, 80);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(world.goalX - 20, 350, 50, 80);
    ctx.font = '28px Segoe UI Emoji, sans-serif';
    ctx.fillText('🚩', world.goalX - 10, 398);
  }

  // Dibujar Enemigos
  for (const en of world.enemies) {
    ctx.fillStyle = en.type === 'usher' ? '#2563eb' : en.type === 'drone' ? '#9333ea' : '#dc2626';
    ctx.fillRect(en.x, en.y, en.w, en.h);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(en.x, en.y, en.w, en.h);
    ctx.font = '20px Segoe UI Emoji, sans-serif';
    const icon = en.type === 'usher' ? '🍿' : en.type === 'drone' ? '🛸' : '🕶️';
    ctx.fillText(icon, en.x + 6, en.y + 29);
  }

  // Dibujar Jefe (Javier / Mega-Dron / Jair)
  if (world.boss && !world.boss.defeated) {
    const b = world.boss;
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.strokeRect(b.x, b.y, b.w, b.h);

    ctx.font = '32px Segoe UI Emoji, sans-serif';
    const bossEmoji = b.id.includes('javier') ? '🍿' : b.id.includes('drone') ? '🤖' : '😈';
    ctx.fillText(bossEmoji, b.x + 14, b.y + 52);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(b.id.includes('javier') ? 'JAVIER' : 'JAIR', b.x + 10, b.y - 8);
  }

  // Dibujar a J (Jugador)
  const p = world.player;
  if (p.invuln % 6 < 4) {
    // Aura de Aceite Turbo de Derian si está activo
    if (p.oilBoostTimer > 0) {
      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 34, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
      ctx.fill();
    }

    ctx.fillStyle = '#111827';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(p.x, p.y, p.w, p.h);

    // Cabeza y banda de rescate de J
    ctx.fillStyle = '#f1c29b';
    ctx.fillRect(p.x + 6, p.y + 6, p.w - 12, 20);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(p.x + 4, p.y + 4, p.w - 8, 5);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('J', p.x + 15, p.y + 44);
  }

  // Dibujar a GAEL flotando junto a J con su Aro de Luz LED (Nivel 5+)
  if (p.hasGael) {
    const gx = p.x - p.facing * 34;
    const gy = p.y - 16 + Math.sin(Date.now() * 0.008) * 6;
    ctx.beginPath();
    ctx.arc(gx + 14, gy + 14, 18, 0, Math.PI * 2);
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.font = '18px Segoe UI Emoji, sans-serif';
    ctx.fillText('🎥', gx + 4, gy + 20);
  }

  // Proyectiles
  for (const proj of world.projectiles) {
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, proj.r, 0, Math.PI * 2);
    ctx.fillStyle = proj.color;
    ctx.fill();
  }

  for (const ep of world.enemyProjectiles) {
    ctx.beginPath();
    ctx.arc(ep.x, ep.y, ep.r, 0, Math.PI * 2);
    ctx.fillStyle = ep.color;
    ctx.fill();
  }

  // Partículas
  for (const pt of world.particles) {
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Textos flotantes
  for (const ft of world.floatingTexts) {
    ctx.fillStyle = ft.color;
    ctx.font = 'bold 14px sans-serif';
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
      title.textContent = '🏆 ¡RESCATASTE A JAIRO EN VIROCASA!';
      desc.textContent =
        '¡Completaste los 10 niveles de JAIRO RESCUEE! Derrotaste a Jair y a Javier, contaste con el Aro LED de Gael en San Jorge y el aceite de Derian, y Jairo el Pomerania volvió sano y salvo a Virocentro.';
      nextBtn.classList.add('hidden');
      playSfx('bark');
    } else {
      art.innerHTML = getRescueCharSVG(lvl >= 5 ? 'gael' : 'j');
      title.textContent = `✅ ¡NIVEL ${lvl} SUPERADO!`;
      desc.textContent = `Excelente trabajo en ${world.levelCfg.location}. El Nivel ${lvl + 1} ya está desbloqueado.`;
      nextBtn.classList.remove('hidden');
    }
  } else {
    art.innerHTML = getRescueCharSVG('sandra');
    title.textContent = '💥 ¡SANDRA TE REGAÑÓ!';
    desc.textContent =
      'Perdiste todos tus corazones. Puedes comprar mejoras con los huesos dorados de Jairo o reintentar el nivel.';
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
    const bossTag = lvl.boss ? ' • 😈 JEFE' : lvl.ally ? ' • 🎥 GAEL' : '';

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
          <strong style="color:${ch.color}; font-size:1rem;">${ch.name}</strong>
          <div style="font-size:0.75rem; color:#fde047; font-weight:800;">${ch.role}</div>
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
        showToast('🦴 Te faltan Huesos Dorados de Jairo para esta mejora.');
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

// ---------------- EVENTOS E INICIALIZACIÓN ----------------
document.addEventListener('DOMContentLoaded', () => {
  renderMenuLevels();
  renderCastStripAndModal();
  buildLevelWorld(state.maxUnlockedLevel);
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
    showToast('🔓 ¡Los 10 niveles (Virocentro, Cine, San Jorge y Virocasa) están desbloqueados!');
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

  // Controles de Teclado
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

  // Controles Táctiles / Mouse en pantalla
  const bindHold = (id, keyName) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('pointerdown', () => { keys[keyName] = true; });
    el.addEventListener('pointerup', () => { keys[keyName] = false; });
    el.addEventListener('pointerleave', () => { keys[keyName] = false; });
  };
  bindHold('ctrl-left', 'left');
  bindHold('ctrl-right', 'right');

  document.getElementById('ctrl-jump').addEventListener('click', triggerJump);
  document.getElementById('ctrl-shoot').addEventListener('click', triggerShoot);
  document.getElementById('ctrl-special').addEventListener('click', triggerSpecialPower);
});
