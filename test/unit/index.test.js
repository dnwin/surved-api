/**
 * Created by dennis on 3/5/16.
 */
'use strict';

var expect = require('expect.js');

describe('models/index', function () {
    var models = require('../../app_api/sqlmodels');

    it('returns the user model', function () {
        expect(models.User).to.be.ok();
    });
});
