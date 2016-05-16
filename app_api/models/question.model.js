/**
 * Created by dennis on 5/15/16.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    bluebird = require('bluebird');

class Question extends SequelizeModel {

    constructor() {
        const viewOptions = {
            where: {
                status: 'active'
            }
        };

        const processDataCallback = (build, data) => {
            const asyncCalls = [];
            SequelizeModel.buildManyToOne(build, data, models.Survey, null, asyncCalls);
            SequelizeModel.buildManyToOne(build, data, models.QuestionType, null, asyncCalls);
            
            return bluebird.all(asyncCalls);
        };
        super(models.Question, viewOptions, processDataCallback);
    };
}

module.exports = Question;