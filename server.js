const express = require("express");

const app = express();
var global_plants = {};
app.use(express.json());
app.use(express.urlencoded());

var GoogleSpreadsheet = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
    "1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U"
);

app.post("/api/customers", (req, res) => {
    const plant = req.body.plant;
    res.json(global_plants[plant]);
});

app.get("/api/specificplant", (req, res) => {
    // make an option to request specific properties
    const requested_plant = req.body.plant;
    if (!Object.keys(global_plants).length) {
        return res.status(400).json({
            error: 'global_plants variable not loaded yet'
        });
    }
    else if (!(requested_plant in global_plants)) { 
        return res.status(400).json({
            error: `${requested_plant} is not a valid plant name`
        });
    }
    else {
        res.json(global_plants[requested_plant]);
    }
});

// replace with async await for cleaner code
// extract sheet.getRows into function with cleaner interface
app.get("/api/plants", (req, res) => {
    const plants = {};
    doc.getInfo((err, info) => {
        if (err) throw err;
        const sheet = info.worksheets[0];
        sheet.getRows(
            {
                offset: 1
            },
            (err, rows) => {
                if (err) throw err;
                var curr = "";
                rows.forEach((val, index) => {
                    const { property, value } = val;
                    //console.log(property + ' ' + value);
                    if (property === "Name") {
                        curr = value;
                        plants[value] = {};
                    } else {
                        plants[curr][property] = value;
                    }
                });
                //console.log(`There are ${rows.length} rows (excluding header)`);
                //console.log(plants);
                global_plants = plants;
                res.json(plants);
            }
        );
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
