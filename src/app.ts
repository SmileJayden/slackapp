import { sendMsg } from './slackapi';
import { helloPuppet } from './crawl';
import * as dotenv from 'dotenv';

// get info from .env
dotenv.config();

console.log('hii', helloPuppet());
