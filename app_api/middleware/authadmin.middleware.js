/**
 * Created by dennis on 5/15/16.
 */
/**
 * Middleware that verifies an admin user after JWT authentication.
 */

"use strict";
const models = require('../sqlmodels');

const ensureAdmin = (req, res, next) => {
    const userId = req.payload.id;
    models.User
        .findById(userId)
        .then((user) => {
            if (!user) {
                next('no user found');
            } 
            
            // Unauthorized if not admin
            if (user.role !== 'admin') {
                const err = new Error('Unauthorized: User is not an admin');
                err.status = 404;
                next(err);
            }
            
            next();
        })
    
}

module.exports = {
    middleware: ensureAdmin
};