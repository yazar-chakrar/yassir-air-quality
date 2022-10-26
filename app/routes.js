/*jshint esversion: 8*/
const express = require('express');
//Routes
const {iqair} = require('../api/routes/iqair');
const aqis = require('../api/routes/aqis');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/iqair', iqair);
    app.use('/api/aqis', aqis);
};