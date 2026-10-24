// ============================================================================
// JAIROGAMES — PORTAL LAUNCHER & PROGRESO DE JUEGOS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Cargar progreso guardado de Call of J desde localStorage
  try {
    const endings = JSON.parse(localStorage.getItem('callofj_endings') || '[]');
    const secrets = JSON.parse(localStorage.getItem('callofj_secrets') || '[]');

    const endingsEl = document.getElementById('coj-endings-stat');
    const secretsEl = document.getElementById('coj-secrets-stat');

    if (endingsEl && Array.isArray(endings)) {
      endingsEl.textContent = `🏆 Finales: ${endings.length}/8`;
    }
    if (secretsEl && Array.isArray(secrets)) {
      secretsEl.textContent = `🥚 Secretos: ${secrets.length}/7`;
    }

    const jrLevel = localStorage.getItem('jairorescue_max_level') || '1';
    const jrBones = localStorage.getItem('jairorescue_bones') || '0';
    const jrLevelEl = document.getElementById('jr-level-stat');
    const jrBonesEl = document.getElementById('jr-bones-stat');
    if (jrLevelEl) jrLevelEl.textContent = `🗺️ Nivel: ${jrLevel}/10`;
    if (jrBonesEl) jrBonesEl.textContent = `🦴 Huesos: ${jrBones}`;
  } catch (e) {
    // Ignorar errores de almacenamiento local
  }

  // Mascota interactiva de Jairo en la portada de JAIROGAMES
  const mascot = document.getElementById('mascot-jairo');
  const fxLayer = document.getElementById('portal-fx');

  function playBarkSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  if (mascot && fxLayer) {
    mascot.addEventListener('click', () => {
      playBarkSound();
      const emojis = ['🐶', '🐾', '🦴', '🔥', '🕹️'];
      for (let i = 0; i < 6; i++) {
        const span = document.createElement('span');
        span.className = 'fx-emoji';
        span.textContent = emojis[i % emojis.length];
        span.style.left = `${35 + Math.random() * 30}%`;
        span.style.top = `${12 + Math.random() * 14}%`;
        fxLayer.appendChild(span);
        setTimeout(() => span.remove(), 1800);
      }
    });
  }
});
