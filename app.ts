import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('process.env.SLACK_TOKEN', process.env.SLACK_TOKEN);

// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);

// The current date
const currentTime = new Date().toTimeString();

(async () => {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: '#alarmrecruitmentapitest',
      text: `The current time is ${currentTime}`,
    });
  } catch (error) {
    console.log(error);
  }

  console.log('Message posted!');
})();
