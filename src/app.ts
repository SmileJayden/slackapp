import { sendResume } from './slackapi';
import { getLinks } from './crawl';
import * as dotenv from 'dotenv';

// get info from .env
dotenv.config();

async function main() {
  const resumes = await getLinks();
  resumes.map(async (resumeLink: string) => {
    console.log('resumeLink', resumeLink);
    if (/wanted/.test(resumeLink)) await sendResume('원티드', resumeLink);
    if (/programmers/.test(resumeLink))
      await sendResume('프로그래머스', resumeLink);
  });
}

main();
