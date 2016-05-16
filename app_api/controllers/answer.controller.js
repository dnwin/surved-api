/**
 * Created by dennis on 5/16/16.
 */
/**
 * Answer RESTful Controller
 */
"use strict";
const
    RestControllerClass = require('./rest.sqlmodel.controller.class'),
    AnswerModel = require('../models/answer.model');

const Answer = new AnswerModel();
const AnswerController = new RestControllerClass(Answer);

const listAll = (req, res) => AnswerController.listAll(req, res);
const readOne = (req, res) => AnswerController.readOne(req, res);
const createOne = (req, res) => AnswerController.createOne(req, res);
const updateOne = (req, res) => AnswerController.updateOne(req, res);
const deleteOne = (req, res) => AnswerController.deleteOne(req, res);

module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne
};

