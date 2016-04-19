/*jslint node: true todo: true nomen: true*/
'use strict';

module.exports = function (app) {

    //Get authentication controller and plug isLoggedIn function as a middleware for routes that require authentication
    var authController = require('./../server/controllers/Authentication/AuthenticationController')(),
        //Get route definitions
        routes = require('./../server/routes'),
        auth = require('./../server/routes/auth')(),
        users = require('./../server/routes/api/users')(),
        googleApi = require('./../server/routes/api/googleApi')();

    //Basic app routes
    app.use('/', routes);
    app.use('/auth', auth);

    //Middleware to check if user is authenticated
    //app.use('/api/*', authController.isAuthenticated);
    app.use('/api/users', users);

    //Middleware to check if user is admin
    app.use('/api/admin/*', authController.isAdmin);

    //Google Api routes
    app.use('/api/google', googleApi);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        /*jslint unparam: true*/
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};