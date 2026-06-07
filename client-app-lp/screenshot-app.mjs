import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const screen = process.argv[2] || 'login'; // login | dashboard | calendar
const outPath = `./temporary screenshots/app-${screen}.png`;
mkdirSync('./temporary screenshots', { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
// Use mobile viewport so the app fills the screen
await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 3 });
await page.goto('http://localhost:3333/app.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));

if (screen === 'dashboard') {
  await page.evaluate(() => { window.doLogin(); });
  await new Promise(r => setTimeout(r, 400));
} else if (screen === 'calendar') {
  await page.evaluate(() => { window.doLogin(); window.openMission(0); });
  await new Promise(r => setTimeout(r, 400));
} else if (screen === 'calendar2') {
  await page.evaluate(() => { window.doLogin(); window.openMission(1); });
  await new Promise(r => setTimeout(r, 400));
}

await page.screenshot({ path: outPath });
await browser.close();
console.log('Saved:', outPath);
