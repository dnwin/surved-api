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
const surveyRoute = require('./admin/survey.admin.route'),
    questionRoute = require('./admin/question.admin.route'),
    questionTypeRoute = require('./admin/question-type.admin.route'),
    answerRoute = require('./admin/answer.admin.route'),
    userAnswerRoute = require('./admin/user-answer.admin.route');

router.use('/surveys', surveyRoute);
router.use('/questions', questionRoute);
router.use('/questiontypes', questionTypeRoute);
router.use('/answers', answerRoute);
router.use('/useranswers', userAnswerRoute);

module.exports = router;
