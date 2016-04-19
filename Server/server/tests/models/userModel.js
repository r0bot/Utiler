'use strict';

var should = require('should'),
    User = require('./.././User/User');

var CorrectUser, wrongUser;

describe('User Model Unit Tests:', function() {
    before(function(done) {

        done();
    });

    describe('Save User without twitterID', function() {
        it('should give error', function(done) {
            wrongUser = new User({
                firstName: 'Full',
                lastName: 'Name',
                displayName: 'Full Name',
                email: 'test@test.com',
                username: 'wrong',
                password: 'password',
                provider: 'twitter'
            });

            wrongUser.save(function (err) {
                should.exist(err);
                done();
            });
        });
    });

    describe('Save User user with correct data', function() {
        it('should pass', function(done) {
            CorrectUser = new User({
                firstName: 'Full',
                lastName: 'Name',
                displayName: 'Full Name',
                email: 'test@test.com',
                username: 'correct',
                password: 'password',
                provider: 'twitter',
                twitterID: '12345'
            });
            CorrectUser.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    describe('Method Find', function() {
        it('should find at least one user', function(done) {
            User.find({}, function(err, users) {
                users.should.have.lengthOf(1);
                done();
            });
        });
    });

    after(function(done) {
        User.remove().exec(done);
    });
});