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
    SurveyModel = require('../models/survey.model'),
    SurveyClientModel = require('../models/survey.client.model.js');

const Survey = new SurveyModel();
const SurveyController = new RestControllerClass(Survey);

const listAll = (req, res) => SurveyController.listAll(req, res);
const readOne = (req, res) => SurveyController.readOne(req, res);
const createOne = (req, res) => SurveyController.createOne(req, res);
const updateOne = (req, res) => SurveyController.updateOne(req, res);
const deleteOne = (req, res) => SurveyController.deleteOne(req, res);


// Use a custom Survey model class that returns nested data for app use by a client client.
const SurveyClient = new SurveyClientModel();
const SurveyClientController = new RestControllerClass(SurveyClient);

const listAllForClient = (req, res) => SurveyClientController.listAll(req, res);



module.exports = {
    listAll : listAll,
    readOne : readOne,
    createOne : createOne,
    updateOne : updateOne,
    deleteOne : deleteOne,
    listAllForClient : listAllForClient
};

