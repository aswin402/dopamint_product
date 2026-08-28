import confetti from 'canvas-confetti';

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#5B5CEB', '#7677F4', '#10B981', '#F59E0B', '#6366F1'],
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback if canvas is unavailable
  }
}

export function triggerCelebration() {
  try {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#5B5CEB', '#10B981', '#F59E0B'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#5B5CEB', '#7677F4', '#3B82F6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Ignore
  }
}
