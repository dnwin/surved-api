"use strict";

/**
 * Require the parent folder to return an object containing all schema models.
 * Example: const models = require(app_api/sqlmodels); 
 *          models.Users.findById(1);
 */
const 
    fs        = require("fs"),
    path      = require("path"),
    Sequelize = require("sequelize"),
    env       = process.env.NODE_ENV || "development",
    config    = require(path.join(__dirname, '..', '..', 'config', 'config-db.json'))[env],
    sequelize = new Sequelize(config.database, config.username, config.password, config),
    db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;