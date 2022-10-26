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

function validate(aqi){
    const schema = Joi.object({
        ts: Joi.date.required(),
        mainus: Joi.string().required(),
        maincn: Joi.string().required(),
        aqius: Joi.number().min(0).required(),
        aqicn: Joi.number().min(0).required(),
    });
    return schema.validate(aqi);
}

exports.Aqi = Aqi;
exports.validate = validate;