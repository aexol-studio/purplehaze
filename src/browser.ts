import puppeteer from 'puppeteer';

export const runBrowser = async (port: number) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  page.setCacheEnabled(false);
  await page.goto(`http://127.0.0.1:${port}`);
  return browser;
};
