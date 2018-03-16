const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); // To parse request body in URL encoded forms

const db = require('./config/db');
const PORT = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  const remoteDb = database.db('nodejsapi');
  require('./app/routes')(app, remoteDb);
  app.listen(PORT, () => {
    console.log('We are live on '+ PORT);
  });
});
