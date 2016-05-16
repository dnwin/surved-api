/**
 * Created by dennis on 5/15/16.
 */
"use strict";

/**
 * Questions Table
 * Single question belonging to a survey. A question has many possible answers.
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var QuestionType = sequelize.define("QuestionType", {
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
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    }, {
        instanceMethods: {
            initWithData: function(data) {
                this.name = data.name;
            }
        },
        classMethods: {
            associate: function(models) {
                QuestionType.hasMany(models.Question, {
                    foreignKey: 'QuestionTypes_id'
                });
            }
        }
    });

    return QuestionType;
};
