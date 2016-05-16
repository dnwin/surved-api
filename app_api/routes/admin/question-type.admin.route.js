/**
 * Created by dennis on 5/16/16.
 */
/**
 * QuestionType Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    questionTypeCtrl = require('../../controllers/question-type.controller');

router.get('/', questionTypeCtrl.listAll);
router.get('/:id', questionTypeCtrl.readOne);
router.post('/', questionTypeCtrl.createOne);
router.put('/:id', questionTypeCtrl.updateOne);
router.delete('/:id', questionTypeCtrl.deleteOne);

module.exports = router;