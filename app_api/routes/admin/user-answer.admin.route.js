/**
 * Created by dennis on 5/16/16.
 */
/**
 * UserAnswer Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    userAnswerCtrl = require('../../controllers/user-answer.controller');

router.get('/', userAnswerCtrl.listAll);
router.get('/:id', userAnswerCtrl.readOne);
router.post('/', userAnswerCtrl.createOne);
router.put('/:id', userAnswerCtrl.updateOne);
router.delete('/:id', userAnswerCtrl.deleteOne);

module.exports = router;