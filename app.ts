import { sendMsg } from './slackapi';
import * as dotenv from 'dotenv';

// get info from .env
dotenv.config();

console.log('hii', sendMsg());
