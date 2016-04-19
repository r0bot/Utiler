/*jslint node: true todo: true nomen: true*/
'use strict';

module.exports = (function () {

    function getPublicUser(user) {
        //TODO add validation for missing user properties. Mark mandatory ones and add default values to the others.
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            country: user.country,
            city: user.city,
            postalCode: user.postalCode,
            address: user.address,
            phoneNumber: user.phoneNumber
        };
    }

    /**
     * @param userModel
     * @param done  {Error|error.BaseError}
     */
    function validateUserPasswordByModel(userModel, done) {
        if (typeof userModel.validPassword === 'function') {
            done(null, userModel.validPassword(userModel.password));
            return;
        }
        done(new Error('User model is missing validPassword method.'));
    }

    return {
        validateUserPasswordByModel: validateUserPasswordByModel,
        getPublicUser: getPublicUser
    };
}());