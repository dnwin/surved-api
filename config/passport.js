/**
 * Created by dennis on 1/25/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../app_api/sqlmodels');

var User = models.User;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            // Check for existing email
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username'
                });
            }

            // Check for pending account
            if (user.status == 'pending') {
                return done(null, false, {
                    message: "Account status is 'pending' and not yet activated."
                })
            }

            // Check for deactivated
            if (user.status == 'inactive') {
                return done(null, false, {
                    message: "Account is deactivated or deleted."
                })
            }

            // Check valid password hash
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password'
                })
            }
            // Success - Return the user object
            return done(null, user);
        }).catch(function(err) {
            done(err);
        });
    }
));

