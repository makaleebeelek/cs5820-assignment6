const express = require('express');
const path = require("path");
const router = express.Router();

router.get('/barchart', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/barchart/barchart.html'));
});

router.get('/scatterplot', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/barchart/barchart.html'));
});

module.exports = router;