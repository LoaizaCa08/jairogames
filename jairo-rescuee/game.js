// ============================================================================
// JAIRO RESCUEE — ARCHIVO BASE DEL JUEGO #2 DE JAIROGAMES
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const barkBtn = document.getElementById('btn-test-bark');
  const avatar = document.getElementById('jairo-hero-avatar');
  const msgEl = document.getElementById('jairo-bark-msg');

  const lines = [
    '🐶 «¡Guau guau! Jairo reportándose para la misión en JAIROGAMES.»',
    '🦴 «¡Oído ultrasónico al 200%! Listo para el rescate.»',
    '🐾 «¡Dime cómo quieres las mecánicas de Jairo Rescuee y empezamos!»'
  ];
  let idx = 0;

  function triggerBark() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(990, now + 0.06);
        osc.frequency.exponentialRampToValueAtTime(430, now + 0.14);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {}

    idx = (idx + 1) % lines.length;
    if (msgEl) msgEl.textContent = lines[idx];
  }

  if (barkBtn) barkBtn.addEventListener('click', triggerBark);
  if (avatar) avatar.addEventListener('click', triggerBark);
});
