const http = require('http');
const fs   = require('fs');
const path = require('path');

const { execSync } = require('child_process');
const puppeteer  = require('puppeteer');
const ffmpegPath = require('ffmpeg-static');

const SERVE_DIR   = path.resolve(__dirname, '..');
const PORT        = 9900;
const FPS         = 30;
const DURATION_S  = 20;
const TOTAL       = FPS * DURATION_S + FPS; // 21s de buffer
const FRAMES_DIR  = path.join(__dirname, '_frames');
const OUTPUT      = path.join(__dirname, 'institucional-15s.mp4');

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jsx':  'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]) || '/';
      const filePath = path.join(SERVE_DIR, url);
      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end();
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function captureFrames(page) {
  const interval = Math.round(1000 / FPS);
  for (let frame = 0; frame < TOTAL; frame++) {
    const t0  = Date.now();
    const num = String(frame).padStart(5, '0');
    await page.screenshot({ path: path.join(FRAMES_DIR, `frame${num}.jpg`), type: 'jpeg', quality: 92 });
    process.stdout.write(`\r  Frame ${frame + 1}/${TOTAL}`);
    const wait = Math.max(0, interval - (Date.now() - t0));
    await new Promise(r => setTimeout(r, wait));
  }
  console.log('\n✓ Frames capturados');
}

function encodeVideo() {
  console.log('Codificando MP4...');
  const input  = path.join(FRAMES_DIR, 'frame%05d.jpg');
  execSync(
    `"${ffmpegPath}" -y -r ${FPS} -i "${input}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 18 "${OUTPUT}"`,
    { stdio: 'inherit' }
  );
  console.log(`✓ Salvo em: ${OUTPUT}`);
}

async function main() {
  if (fs.existsSync(FRAMES_DIR)) fs.rmSync(FRAMES_DIR, { recursive: true });
  fs.mkdirSync(FRAMES_DIR);

  console.log('Iniciando servidor local...');
  const server = await startServer();

  console.log('Abrindo browser (aguarde o download do Chromium na 1ª vez)...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Carregando animação...');
  await page.goto(`http://localhost:${PORT}/video/institucional-15s.html`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  await new Promise(r => setTimeout(r, 800));

  console.log('Capturando frames (30fps × 16s)...');
  await captureFrames(page);

  await browser.close();
  server.close();

  encodeVideo();

  fs.rmSync(FRAMES_DIR, { recursive: true });
  console.log('Pronto!');
}

main().catch(err => { console.error('Erro:', err.message); process.exit(1); });
