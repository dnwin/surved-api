/**
 * Created by dennis on 5/15/16.
 */
/**
 * Survey Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    surveyCtrl = require('../../controllers/survey.controller');

router.get('/', surveyCtrl.listAll);
router.get('/:id', surveyCtrl.readOne);
router.post('/', surveyCtrl.createOne);
router.put('/:id', surveyCtrl.updateOne);
router.delete('/:id', surveyCtrl.deleteOne);

module.exports = router;