/**
 * Created by dennis on 5/13/16.
 */
const jwt = require('express-jwt');

/**
 * Middleware that checks for JWT authentication.
 * Uses JWT_SECRET env variable as the secret.
 * 
 * Request header needs to include provided token in the format:
 * Key: 'Authorization' Value: 'Bearer serverProvidedToken'
 */
const ensureAuthenticatedMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

module.exports = {
    middleware: ensureAuthenticatedMiddleware
};