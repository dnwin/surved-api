/**
 * Created by dennis on 5/16/16.
 */
/**
 * UserAnswer RESTful Controller
 */
"use strict";
const
    RestControllerClass = require('./rest.sqlmodel.controller.class'),
    UserAnswerModel = require('../models/user-answer.model');

const UserAnswer = new UserAnswerModel();
const UserAnswerController = new RestControllerClass(UserAnswer);

const listAll = (req, res) => UserAnswerController.listAll(req, res);
const readOne = (req, res) => UserAnswerController.readOne(req, res);
const createOne = (req, res) => UserAnswerController.createOne(req, res);
const updateOne = (req, res) => UserAnswerController.updateOne(req, res);
const deleteOne = (req, res) => UserAnswerController.deleteOne(req, res);

module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne
};

