/**
 * Created by dennis on 3/19/16.
 */
"use strict";
/**
 * GENERAL FUNCTIONS
 */
const models = require('../sqlmodels');

/**
 * Generates a jsonApi compliant error message.
 * @param message
 * @param statusCode
 * @returns {{errors: *[]}}
 */
module.exports.genErr = (message, statusCode) => {

    var code = statusCode || 400;
    
    var errorJson =
    {
        "errors": [
            {
                "title": "Server Error",
                "detail": message,
                "code" : "API_ERR",
                "status" : code
            }
        ],
        "code": code,
        "message": message
    };
    return errorJson;
};





/**
 * CONTROLLER FUNCTIONS
 */
module.exports.sendJsonResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.sendJsonResErr = (res, err) => {
    module.exports.sendJsonResponse(res, err.code || 400, err);
};


/**
 * MODEL FUNCTIONS
 */

