import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const url     = process.argv[2] || 'http://localhost:3333';
const outPath = './temporary screenshots/mobile-check.png';
mkdirSync('./temporary screenshots', { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 }); // iPhone 14
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
await page.setViewport({ width: 390, height: fullH, deviceScaleFactor: 3 });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log('Mobile screenshot saved:', outPath);
