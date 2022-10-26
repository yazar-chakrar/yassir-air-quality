/*jshint esversion: 8 */
const express = require('express');
const app = express();

require('./app/logging')();
require('./app/conf')();

//conf
require('./app/db')();
//MyCrons
if(process.env.NODE_ENV != 'test') {
    require('./app/crons');
}
//myRoutes
require('./app/routes')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`INFO: Listening on port ${port}...`));


module.exports = server;