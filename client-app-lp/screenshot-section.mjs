import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { join } from 'path';

const url     = process.argv[2];
const clip    = JSON.parse(process.argv[3] || 'null');
const outPath = join('./temporary screenshots', process.argv[4] || 'section.png');

mkdirSync('./temporary screenshots', { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 600));
const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
await page.setViewport({ width: 1440, height: fullH, deviceScaleFactor: 2 });
await new Promise(r => setTimeout(r, 600));
const opts = clip ? { path: outPath, clip } : { path: outPath, fullPage: true };
await page.screenshot(opts);
await browser.close();
console.log('Saved:', outPath);
