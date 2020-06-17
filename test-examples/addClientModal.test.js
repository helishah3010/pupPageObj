const puppeteer = require('puppeteer');

const config = require('../lib/config.js');
const click = require('../lib/helper.js').click;
var faker = require('faker');

describe('Add Client Modal', () => {
	let browser, page;
	  const timeout = 999999;
    beforeAll(async () => {
      browser = await puppeteer.launch({headless:false, timeout:config.launchTimeout});  
      page = await browser.newPage();
    });
  it('Select site on launch page', async () => {
    //await page.goto('https://dev.mbodev.me');
    await page.goto(config.baseUrl);
    await page.click('#studioSearchInput')
    await page.type('#studioSearchInput', '-103010')

    await click(page, '#searchResultsTable > tbody > tr > td.desktop > a')
    //await click(page, '.rightSideButtonLink', {delay:10})
   
   await page.waitForNavigation(), arcusSignin = await page.url();
   await expect(arcusSignin).toContain('signin-sandbox');
  
  }, timeout);
  it('Can login as admin', async() => {
    await click(page, '#username');
    await page.type('#username',config.username, {delay:10});
    await page.focus('#password');
    await page.type('#password',config.password, {delay:10});
    await page.click('.Button_button_YWMBp1OK04');
    //await page.setRequestInterception(true);
    
    //await page.waitForNavigation() 
    //await page.waitForNavigation({waitUntil:"networkidle2"}), loggedInUrl = await page.url();
    /* page.on('request', request => {
      
      // Capture any request that is a navigation requests that attempts to load a new document
      // This will capture HTTP Status 301, 302, 303, 307, 308, HTML, and Javascript redirects    
      if (request.isNavigationRequest() && request.resourceType() === 'document') {
         console.log(request.url())
      }
      request.continue()
  }) */
    //because there are 2 redirects occuring from server and client side, using waitforselector worked rather than waitfornavigation
    await page.waitForSelector('#headerLogoLoginSection', {visible: false, timeout: 0}), loggedInUrl = await page.url();;
    
    await expect(loggedInUrl).toContain('sitetasklist');
  }, timeout); 

  it('Top left - Add New Client - Modal', async () => {
   //var randomName = faker.name.findName();
    await click(page, '.icon-remove')
    await click(page, '.SearchField_input_2Qw1ZnKTtJ.SearchField_inputInlineStyles_7Ba7oSzaZM')
   
    await click(page, '.ConsumerSearchInline_footerText_3ZuZt0p-em')
    await click(page, '.AddConsumerForm_formContent_1fra3zJUgY #firstName')
    await page.type('.AddConsumerForm_formContent_1fra3zJUgY #firstName', faker.name.firstName())

    await page.type('.AddConsumerForm_sharedFormRow_uR95RqSGGS #lastName', faker.name.lastName(), {delay:10})
    
    //await page.click('input[id=mobilePhone]')
    //await page.type('input[id=mobilePhone]', faker.phone.phoneNumber(), {delay: 10})
    
    await click(page, '.Button_button_20TUHLe8oq.AddConsumerForm_addConsumerButton_24qih12rVe')
    await page.waitFor(2000)
    await click(page, '.SearchField_input_2Qw1ZnKTtJ.SearchField_inputInlineStyles_7Ba7oSzaZM', {delay:10})
    //await click(page, '.ConsumerSearchHeader_closeModal_3rrhL_53np') --close modal and not add client
    const puppeteer = require('puppeteer');

    const navbar = await page.$eval('.ConsumerSearchInline_list_1YpDtKoDV-', el => el ? true : false)
    const listItems = await page.$$('.ConsumerSummary_root_3lOoL-wwz-')
    expect(navbar).toBe(true)
    expect(listItems.length).toBeGreaterThanOrEqual(1);

    //await page.waitFor(2000);
    /*Use this code for non top left search
    await page.waitForNavigation(), clientProUrl = await page.url();
    await expect(clientProUrl).toContain('main_info.asp');*/
 }, timeout);
  afterAll(async() => {
    browser.close();
  });
});