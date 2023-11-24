const express = require('express');
const authController = require('./../controller/authController');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const Users = require('../model/users');
const BigNumber = require('bignumber.js');

router.get('/', authController.isWorking);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.use(session({
  secret: 'cat-plus-size',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
}));

router.get('/auth/google/success', isLoggedIn, async (req, res) => {
  let name = req.user.user.name;
  let id = req.user.user.id;

  const bigId = new BigNumber(id);
  const stringId = bigId.toString();
  const user = await Users.findOne({ where: { id: stringId } });

  if (!user) {
    return res.redirect('/error.html');
  }
  let jwt = req.user.token;

  console.log("User: " + JSON.stringify(req.user));

  res.redirect(`/logout.html?name=${encodeURIComponent(name)}&token=${encodeURIComponent(id)}&jwt=${encodeURIComponent(jwt)}`);
});

router.get('/auth/google/failure', (req, res) => {
  res.send('Tus credenciales son incorrectas');
});

router.use('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
