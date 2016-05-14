/**
 * Created by dennis on 3/26/16.
 */

/**
 * Authentication controller containing registration, login, logout.
 */

"use strict";
const 
    userModel = require('../models/user.model'),
    util = require('../util/util.js');

/**
 * 
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
    
    userModel
        .register(data.email, data.firstName, data.lastName, data.password)
        .then((token) => {
            util.sendJsonResponse(res, 201, token);
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