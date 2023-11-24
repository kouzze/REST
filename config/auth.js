const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const Users = require('../model/users');

require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    let user = await Users.findOne({ where: { id: profile.id } });

    if (!user) {
      user = await Users.create({
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
    }

    const token = user.generateJWT();

    return done(null, { token, user });
  }));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});