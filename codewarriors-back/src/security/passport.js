const User = require('../controllers/userController');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
module.exports = (passport) => {
    console.log('hani lenna...');
    let opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD';




    passport.use('admin-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findUserById(jwt_payload.data._id, (err, user) => {
            if (err) return done(err, false);
            if (user) {
                if (user.role === "admin")
                    return done(null, user);
                else
                    return done(null, false);
            }
            else {
                console.log(user);
                console.log(jwt_payload.data._id);
                console.log(opts.jwtFromRequest);
                return done(null, false);
            }
        });
    }));
    passport.use('others-rule', new JwtStrategy(opts, (jwt_payload, done) => {
        User.findUserById(jwt_payload.data._id, (err, user) => {
            if (err) return done(err, false);
            if (user) {
                if (user.role !== "admin")
                    return done(null, user);
                else
                    return done(null, false);

            } else {
                console.log(user);
                console.log(jwt_payload.data._id);
                console.log(opts.jwtFromRequest);
                return done(null, false);
            }
        });
    }));
};
