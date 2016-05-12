/**
 * Created by dennis on 3/19/16.
 */

var path = require('path');

var env = process.env.NODE_ENV || "development";
var dbconfig = require('./config-db.json');

var knex = require('knex')(dbconfig['knex' + env]);

module.exports = knex;