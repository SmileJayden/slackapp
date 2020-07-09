async function getProgrammersLinks(page): Promise<any[]> {
  const resumeLinks: string[] = [];
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
        { timeout: 10000 }
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
  return resumeLinks;
}
