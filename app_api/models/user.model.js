/**
 * Created by dennis on 5/13/16.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    jwt = require('jsonwebtoken');

class User extends SequelizeModel {

    constructor() {
        // Exclude salt, hash from default return values.
        const viewOptions = {
            where: {
                status: 'active'
             },
            attributes: {
                exclude: ['salt', 'hash']
            }
        };

        // No processing after record creation
        super(models.User, viewOptions, null);
    };

    /**
     * Generates a Json Web Token (JWT) from an instance of a sequelize User record.
     * @param userInstance
     * @returns {*}
     */
    static generateJwt(userInstance) {
        // Set expiry 7 days from token creation
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            id : userInstance.id,
            username: userInstance.username,
            email: userInstance.email,
            firstName: userInstance.firstName,
            lastName: userInstance.lastName,
            exp: parseInt(expiry.getTime() / 1000),
        }, process.env.JWT_SECRET);
    };

}

module.exports = User;