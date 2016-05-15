/**
 * Created by dennis on 5/13/16.
 */
'use strict';

var expect = require('expect.js');

describe('models/index', function () {
    var models = require('../../app_api/sqlmodels');

    it('returns the user model', function () {
        expect(models.User).to.be.ok();
    });

    it('returns the survey model', function () {
        expect(models.Survey).to.be.ok();
    });

    it('returns the Question model', function () {
        expect(models.Question).to.be.ok();
    });

    it('returns the Answer model', function () {
        expect(models.Answer).to.be.ok();
    });

    it('returns the UserAnswer model', function () {
        expect(models.UserAnswer).to.be.ok();
    });

    it('returns the QuestionType model', function () {
        expect(models.QuestionType).to.be.ok();
    });
});
