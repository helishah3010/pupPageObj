const puppeteer = require('puppeteer');
const config = require('../lib/config.js');
const click = require('../lib/helper.js').click;

const commons = require('../page-objects/homepage');

describe('Consumer mode login endpoints', () => {
  let browser, page;
  const timeout = 999999;
  beforeAll(async() =>{
    browser = await puppeteer.launch({headless:false, timeout:config.launchTimeout, args: ['--start-fullscreen']});
    page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
  });

  it('Go to Consumer mode', async () => {
    //await page.goto('https://dev.mbodev.me');
    await page.goto(config.baseUrl);
    //await page.click('.tabItem #tabA2');
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.click('.wrapper > #main-content > .contentContainer > .cardOutline > .myInfoSignInButton');
    
   
   await page.waitForNavigation(), arcusSignin = await page.url();
   await expect(arcusSignin).toContain('signin-sandbox');
  }, timeout);

  it('Consumer login page - myinfo', async() => {
    await click(page, commons.USERNAME);
    await page.type(commons.USERNAME,config.username, {delay:10});
    await page.focus(commons.PASSWORD);
    await page.type(commons.PASSWORD,config.password, {delay:10});
    await page.click(commons.SIGN_IN_BUTTON);
    await page.waitForSelector('#btnLogout', {visible: true, timeout: 0}), loggedInUrl = await page.url();;
    await expect(loggedInUrl).toContain('main_info.asp');
  }, timeout);
  
  afterAll(async() => {
    browser.close();
  });
});

