(() => {
  const wheel   = document.querySelector('.wheel');
  const spinBtn = document.querySelector('.spinbutton');
  const planets = document.querySelectorAll('.wheel .planet');
  const N = planets.length;

  // Configuración
  const fullTurns  = 5;                          // vueltas completas
  const durationMs = 4000;                       // duración del giro
  const ease       = 'cubic-bezier(.2,.8,.2,1)'; // ease-out suave

  // Dónde debe quedar el planeta elegido:
  const landingAngleDeg = -90;    // arriba (12 en punto)
  const fineOffsetDeg   =  -25;    // <-- AJUSTA aquí (+ / -) hasta que quede perfecto

  let spinning = false;
  let currentRotation = 0; // [0,360)
  const slice = 360 / N;

  const to0_360 = deg => (deg % 360 + 360) % 360;
  const forwardDelta = (from, to) => to0_360(to - from);

  function spinToIndex(index) {
    if (spinning) return;
    spinning = true;

    // Queremos: (slice*index - R) == landingAngleDeg + fineOffsetDeg
    // => R = slice*index - (landingAngleDeg + fineOffsetDeg)
    const desired = slice * index - (landingAngleDeg + fineOffsetDeg);

    const fwd = forwardDelta(currentRotation, desired);
    const newRotation = currentRotation + fullTurns * 360 + fwd;

    wheel.style.transition = `transform ${durationMs}ms ${ease}`;
    wheel.style.transform  = `rotate(${newRotation}deg)`;

    const onEnd = () => {
      wheel.removeEventListener('transitionend', onEnd);
      wheel.style.transition = 'none';
      currentRotation = to0_360(newRotation);
      spinning = false;

      const chosenAlt = planets[index]?.querySelector('img')?.alt ?? `index ${index}`;
      console.log('Planeta final:', chosenAlt);
    };
    wheel.addEventListener('transitionend', onEnd, { once: true });
  }

  spinBtn.addEventListener('click', () => {
    if (spinning) return;
    // elegimos un planeta al azar directamente (sin ángulos intermedios)
    const index = Math.floor(Math.random() * N); // 0..N-1
    spinToIndex(index);
  });

  // Para probar un índice concreto:
  // spinToIndex(0);
})();
