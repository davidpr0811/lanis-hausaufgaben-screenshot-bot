//Copiright C _David_


let config = {
    username:'d',
    password:'d',
    lanisurl:'https://start.schulportal.hessen.de/?9219',// die url zu dienm lanis portal
    homeworkurl:'https://start.schulportal.hessen.de/meinunterricht.php'// die meinuntericht seite
}




const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(config.lanisurl)
  await page.waitForSelector('input[placeholder="Vorname.Nachname (oder Kürzel bei Lehrkräften)"]')
  await page.click('button[aria-label="Close"]').catch(()=>{console.log('cannt click cookie allowed')})
  await page.type('input[placeholder="Vorname.Nachname (oder Kürzel bei Lehrkräften)"]',config.username,{delay:100})
  await page.type('input[placeholder="Passwort"]',config.password,{delay:100})
  await page.click('button[type="submit"]')
  await page.waitForSelector('li[data-original-title="Alles rund um den eigenen Unterricht"]')
  
  sleep(3000)

  //open homework window 
  let homework = await browser.newPage();
  await homework.goto(config.homeworkurl);
  await homework.screenshot({path:'lanis2.png',fullPage:true});

  browser.close()

})();