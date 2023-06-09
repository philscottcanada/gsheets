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
//await doc.updateProperties({ title: 'Lotto Max' });

//const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
// console.log(sheet.title);
// console.log(sheet.rowCount);

// adding / removing sheets
//const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
//await newSheet.delete();

// //add data to cells
// await sheet.loadCells('A1:E1');
// const a1 = sheet.getCell(0, 1);
// a1.value = '1234';
// await sheet.saveUpdatedCells();

//add data to rows
const sheet = await doc.addSheet({ title: 'hot new sheet!', headerValues: ['name', 'email'] });
const customers =  [
    { name: 'Sergey Brin', email: 'sergey@google.com' },
    { name: 'Eric Schmidt', email: 'eric@google.com' }
]

// append rows
const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });
const moreRows = await sheet.addRows(customers.map(n => n));

//module.exports = puppeteer;
