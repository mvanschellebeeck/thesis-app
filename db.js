const assert = require('assert');
const mongoUtils = require('./db/mongoUtils');

mongoUtils.connectToServer((err, client) => {
  if (err) {
    console.log(err);
  } else {
    var db = mongoUtils.getRegionalDb();
    db.collection('plantDetails')
      .find({})
      .toArray((err, docs) => {
        assert.equal(err, null);
        console.log(docs);
      });
  }
});
