import assert from 'assert';
import express from "express";
import connectToMongo from './db/mongo'

const app = express();
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);

// temporary gross global variable stored on the server until some sort of database is used
let globalPlants = {};

const GoogleSpreadsheet = require('google-spreadsheet');
const defaultSpreadsheetId = '1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U';
let doc = new GoogleSpreadsheet(defaultSpreadsheetId);

// start db connection
let db;
connectToMongo((_db) => {
  db = _db;
});

interface Sheet {
  sheet: string,
  last_updated: string
}

interface SheetRow {
  property: string,
  value: any
}

function getSheet(sheet_name: string) {
    return new Promise<Sheet>((resolve, reject) => {
        doc.getInfo((err, info) => {
            if (err) { reject(err); }
            const { worksheets, last_updated } = info;
            const worksheet = worksheets.find(sheet => sheet.title === sheet_name);
            resolve({
                sheet: worksheet,
                last_updated
            });
        })
    });
}

function getPlantProperties(sheet) {
    return new Promise((resolve, reject) => {
        sheet.getRows({ offset: 1}, (err, rows: SheetRow[]) => {
            if (err) { reject(err); }
            const plants = {};
            let curr = '';
            rows.forEach((row: SheetRow, index: number) => {
                const { property, value } = row;
                if (property === 'Name') {
                    curr = value;
                    plants[value] = {};
                }
                else { plants[curr][property] = value; }
            });
            resolve(plants)
        });
    });
}

function getPropertiesForPlant(plant, res) {
    if (!Object.keys(globalPlants).length) {
        return res.status(400).json({
            error: 'global_plants variable not loaded yet',
        });
    } else if (!(plant in globalPlants)) {
        return res.status(400).json({
            error: `${plant} is not a valid plant name`,
        });
    } else {
        res.json(globalPlants[plant]);
    }
}

app.get('/gsheets/plants', async (req, res) => {
    const sheet_name = 'Desalination Plants';
    const params = req.query;
    // pass optional spreadsheetId as a GET parameter
    if ('spreadsheetId' in params && params.spreadsheetId != defaultSpreadsheetId) {
        doc = new GoogleSpreadsheet(params.spreadsheetId);
    }
    // pass optional plant as GET parameter to obtain details for 1 plant only
    if ('plant' in params) {
        const plant = params.plant;
        getPropertiesForPlant(plant, res);
    } else {
        // this should be in try catch for proper error passing
        const { sheet, last_updated } = await getSheet(sheet_name);
        globalPlants = await getPlantProperties(sheet);
        res.json(globalPlants);
    }
});

app.get('/mongodb/plants', (req, res) => {
  // var db = myMongo.getRegionalDb();
  db.regional.collection('plantDetails')
    .find({})
    .toArray((err, docs) => {
      assert.equal(err, null);
      res.json(docs);
    });
});

app.get('/mongodb/technologyTypes', (req, res) => {
  // var db = myMongo.getTechnologiesDb();
  db.technologies.collection('technologyTypes')
    .find({})
    .toArray((err, docs) => {
      assert.equal(err, null);
      res.json(docs);
    });
});

