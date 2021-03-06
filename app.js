const express = require('express');
const app = express();
const port = 3000;
const router = require("./router");
app.use(express.static('static'));

app.listen(port, () => console.log(`Assignment 6 listening on port ${port}!`));

app.use('/', router);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/static';
const dbName = 'datavis';
const client = new MongoClient(url);

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    db = client.db(dbName);
    policeData = db.collection("fatal-police-shootings");
    wildfires = db.collection("california-wildfires");
    trumpTweets = db.collection("tweets-donald-trump");
    utahCovid = db.collection("utah-covid")
});

app.get('/barchart/police', (req, res) => {
    policeData.find({}, {}).toArray(function (e, r) {
        if (e) throw e;
        res.status(200);
        res.append("Context-Type", "application/json")
        res.send(r);
    })
})

app.get('/scatterplot/fires', (req, res) => {
    wildfires.find({}, {}).toArray( function (e, r) {
        if (e) throw e;
        res.status(200);
        res.append("Context-Type", "application/json")
        res.send(r);
    })
})

app.get('/linechart/tweets', (req, res) => {
    trumpTweets.find({}, {}).toArray( function (e, r) {
        if (e) throw e;
        res.status(200);
        res.append("Context-Type", "application/json")
        res.send(r);
    })
})

app.get('/areachart/covid', (req, res) => {
    utahCovid.find({}, {}).toArray( function (e, r) {
        if (e) throw e;
        res.status(200);
        res.append("Context-Type", "application/json")
        res.send(r);
    })
})




