const express = require('express');
const app = express();
const port = 3000;

const path = require("path");
const router = require("./router");
app.use(express.static('static'));

app.listen(port, () => console.log(`Assignment 6 listening on port ${port}!`));

app.use('/', router);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/static';
const dbName = 'barchart';
const client = new MongoClient(url);

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);
});



