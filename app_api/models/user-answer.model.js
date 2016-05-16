/**
 * Created by dennis on 5/15/16.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    bluebird = require('bluebird');

class UserAnswer extends SequelizeModel {

    constructor() {
        const viewOptions = {
            where: {
                status: 'active'
            }
        };

        const processDataCallback = (build, data) => {
            const asyncCalls = [];
            SequelizeModel.buildManyToOne(build, data, models.User, null, asyncCalls);
            SequelizeModel.buildManyToOne(build, data, models.Answer, null, asyncCalls);

            return bluebird.all(asyncCalls);
        };
        // No processing after record creation
        super(models.UserAnswer, viewOptions, processDataCallback);
    };
}

module.exports = UserAnswer;