import { config } from '../config'

export default function connectToMongo(callback) {
  require('mongodb').MongoClient.connect(config.mongo.url, function(err, client) {
    if (!err) {
      console.log('MongoDB connection established.');
      return callback({
        regional: client.db(config.mongo.dbs.regional_db),
        technologies: client.db(config.mongo.dbs.technologies_db)
      });
    }
    else {
      console.log(err);
      return callback(undefined);
    }
  });
}