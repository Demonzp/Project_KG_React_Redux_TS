// 'Passport-JWT' authentication.
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET_KEY,
    algorithms: ['HS256'],
};

module.exports = passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findOne({ _id: jwtPayload.sub });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        };
    } catch (err) {
        console.error(err);
    };
}));