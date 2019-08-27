const express = require("express");
const app = express();
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);

// temporary gross global variable stored on the server until some sort of database is used
var global_plants = {};

var GoogleSpreadsheet = require("google-spreadsheet");
const defaultSpreadsheetId = "1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U";
var doc = new GoogleSpreadsheet(defaultSpreadsheetId);

function getSheet(sheet_name) {
    return new Promise((resolve, reject) => {
        doc.getInfo((err, info) => {
            if (err) reject(err);
            const { worksheets, last_updated } = info;
            const worksheet = worksheets.find(sheet => sheet.title === sheet_name);
            resolve({
                sheet: worksheet, 
                last_updated: last_updated
            });
        })
    });
}

function getPlantProperties(sheet) {
    return new Promise((resolve, reject) => {
        sheet.getRows({ offset: 1}, (err, rows) => {
            if (err) reject(err);
            const plants = {};
            var curr = '';
            rows.forEach((val, index) => {
                const { property, value } = val;
                if (property === "Name") {
                    curr = value;
                    plants[value] = {};
                } 
                else plants[curr][property] = value;
            });
            resolve(plants)
        });
    });
}

function getPropertiesForPlant(plant, res) {
    if (!Object.keys(global_plants).length) {
        return res.status(400).json({
            error: 'global_plants variable not loaded yet'
        });
    }
    else if (!(plant in global_plants)) { 
        return res.status(400).json({
            error: `${plant} is not a valid plant name`
        });
    }
    else {
        res.json(global_plants[plant]);
    }
}

app.get("/api/plants", async (req, res) => {
    const sheet_name = "Desalination Plants";
    const params = req.query;
    // pass optional spreadsheetId as a GET parameter
    if ('spreadsheetId' in params && params.spreadsheetId != defaultSpreadsheetId) {
        doc = new GoogleSpreadsheet(params.spreadsheetId);
    }
    // pass optional plant as GET parameter to obtain details for 1 plant only
    if ('plant' in params) {
        const plant = params.plant;
        getPropertiesForPlant(plant, res);
    }
    else {
        // this should be in try catch for proper error passing
        const { sheet, last_updated } = await getSheet(sheet_name);
        global_plants = await getPlantProperties(sheet);
        res.json(global_plants);
    }
});
