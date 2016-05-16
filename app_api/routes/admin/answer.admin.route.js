/**
 * Created by dennis on 5/16/16.
 */
/**
 * Answer Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    answerCtrl = require('../../controllers/answer.controller');

router.get('/', answerCtrl.listAll);
router.get('/:id', answerCtrl.readOne);
router.post('/', answerCtrl.createOne);
router.put('/:id', answerCtrl.updateOne);
router.delete('/:id', answerCtrl.deleteOne);

module.exports = router;