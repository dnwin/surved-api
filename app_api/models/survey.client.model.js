/**
 * Created by dennis on 5/16/16.
 */
/**
 * Survey Client Model
 * This model, unlike 'survey.model', will return all survey results along with additional data.
 * Questions, Answers will be included along with the Survey in a nested format.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    bluebird = require('bluebird');

class SurveyClient extends SequelizeModel {

    constructor() {
        const viewOptions = {
            where: {
                status: 'active'
            },
            include: [
                {
                    model: models.Question,
                    required: false,
                    include: [
                        {
                            model: models.Answer,
                            required: false
                        }
                    ]
                }
            ]
        };

        // No processing after record creation
        super(models.Survey, viewOptions, null);
    };
}

module.exports = SurveyClient;