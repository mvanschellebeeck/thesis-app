const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.post('/api/customers', (req, res) => {
  const plant = req.body.plant;
  const data = {
    'Victorian Desalination Plant': {
      'name': 'Victorian Desalination Plant',
      'properties': [{'property': 'capacity', 'value': '500GL'}, {'property': 'energy usage', 'value': '20 something'}, {'property': 'skrr', 'value': 'dide'}]
    }
  }

  res.json(data[plant]);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);