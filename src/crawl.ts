import * as puppeteer from 'puppeteer';

export const helloPuppet = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.wanted.co.kr/');

  // click 로그인하기
  await page.click(
    '#__next > div > div._18n9ahfYSkH2qwpg5s7sYW > div > nav > aside > ul > li:nth-child(2) > button.signUpButton'
  );

  // Email 입력
  if (process.env.EMAIL) {
    await page.keyboard.type(process.env.EMAIL);
  }

  // Email 입력 확인
  await page.keyboard.press('Enter');
  // await page.click(
  //   '#MODAL_BODY > div._1DMHwdmk4aUOJ4rev-KZ6A > div._2fF2pbQ2xJnRfi4eCyGqQC > button._1wbxktkJ3ZFAS9wrJs1UFQ.email-login-button'
  // );

  // delay for transition
  await delay(1000);

  await page.focus('#MODAL_BODY > div > div > label');

  // 비밀번호 입력
  if (process.env.PSWD) {
    await page.keyboard.type(process.env.PSWD);
  }

  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  await delay(1000);

  await page.click(
    '#__next > div > div._18n9ahfYSkH2qwpg5s7sYW > div > nav > aside > ul > li:nth-child(4) > a'
  );

  await page.click(
    '#app > div > div.Content-sc-4ql4l8-0.iEIrUP > div:nth-child(4) > div > div > div > div:nth-child(2) > ol > li:nth-child(1)'
  );

  // console.log('New Page URL:', page.url());
};

const delay = (millis: number) =>
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });
