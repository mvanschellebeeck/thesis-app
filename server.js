const express = require('express');

const app = express();
var global_plants = {};
app.use(express.json());
app.use(express.urlencoded());
var GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U');

app.post('/api/customers', (req, res) => {
  const plant = req.body.plant;
  res.json(global_plants[plant]);
});

app.get('/api/plants', (req, res) => {
  //console.log(req);
  const plants = {};
  doc.getInfo( (err, info) => {
    if (err) throw err;
    const sheet = info.worksheets[0];
    sheet.getRows({
      offset: 1
    }, (err, rows) => {
      if (err) throw err;
      var curr = '';
      rows.forEach( (val, index) => {
        const { property, value } = val;
        //console.log(property + ' ' + value);
        if ( property === 'Name') {
          curr = value;
          plants[value] = {};
        }
        else {
          plants[curr][property] = value;
        }
      });
      //console.log(`There are ${rows.length} rows (excluding header)`);
      //console.log(plants);
      global_plants = plants;
      res.json(plants);
    });
  });
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);




