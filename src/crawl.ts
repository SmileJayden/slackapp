import * as puppeteer from 'puppeteer';
import crawlWanted from './crawlWanted';
import crawlProgrammers from './crawlProgrammers';

async function getLinks() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const wantedResumes = await crawlWanted(page);
  // const programmersResumes = await crawlProgrammers(page);

  await page.close();

  await browser.close();

  return [...wantedResumes];
}

export { getLinks };
