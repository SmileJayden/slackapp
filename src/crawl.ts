import * as puppeteer from 'puppeteer';
import crawlWanted from './crawlWanted';

async function getLinks() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  const wantedResumes = await crawlWanted(page);
  // const programmersResumes = crawlProgrammers(page);

  await page.close();

  await browser.close();

  return [...wantedResumes];
}

export { getLinks };
