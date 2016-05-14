/**
 * Created by dennis on 3/5/16.
 */
"use strict";

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        oauthId : {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        salt: DataTypes.STRING,
        hash: DataTypes.STRING(1500),
        role: {
          type: DataTypes.ENUM,
            allowNull: false,
            values: ['user', 'admin'],
            defaultValue: 'user'
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'pending', 'inactive'],
            defaultValue: 'pending'
        }
    }, {
        instanceMethods: {
            setPassword: function(password) {
                this.salt = crypto.randomBytes(16).toString('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
            },
            validPassword: function(password) {
                var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

                return this.hash === hash;
            }
        },
        classMethods: {
            associate: function(models) {
                
            }
        }
    });

    return User;
};
