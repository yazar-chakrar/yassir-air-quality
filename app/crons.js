/*jshint esversion: 8*/
const cron = require('node-cron');

const air_qua_cron = require('../api/crons/air_quality');

cron.schedule('* * * * *', air_qua_cron);