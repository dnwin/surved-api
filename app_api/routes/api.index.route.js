"use strict";
/**
 * Index for '/v1/api/*' entry point
 */

const express = require('express');
const router = express.Router();

router.get('/questions', (req, res) => {
    res.json({
        message: 'success'
    })
});

module.exports = router;
