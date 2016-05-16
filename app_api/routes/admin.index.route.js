/**
 * Created by dennis on 5/13/16.
 */
"use strict";
/**
 * Index for '/admin/v1/*' entry point
 */

const express = require('express');
const router = express.Router();

// Routes
const surveyRoute = require('./admin/survey.admin.route');
const questionRoute = require('./admin/question.admin.route');

router.use('/surveys', surveyRoute);
router.use('/questions', questionRoute);

module.exports = router;
