"use strict";
/**
 * Index for '/v1/api/*' entry point
 */

const express = require('express');
const router = express.Router();

const surveyRoute = require('./client/survey.client.route.js');

router.use('/surveys', surveyRoute);

module.exports = router;
