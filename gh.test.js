let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Additional Github page tests", () => {

  test("The Sign in page test", async () => {
    await page.goto("https://github.com");
    const signInBtn = 'div[class="position-relative mr-lg-3 d-lg-inline-block"]';
    await page.waitForSelector(signInBtn);
    await page.click(signInBtn);
    await page.waitForTimeout(5000);
    const actual = await page.title();
    expect(actual).toContain("Sign in to GitHub · GitHub");
  }, 30000);

test("The h1 header content'", async () => {
  await page.goto("https://github.com/team");
  const btnSelector = await page.$(".btn-large-mktg.btn-mktg");
  await btnSelector.click();
  await page.waitForSelector('h1');
  const title = await page.title();
  expect(title).toContain("Join GitHub · GitHub");
}, 30000);

test("The Pricing page open test", async () => {
  await page.goto("https://github.com/team");
  const pricingBtn = "nav > ul > li:nth-child(4) > a";
  await page.waitForSelector(pricingBtn);
  await page.click(pricingBtn);
  await page.waitForTimeout(5000);
  const titleSelector = "h1";
  await page.waitForSelector(titleSelector);
  const actual = await page.title();
  expect(actual).toContain("Pricing · Plans for every developer · GitHub");
}, 30000);
});