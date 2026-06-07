import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const y      = parseInt(process.argv[2] || '0');
const h      = parseInt(process.argv[3] || '900');
const name   = process.argv[4] || 'section';
const outPath = `./temporary screenshots/mob-${name}.png`;
mkdirSync('./temporary screenshots', { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
await page.goto('http://localhost:3333', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
await page.setViewport({ width: 390, height: fullH, deviceScaleFactor: 3 });
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: outPath, clip: { x: 0, y, width: 390, height: h } });
await browser.close();
console.log('Saved:', outPath, '| Page height:', fullH);
