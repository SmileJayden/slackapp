import { sendResume } from './slackapi';
import { getWantedLinks } from './crawl';
import * as dotenv from 'dotenv';

// get info from .env
dotenv.config();

async function main() {
  const resumes = await getWantedLinks();
  resumes.map(async (resume: string) => {
    console.log('resume', resume);
    await sendResume('원티드', resume);
  });
}

main();
