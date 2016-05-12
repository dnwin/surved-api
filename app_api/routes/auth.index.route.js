/**
 * Created by dennis on 3/22/16.
 */
"use strict";
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller.js');

router.post('/register', authCtrl.registerUser);

module.exports = router;