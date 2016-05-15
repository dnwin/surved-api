/**
 * Created by dennis on 5/15/16.
 */
"use strict";

/**
 * Surveys Table
 * Holds a group of questions.
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Survey = sequelize.define("Survey", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        description: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    }, {
        classMethods: {
            associate: function(models) {
                Survey.hasMany(models.Question, {
                    foreignKey: 'Surveys_id'
                })
            }
        }
    });

    return Survey;
};
