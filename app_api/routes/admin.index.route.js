/**
 * Created by dennis on 5/13/16.
 */
"use strict";
/**
 * Index for '/admin/v1/*' entry point
 */

const express = require('express');
const router = express.Router();

router.get('/questions', (req, res) => {
    res.json({
        message: 'success'
    })
});

module.exports = router;
