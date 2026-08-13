(function () {
  // Lenis: smooth/inertial scroll (lesson from savor.it)
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // Staggered reveal per section (lesson: repeat one reveal pattern, not many)
  document.querySelectorAll('.flat').forEach(function (sec) {
    Array.prototype.forEach.call(sec.children, function (el, i) { el.style.setProperty('--i', i); });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.25 });
  document.querySelectorAll('.flat').forEach(function (s) { io.observe(s); });

  // Starfield canvas: continuous hyperspace parallax + ONE flagship warp moment
  var canvas = document.getElementById('stars');
  var ctx = canvas.getContext('2d');
  var accentRgb = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '125,211,252';
  var W, H, cx, cy;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  window.addEventListener('resize', resize);
  resize();

  var STAR_COUNT = 260;
  var stars = [];
  for (var i = 0; i < STAR_COUNT; i++) {
    stars.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.max(W, H) * 0.6,
      z: 0.2 + Math.random() * 0.8,
      twinkle: Math.random() * Math.PI * 2
    });
  }

  var warpZone = document.querySelector('.warp-zone');
  var warpLabel = document.querySelector('.warp-label');

  function warpIntensity() {
    if (!warpZone) return 0;
    var rect = warpZone.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    if (total <= 0) return 0;
    var progress = Math.min(1, Math.max(0, -rect.top / total));
    return Math.sin(progress * Math.PI); // 0 -> 1 -> 0 bell curve
  }

  function maxRadius() { return Math.hypot(W, H) * 0.65; }

  function frame(t) {
    var scrollY = window.scrollY;
    var intensity = warpIntensity();
    if (warpLabel) warpLabel.style.opacity = intensity.toFixed(2);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#05060a';
    ctx.fillRect(0, 0, W, H);

    for (var s = 0; s < stars.length; s++) {
      var star = stars[s];
      var speed = (0.12 + star.z * 0.9) * (1 + intensity * 6);
      var r = star.radius + scrollY * speed * 0.5;
      var mr = maxRadius();
      if (r > mr) {
        r = r % mr;
        star.angle = Math.random() * Math.PI * 2;
      }
      var dx = Math.cos(star.angle), dy = Math.sin(star.angle) * 0.6;
      var x = cx + dx * r, y = cy + dy * r;
      var size = 0.4 + star.z * 2.2;
      var flicker = 0.55 + 0.45 * Math.sin(t * 0.002 + star.twinkle);
      var alpha = (0.25 + star.z * 0.65) * flicker;
      ctx.strokeStyle = ctx.fillStyle = 'rgba(' + accentRgb + ', ' + alpha + ')';

      if (intensity > 0.12) {
        var streak = intensity * size * 16 * star.z;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx * streak, y - dy * streak);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
