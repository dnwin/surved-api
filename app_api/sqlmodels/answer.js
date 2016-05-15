/**
 * Created by dennis on 5/15/16.
 */
"use strict";

/**
 * Answers Table
 * A possible answer to a question. Answer records can have nonunique names (
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Answer = sequelize.define("Answer", {
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
                Answer.belongsTo(models.Question, {
                    foreignKey: 'Questions_id'
                });
                Answer.belongsToMany(models.User, {
                    through : models.UserAnswer,
                    foreignKey: 'Answers_id'
                })
            }
        }
    });

    return Answer;
};
