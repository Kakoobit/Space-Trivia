(() => {
  const wheel   = document.querySelector('.wheel');
  const spinBtn = document.querySelector('.spinbutton');
  const planets = document.querySelectorAll('.wheel .planet');
  const N = planets.length;

  const fullTurns  = 5;  
  const durationMs = 4000;
  const ease       = 'cubic-bezier(.2,.8,.2,1)';

  const landingAngleDeg = -90; 
  const fineOffsetDeg   = -25;

  let spinning = false;
  let currentRotation = 0; 
  const slice = 360 / N;

  const to0_360 = deg => (deg % 360 + 360) % 360;
  const forwardDelta = (from, to) => to0_360(to - from);

  function deg(a) { return a * 180 / Math.PI; }
  function center(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function spinToIndex(index) {
    if (spinning) return;
    spinning = true;

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

      const { x: cx, y: cy } = center(wheel);
      const landingDeg = -90 + fineOffsetDeg;
      let bestIdx = 0;
      let bestDelta = Infinity;

      planets.forEach((p, i) => {
        const img = p.querySelector('img');
        const { x, y } = center(img);
        const a = deg(Math.atan2(y - cy, x - cx));
        let d = Math.abs(((a - landingDeg + 540) % 360) - 180);
        if (d < bestDelta) { bestDelta = d; bestIdx = i; }
      });

      const planetEl = planets[bestIdx].querySelector('img');
      const planetName = planetEl?.alt ?? `Planet ${bestIdx}`;

      showPopup(planetName);
    };

    wheel.addEventListener('transitionend', onEnd, { once: true });
  }

  spinBtn.addEventListener('click', () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * N);
    spinToIndex(index);
  });
})();


function showPopup(message){
    const pop = document.getElementById('pop');
  const txt = document.getElementById('pop-text');
  if (!pop || !txt) return;

  txt.textContent = `🚀 Let's go to ${message}!`;
  pop.classList.remove('show');
  void pop.offsetWidth;
  pop.classList.add('show');

  const map = {
    Mercury: 'mercury/mercuryask.html',
    Venus:   'venus/venusask.html',
    Mars:    'mars/marsask.html',
    Jupiter: 'jupiter/jupiterask.html',
    Saturn:  'saturn/saturnask.html',
    Uranus:  'uranus/uranusask.html',
    Neptune: 'neputune/neptuneask.html'
  };
  const redirectUrl = map[message] || 'jupiterask';

  const handleEnd = (e) => {
    if (e.animationName === 'pop-out') {
      pop.removeEventListener('animationend', handleEnd);
      showCutscene('video.mp4', redirectUrl);
    }
  };
  pop.addEventListener('animationend', handleEnd);
}

function showCutscene(videoSrc, redirectUrl){
  const layer = document.getElementById('cutscene');
  const vid   = document.getElementById('cutscene-video');
  if (!layer || !vid) return;

  vid.src = videoSrc;
  layer.hidden = false;

  requestAnimationFrame(() => layer.classList.add('show'));

  vid.currentTime = 0;
  vid.play().catch(()=>{});

  vid.onended = () => {
    window.location.href = redirectUrl;
  };
}
