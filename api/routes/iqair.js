/*jshint esversion: 8*/
const express = require('express');
const Joi = require('joi');
const route = express.Router();
const config = require('config');
const axios = require('axios');

route.get('/', async (req, res) => {
    const { error } = validate(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const response = await axios.get(
            config.get('iqair_url'),
            {
                params: {
                    lat :req.query.lat,
                    lon: req.query.lon,
                    key: config.get('IQAIR_API_KEY')
                }
            }
        );
        body = response.data;
        res.send({
            "Result":
                {
                    "pollution": body.data.current.pollution
                }
            //    _.pick(body, ["data.current.pollution"])
        });
    } catch (err) {
        if (err.response){
            //we won't tell client if prblm is caused by: FORBIDEN/KEY-INCORECT/KEY-EXPIRED...
            // client should know only if City not found || Too many reqs
            if (err.response.data.data.message == "city_not_found"){
                res.status(400).send({
                    "message": "city_not_found"
                });
            }else if (err.response.data.data.message == "Too Many Requests"){
                res.status(400).send({
                    "message": "Too Many Requests"
                });
            }else{
                console.log("WARNNING: ", err.response.data);
                res.status(500).send({
                    "message": "Somthing faild on the server." //err.response.data
                });
            }
        }else{
            console.log("WARNNING: ", err.message);
            res.status(500).send({
                "message": "Somthing faild on the server."
            });
        }
    }
});

function validate(req){
    const schema= Joi.object({
        lat: Joi.number().min(-90).max(90).required(),
        lon: Joi.number().min(-180).max(180).required()
    });
    return schema.validate(req);
}

exports.iqair = route;
exports.validate = validate;