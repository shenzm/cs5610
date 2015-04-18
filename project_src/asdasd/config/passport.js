var LocalStrategy   = require('passport-local').Strategy;
var UserModel       = require('../app/models/user');

module.exports = function(passport) {

    // passport session setup ==================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });


    // LOCAL LOGIN =============================================================

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },
        function(email, password, done) {

            UserModel.findOne({ 'email' : email }, function(err, user) {

                if (err){
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'No User Found'});
                }

                if (!user.validPassword(password)){
                    return done(null, false, {message: 'Wrong password'});
                }

                return done(null, user);
            });

        }));

};