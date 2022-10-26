/*jshint esversion: 8*/
const mongoose = require('mongoose');
const Joi = require('joi');

const aqiShema = mongoose.Schema({
    datetime: {
        type: Date
    },
    city: {
        type: String
    },
    result: {
        type: mongoose.Schema({
            ts: {
                type: Date,
                required: true,
            },
            aqius: {
                type: Number,
                required: true,
                min: 0,
            },
            mainus: {
                type: String,
                required: true,
            },
            aqicn: {
                type: Number,
                required: true,
                min: 0,
            },
            maincn: {
                type: String,
                required: true,
            }
        })
    }
});

const Aqi = mongoose.model('Aqis', aqiShema);

exports.Aqi = Aqi;