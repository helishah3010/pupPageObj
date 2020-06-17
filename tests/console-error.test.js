const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => {
    console.log(error.message);
   });
  page.on('response', response => {
    console.log(response.status, response.url);
  });
  page.on('requestfailed', request => {
    console.log(request.failure().errorText, request.url);
  });
  await page.goto('http://do.carlosesilva.com/puppeteer/');
  await page.waitFor(5000);
  await browser.close();
})();