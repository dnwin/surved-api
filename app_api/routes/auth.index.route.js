/**
 * Created by dennis on 5/13/16.
 */
/**
 * Auth Router
 */

"use strict";
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller.js');

router.post('/register', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

module.exports = router;