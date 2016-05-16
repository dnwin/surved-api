/**
 * Created by dennis on 5/16/16.
 */
/**
 * QuestionType RESTful Controller
 */
"use strict";
const
    RestControllerClass = require('./rest.sqlmodel.controller.class'),
    QuestionTypeModel = require('../models/question-type.model');

const QuestionType = new QuestionTypeModel();
const QuestionTypeController = new RestControllerClass(QuestionType);

const listAll = (req, res) => QuestionTypeController.listAll(req, res);
const readOne = (req, res) => QuestionTypeController.readOne(req, res);
const createOne = (req, res) => QuestionTypeController.createOne(req, res);
const updateOne = (req, res) => QuestionTypeController.updateOne(req, res);
const deleteOne = (req, res) => QuestionTypeController.deleteOne(req, res);

module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne
};

