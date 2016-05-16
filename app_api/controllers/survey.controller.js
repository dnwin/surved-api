/**
 * Created by dennis on 5/15/16.
 */
/**
 * Survey RESTFul Controller
 * @type {*}
 */
"use strict";
const
    RestControllerClass = require('./rest.sqlmodel.controller.class'),
    SurveyModel = require('../models/survey.model');

const Survey = new SurveyModel();
const SurveyController = new RestControllerClass(Survey);

const listAll = (req, res) => SurveyController.listAll(req, res);
const readOne = (req, res) => SurveyController.readOne(req, res);
const createOne = (req, res) => SurveyController.createOne(req, res);
const updateOne = (req, res) => SurveyController.updateOne(req, res);
const deleteOne = (req, res) => SurveyController.deleteOne(req, res);

module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne
};

