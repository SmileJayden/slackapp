import { sendMsg } from './slackapi';
import { getWantedLinks } from './crawl';
import * as dotenv from 'dotenv';

// get info from .env
dotenv.config();

getWantedLinks().then((resumes) => {
  console.log('resumes', resumes);
});
