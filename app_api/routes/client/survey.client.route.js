/**
 * Created by dennis on 5/16/16.
 */
/**
 * QuestionType Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    surveyCtrl = require('../../controllers/survey.controller');

// Client can only GET
router.get('/', surveyCtrl.listAllForClient);

module.exports = router;