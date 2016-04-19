'use strict';

var should = require('should'),
    request = require('request'),
    expect = require('chai').expect,
    config = require('./../../../config/config');

var CorrectStatus, wrongStatus;

describe('Basic routes:', function() {
    before(function(done) {
        done();
    });

    describe('Test app entry route', function() {
        it('should give Status 200', function(done) {
            request.get(config.baseUrl + '/', function (err, res, body){
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });

    after(function(done) {
        done();
    });
});