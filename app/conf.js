/*jshint esversion: 6 */
const config = require('config');

module.exports = function(){
    if (!config.get('IQAIR_API_KEY')){
        throw new Error('FATAL ERROR: IQAIR_API_KEY not set.');
    }
};