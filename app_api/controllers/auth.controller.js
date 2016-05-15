/**
 * Created by dennis on 3/26/16.
 */

/**
 * Authentication controller containing registration, login, logout.
 */

"use strict";
const 
    UserModel = require('../models/user.model'),
    util = require('../util/util.js'),
    passport = require('passport');

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
            util.sendJsonResponse(res, 201, _generateJwtResponse(user));
        })
        .catch((err) => {
            util.sendJsonResponse(res, 400, err);
        });
};

const loginUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
        const err = util.genErr('username and password fields both required');
        util.sendJsonResErr(res, err);
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            util.sendJsonResponse(res, 400, err);
            return;
        }

        if (user) {
            util.sendJsonResErr(res, status, _generateJwtResponse(user));
        } else {
            // User is unauthorized
            util.sendJsonResponse(res, 401, info);
        }
    })(req, res);
};


const _generateJwtResponse = (userInstance) => {
    return {
        token: UserModel.generateJwt(userInstance)
    }
};

module.exports = {
    registerUser : registerUser,
    loginUser : loginUser
};