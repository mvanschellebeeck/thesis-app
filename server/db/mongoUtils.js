const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var _db_regional, _db_technologies;

module.exports = {
  connectToServer: callback => {
    MongoClient.connect(url, function(err, client) {
      if (!err) {
        _db_regional = client.db('regional');
        _db_technologies = client.db('technologies');
        console.log('MongoDB connection established.');
      }
      return callback(err);
    });
  },

  getRegionalDb: () => {
    return _db_regional;
  },

  getTechnologiesDb: () => {
    return _db_technologies;
  },
};
