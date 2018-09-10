import passport from 'passport';
import LocalStrategy from 'passport-local';
// import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../../modules/users/user.model';
import constants from '../../config/constants';

const localOptions = {
  usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    } else if (!user.authenticateUser(password)) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(false, user);
  } catch (e) {
    return done(e, false);
  }
});

// jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOptions, async (payload, done) => {
  console.log("payload", payload)
  try {
    // Identify user by ID,
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user)
  } catch (e) {
    return done(e, false);
  }
})

//using different strategy

passport.use(localStrategy);
passport.use(jwtStrategy);

// exporting
export const authLocal = passport.authenticate('local', { session: false })
export const authJwt = passport.authenticate('jwt', { session: false })