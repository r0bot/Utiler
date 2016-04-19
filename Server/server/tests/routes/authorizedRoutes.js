'use strict';

var should = require('should'),
    request = require('request'),
    expect = require('chai').expect,
    config = require('./../../../config/config');

var CorrectStatus, wrongStatus;

describe('Are API routes authentication protected:', function() {
    before(function(done) {
        done();
    });

    describe('Request to authenticated route should return 403', function() {
        it('should give Status 403', function(done) {
            request.get(config.baseUrl + '/api/users', function (err, res, body){
                expect(res.statusCode).to.equal(403);
                done();
            });
        });
    });

    after(function(done) {
        done();
    });
});