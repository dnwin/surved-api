/**
 * Created by dennis on 3/26/16.
 */

/**
 * Authentication controller containing registration, login, logout.
 */

"use strict";
const 
    UserModel = require('../models/user.model'),
    util = require('../util/util.js');

const User = new UserModel();

/**
 * Registers a new user
 * @param req
 * @param res
 */
const registerUser = (req, res) => {
     const data = req.body;
    // Check for required fields
     
    if (!data.firstName || !data.lastName || !data.password || !data.email) {
        const err = util.genErr('Values for: username, lastName, ' +
            'firstName, password are required', 400);
        util.sendJsonResErr(res, err);
        return;
    }
    
    User
        .create(data)
        .then((user) => {
            const tokenBody = {};
            try {
                tokenBody.token = UserModel.generateJwt(user);
            }
            catch(err) {
                throw err
            }
            
            util.sendJsonResponse(res, 201, tokenBody);
        })
        .catch((err) => {
            util.sendJsonResponse(res, 400, err);
        });
};

const loginUser = (req, res) => {

};



module.exports = {
    registerUser : registerUser,
    loginUser : loginUser
};