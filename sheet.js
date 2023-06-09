import { GoogleSpreadsheet } from 'google-spreadsheet';

// Initialize the sheet - doc ID is the long id in the sheets URL
import creds from './creds.json' assert { type: "json" };
const sheetId = '169Rv_RPZ0eV18tjE1Vav2aXz43tMeOt9921NofZ2CTg';
const doc = new GoogleSpreadsheet(sheetId);
await doc.useServiceAccountAuth(creds);

// Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
// await doc.useServiceAccountAuth({
//   // env var values are copied from service account credentials generated by google
//   // see "Authentication" section in docs for more info
//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   private_key: process.env.GOOGLE_PRIVATE_KEY,
// });

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);

//add data to rows
const sheet = await doc.addSheet({ title: 'hot new sheet!', headerValues: ['num1','num2','num3','num4','num5','num6','num7','Bonus'] });
const customers =  [
    { num1: 1, num2: 2 , num3: 3, num4: 4, num5: 5, num6: 6, num7: 7, Bonus: 8 },
    { num1: 1, num2: 2 , num3: 3, num4: 4, num5: 5, num6: 6, num7: 7, Bonus: 8 },
    { num1: 1, num2: 2 , num3: 3, num4: 4, num5: 5, num6: 6, num7: 7, Bonus: 8 },
    { num1: 1, num2: 2 , num3: 3, num4: 4, num5: 5, num6: 6, num7: 7, Bonus: 8 }
]

// append rows
//const larryRow = await sheet.addRow({ num1: 1, num2: 2, num3: 3, num4: 2, num5: 1, num6: 2, num7: 1, num8: 2, num9: 5 });
await sheet.addRows(customers.map(n => n));

//module.exports = puppeteer;
