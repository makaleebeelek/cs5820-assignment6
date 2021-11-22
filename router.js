const express = require('express');
const path = require("path");
const router = express.Router();

router.get('/barchart', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/barchart/barchart.html'));
});

router.get('/scatterplot', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/scatterplot/scatterplot.html'));
});

router.get('/areachart', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/areachart/areachart.html'));
});

router.get('/linechart', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/linechart/linechart.html'));
});

module.exports = router;