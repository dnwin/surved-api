/**
 * Created by dennis on 5/15/16.
 */
"use strict";

/**
 * UserAnswers Table
 * Join table to record a user's selected answers.
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var UserAnswer = sequelize.define("UserAnswer", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
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
                UserAnswer.belongsTo(models.Answer, {
                    foreignKey: 'Answers_id'
                });
                UserAnswer.belongsTo(models.User, {
                    foreignKey: 'Users_id'
                });
            }
        }
    });

    return UserAnswer;
};
