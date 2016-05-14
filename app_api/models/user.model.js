/**
 * Created by dennis on 5/12/16.
 */
"use strict";
const models = require('../sqlmodels'),
    jwt = require('jsonwebtoken'),
    User = models.User;

/**
 * Registers a new user.
 * @param username
 * @param email
 * @param firstName
 * @param lastName
 * @param password
 * @returns {Promise}
 */
const register = (email, firstName, lastName, password) => {
    const newUser = User.build({});
    
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.setPassword(password);
    
    const promiseCb = (resolve, reject) => {
        newUser.save()
            .then((user) => {
                resolve({
                    token: _generateJwt(user)
                })
            })
            .catch((err) => {
                reject(err);
            })
    };
    return new Promise(promiseCb);
};


//==================================== PRIVATE =====================================//
/**
 * Generates a JWT token from a user instance.
 * Returns a promise with the token.
 * @param userInstance
 * @returns {Promise}
 * @private
 */
const _generateJwt = (userInstance) => {
    // Set expiry 7 days from token creation
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign({
        userId : userInstance.userId,
        username: userInstance.username,
        email: userInstance.email,
        firstName: userInstance.firstName,
        lastName: userInstance.lastName,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};


module.exports = {
    register : register
};