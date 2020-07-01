import { WebClient, WebAPICallResult } from '@slack/web-api';

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  message: {
    text: string;
  };
}

export const sendMsg = async () => {
  // Create a new instance of the WebClient class with the token read from your environment variable
  const web = new WebClient(process.env.SLACK_TOKEN);

  // The current date
  const currentTime = new Date().toTimeString();

  (async () => {
    try {
      // Use the `chat.postMessage` method to send a message from this app
      const res = (await web.chat.postMessage({
        channel: '#alarmrecruitmentapitest',
        text: `The current time is ${currentTime}`,
      })) as ChatPostMessageResult;
      console.log(
        `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message.text}`
      );
    } catch (error) {
      console.log(error);
    }

    console.log('Message posted!');
  })();
};

export const sendResume = async (site: string, resume: string) => {
  const web = new WebClient(process.env.SLACK_TOKEN);
  (async () => {
    try {
      // Use the `chat.postMessage` method to send a message from this app
      const res = (await web.chat.postMessage({
        channel: '#alarmrecruitmentapitest',
        text: `${site}에서 레쥬메(${resume})가 도착했습니다 0_< `,
      })) as ChatPostMessageResult;
      console.log(
        `A message was posed to conversation ${res.channel} with id which contains the message ${res.message.text}`
      );
    } catch (error) {
      console.log(error);
    }

    console.log('Resume posted!');
  })();
};
