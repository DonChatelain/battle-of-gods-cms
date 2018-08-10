const { Strategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models');

module.exports = function (passport) {
  const opts = {};
  opts.secretOrKey = process.env.BOG_AUTH_SECRET;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(new Strategy(opts, function (payload, done) {
    User.findOne({ id: payload.id }, (err, user) => {
      if (err || !user) return done(err, false);
      return done(null, user);
    })
  }));
}