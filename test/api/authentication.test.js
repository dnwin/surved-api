/**
 * Created by dennis on 5/12/16.
 */
"use strict";
const 
    app      = require('../../app'),
    Bluebird = require('bluebird'),
    expect   = require('expect.js'),
    request  = require('supertest');

describe('Authentication', function() {

    beforeEach(function() {
        this.models = require('../../app_api/sqlmodels');

        return Bluebird.all([
            this.models.User.destroy({
                where: {}
            })
        ])
    });

    const registrationBuild = {
        "firstName" :"test",
        "lastName" : "user",
        "email" : "test@user.com",
        "password" : "testpassword"
    };
    
    it('registers user successfully and returns a token', (done) => {
        request(app)
            .post('/auth/register')
            .send(registrationBuild)
            .then((res) => {
                expect(res.status).to.be(201);
                expect(res.body.token).to.be.ok();
                done();
            })
    });

    it('returns an error on missing email', (done) => {
        const copy = Object.assign({}, registrationBuild);
        delete copy.email;
        console.log(copy);
        request(app)
            .post('/auth/register')
            .send(copy)
            .then((res) => {
                expect(res.status).to.be(400);
                expect(res.body.message).to.contain("are required");
                done();
            })
    });
    
    it('responds with 401 when token is not provided for api route', (done) => {
        request(app)
            .get('/api/v1/questions')
            .then((res) => {
                expect(res.status).to.be(401);
                expect(res.text).to.contain("No authorization token was found");
                done();
            })
    });

    it('responds with 401 when token is not provided for admin route', (done) => {
        request(app)
            .get('/api/v1/admin')
            .then((res) => {
                expect(res.status).to.be(401);
                expect(res.text).to.contain("No authorization token was found");
                done();
            })
    });
    
});