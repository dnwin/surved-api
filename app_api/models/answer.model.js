/**
 * Created by dennis on 5/15/16.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    bluebird = require('bluebird');

class Answer extends SequelizeModel {

    constructor() {
        const viewOptions = {
            where: {
                status: 'active'
            }
        };

        const processDataCallback = (build, data) => {
            const asyncCalls = [];
            SequelizeModel.buildManyToOne(build, data, models.Question, asyncCalls);

            return bluebird.all(asyncCalls);
        };
        // No processing after record creation
        super(models.Answer, viewOptions, processDataCallback);
    };
}

module.exports = Answer;