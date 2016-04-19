'use strict';

var should = require('should'),
    config = require('./../../../config/config'),
    Status = require('./.././Status/Status');

var CorrectStatus, wrongStatus;

describe('Status Model Unit Tests:', function() {
    before(function(done) {

        done();
    });

    describe('Save status without userID', function() {
        it('should give error', function(done) {
            wrongStatus = new Status({
                statusID: '12345',
                statusData: {test:'test'}
            });

            wrongStatus.save(function (err) {
                should.exist(err);
                done();
            });
        });
    });

    describe('Save Status with correct data', function() {
        it('should pass', function(done) {
            CorrectStatus = new Status({
                userID: '1234',
                statusID: '12345',
                statusData: {test:'test'}
            });
            CorrectStatus.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    describe('Find Status', function() {
        it('should find at least one status', function(done) {
            Status.find({}, function(err, statuses) {
                statuses.should.have.lengthOf(1);
                done();
            });
        });
    });

    after(function(done) {
        Status.remove().exec(done);
    });
});