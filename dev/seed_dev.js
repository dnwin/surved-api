/**
 * Created by dennis on 5/15/16.
 */

"use strict";
const crypto = require('crypto');

const seedDev = () => {
    seedUser('admin@admin.com', 'admin', 'admin');
};

const seedUser = (email, password, role) => {
    const User = new (require('../app_api/models/user.model'))();
    const userBuild = {
        email: email,
        firstName: email,
        lastName: email,
        password: password
    };
    return User
        .create(userBuild)
        .then((user) => {
            user.status = 'active';
            user.role = role;
            return user.save();
        })
};


module.exports.seedDev = seedDev;