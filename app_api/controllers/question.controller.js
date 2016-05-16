/**
 * Created by dennis on 5/15/16.
 */
/**
 * Question RESTful Controller
 */
"use strict";
const
    RestControllerClass = require('./rest.sqlmodel.controller.class'),
    QuestionModel = require('../models/question.model');

const Question = new QuestionModel();
const QuestionController = new RestControllerClass(Question);

const listAll = (req, res) => QuestionController.listAll(req, res);
const readOne = (req, res) => QuestionController.readOne(req, res);
const createOne = (req, res) => QuestionController.createOne(req, res);
const updateOne = (req, res) => QuestionController.updateOne(req, res);
const deleteOne = (req, res) => QuestionController.deleteOne(req, res);

module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne
};

