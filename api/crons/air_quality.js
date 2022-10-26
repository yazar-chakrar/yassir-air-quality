/*jshint esversion: 8*/
const _ = require('lodash');
const axios = require('axios');
const {Aqi} = require('../models/aqi');
const config = require('config');

module.exports =  async (req, res) =>  {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3000/api/iqair",
            {
                params: config.get('cron_city.att')
            }
        );
        let aqi = new Aqi({
            datetime: Date.now(),
            city: config.get('cron_city.name'),
            result: _.pick(response.data.Result.pollution, ["ts", "aqius", "mainus", "aqicn", "maincn"])
        });
        aqi = await aqi.save();
        console.log(aqi);
    } 
    catch (error) {
        if (error.response) {
            console.log("WARNNING: Error air quality cron, air quality not saved / ErrorCode: "+error.response.status);
        } else{
            console.log("WARNNING: Request Error air quality cron");
        }
    }   
};