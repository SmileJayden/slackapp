import * as puppeteer from 'puppeteer';

async function getLinks() {
  const resumeLinks: string[] = [];

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  const WANTED_URL = 'https://www.wanted.co.kr';

  await page.goto(WANTED_URL + '/');

  // click 로그인하기
  await page.click(
    '#__next > div > div._18n9ahfYSkH2qwpg5s7sYW > div > nav > aside > ul > li:nth-child(2) > button.signUpButton'
  );

  // Email 입력
  if (process.env.WANTED_EMAIL) {
    await page.keyboard.type(process.env.WANTED_EMAIL);
  }

  // Email 입력 확인
  await page.keyboard.press('Enter');
  // await page.click(
  //   '#MODAL_BODY > div._1DMHwdmk4aUOJ4rev-KZ6A > div._2fF2pbQ2xJnRfi4eCyGqQC > button._1wbxktkJ3ZFAS9wrJs1UFQ.email-login-button'
  // );

  // delay for transition
  await page.waitFor(1000);

  await page.focus('#MODAL_BODY > div > div > label');

  // 비밀번호 입력
  if (process.env.WANTED_PSWD) {
    await page.keyboard.type(process.env.WANTED_PSWD);
  }

  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }),
  ]);

  // delay for transition
  // await page.waitFor(1000);
  await page.waitForNavigation();

  // 기업서비스 버튼 클릭
  await page.click(
    '#__next > div > div._18n9ahfYSkH2qwpg5s7sYW > div > nav > aside > ul > li:nth-child(4) > a'
  );

  await page.waitForNavigation();

  // 지원서 다 가져오기
  // 일단 못생기게 for loop 으로 했지만,
  // 나중에  waitForSelector('#app > div > div.Content-sc-4ql4l8-0.iEIrUP > div:nth-child(4) > div > div > div > div:nth-child(2) > ol') 으로 해볼 것
  for (let i = 1; i < 10; i++) {
    const resume = await page.waitForSelector(
      `#app > div > div.Content-sc-4ql4l8-0.iEIrUP > div:nth-child(4) > div > div > div > div:nth-child(2) > ol > li:nth-child(${i}) > a`,
      { timeout: 2000 }
    );

    if (!resume) {
      continue;
    }

    const res = await resume.evaluate((resumeElement) => {
      const innerTextElem = resumeElement.querySelector(
        'div > h4 > span > span:last-child'
      );
      if (innerTextElem) {
        return resumeElement.getAttribute('href');
      }
      return '';
    });

    if (res) {
      resumeLinks.push(WANTED_URL + res);
    }
  }

  // 프로그래머스에서 땡겨오기 ^^@
  const PROGRAMMERS_INIT_URL =
    'https://business.programmers.co.kr/business/login';

  const PROGRAMMERS_URL = 'https://business.programmers.co.kr';

  await page.goto(PROGRAMMERS_INIT_URL);

  // click 로그인하기
  await page.click('#user_email');

  // 프로그래머스 Email 입력
  if (process.env.PROGRAMMERS_EMAIL) {
    await page.keyboard.type(process.env.PROGRAMMERS_EMAIL);
  }

  await page.keyboard.press('Tab');

  // 프로그래머스 비밀번호 입력
  if (process.env.PROGRAMMERS_PSWD) {
    await page.keyboard.type(process.env.PROGRAMMERS_PSWD);
  }

  await page.keyboard.press('Enter');

  await page.waitForNavigation();

  for (let i = 1; i < 10; i++) {
    const resume = await page
      .waitForSelector(
        `#section_applications > div.applicants__index > div.tab-content.applications_contents > ul > li:nth-child(${i}) > table > tbody > tr > td.t-applicant > h4 > a`,
        { timeout: 2000 }
      )
      .catch(() => {
        return;
      });

    if (!resume) {
      continue;
    }

    const res = await resume.evaluate((resumeElement) => {
      const textContent = resumeElement.textContent;

      if (textContent) {
        if (/웹/.test(textContent)) {
          return resumeElement.getAttribute('href');
        }
      }
      return;
    });

    if (res) {
      resumeLinks.push(PROGRAMMERS_URL + res);
    }
  }

  await page.close();

  await browser.close();

  return resumeLinks;
}

export { getLinks };
