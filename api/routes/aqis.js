/*jshint esversion: 8*/
const express = require('express');
const Joi = require('joi');
const { Aqi } = require('../models/aqi');
const route = express.Router();
const config = require('config');

route.get('/max', async (req, res) => {
    const aqi = await Aqi.findOne({name: config.get('cron_city.name')}).select('datetime -_id').sort('-result.aqius').limit(1);
    res.send(aqi);
});

module.exports = route;