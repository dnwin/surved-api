/**
 * Created by dennis on 5/15/16.
 */
"use strict";
const
    SequelizeModel = require('./sqlmodel.class'),
    models = require('../sqlmodels'),
    bluebird = require('bluebird');

class Survey extends SequelizeModel {

    constructor() {
        const viewOptions = {
            where: {
                status: 'active'
            }
        };
        
        // No processing after record creation
        super(models.Survey, viewOptions, null);
    };
}

module.exports = Survey;