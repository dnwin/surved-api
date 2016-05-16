/**
 * Created by dennis on 5/15/16.
 */
/**
 * Question Admin Router
 */
const
    express = require('express'),
    router  = express.Router(),
    questionCtrl = require('../../controllers/question.controller');

router.get('/', questionCtrl.listAll);
router.get('/:id', questionCtrl.readOne);
router.post('/', questionCtrl.createOne);
router.put('/:id', questionCtrl.updateOne);
router.delete('/:id', questionCtrl.deleteOne);

module.exports = router;