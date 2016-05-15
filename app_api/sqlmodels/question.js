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
    var Question = sequelize.define("Question", {
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
        classMethods: {
            associate: function(models) {
                Question.belongsTo(models.Survey, {
                    foreignKey: 'Surveys_id'
                });
                Question.hasMany(models.Answer, {
                    foreignKey: 'Questions_id'
                });
            }
        }
    });

    return Question;
};
