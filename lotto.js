import EventEmitter from 'events';
//const puppeteer = require('puppeteer-extra');
import puppeteer from "puppeteer-extra";

// add stealth plugin and use defaults (all evasion techniques)
//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { GoogleSpreadsheet } from "google-spreadsheet";
// Initialize the sheet - doc ID is the long id in the sheets URL
import creds from "./creds.json" assert { type: "json" };
const sheetId = "169Rv_RPZ0eV18tjE1Vav2aXz43tMeOt9921NofZ2CTg";
const doc = new GoogleSpreadsheet(sheetId);
await doc.useServiceAccountAuth(creds);

const emitter = new EventEmitter()
emitter.setMaxListeners(100)

function lotto(year) {
  puppeteer.use(StealthPlugin());

  // puppeteer usage as normal
  puppeteer.launch({ headless: true }).then(async (browser) => {
    console.log("I am in the lotto function", year);
    const page = (await browser.pages())[0]; //avoid leading tabs
    const url = `https://www.lottodatabase.com/lotto-database/canadian-lotteries/lotto-max/draw-history/${year}`;
    await page.setUserAgent(
      "Mozilla/5.Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    var nodes = await page.$$eval(".s_9_12 > .extraspace > .ball", (el) =>
      el.map((item) => item.innerText)
    );

    let ball = {};
    let winningNumbers = [];
    let i = 0;

    nodes.forEach((n) => {
      ball[i] = n;
      if (i == 7) {
        ball[i] = ball[i].slice(0, -6); 
        winningNumbers.push(ball);
        ball = {};
        i = -1;
      }
      i++;
    });
    await browser.close();

    //add data to rows
    const sheet = await doc.addSheet({
      title: `${year}`,
      headerValues: [
        "0","1","2","3","4","5","6","7"
      ],
    });

    // append rows
    await sheet.addRows(winningNumbers.map((n) => n));
  });
}

export default lotto;
