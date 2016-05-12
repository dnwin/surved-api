/**
 * Created by dennis on 2/1/16.
 */
var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');


describe('Employees REST Api', function() {



    it('Should respond with index', function(done) {
        request(app)
            .get('/')
            .expect(200, done)
    });
});