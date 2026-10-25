// Subtle terminal-style ambience. The animation is intentionally lightweight.
const terminal = document.getElementById('terminal-text');
const messages = [
  'initializing planetary interface',
  'synchronizing orbital display',
  'rendering COPOXXX identity',
  'secure community link ready',
  'planetary animation running'
];
let index = 0;
function cycleMessage() {
  if (!terminal) return;
  terminal.textContent = messages[index % messages.length];
  index++;
}
cycleMessage();
setInterval(cycleMessage, 2600);

// Low-density falling glyph effect, capped for mobile performance.
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width = 0, height = 0, columns = [], fontSize = 15, frame = 0;
const glyphs = '01アイウエオ<>/{}[]#*+-';
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fontSize = width < 600 ? 14 : 16;
  columns = Array.from({length: Math.ceil(width / fontSize)}, () => Math.random() * -height / fontSize);
}
function draw() {
  if (!ctx) return;
  // Draw at a restrained frame cadence so the background stays decorative.
  if (++frame % 2) { requestAnimationFrame(draw); return; }
  ctx.fillStyle = 'rgba(3,7,12,0.12)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = fontSize + 'px monospace';
  ctx.fillStyle = '#70ffb4';
  for (let i = 0; i < columns.length; i++) {
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    const y = columns[i] * fontSize;
    if (y > 0 && y < height && Math.random() > 0.35) ctx.fillText(char, i * fontSize, y);
    if (y > height && Math.random() > 0.975) columns[i] = 0;
    columns[i] += 0.22 + Math.random() * 0.22;
  }
  requestAnimationFrame(draw);
}
resize();
requestAnimationFrame(draw);
window.addEventListener('resize', resize, {passive:true});
