/**
 * Created by Z7 on 2017/10/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy

passport.serializeUser(function (user, done) {
  console.log('---    serializeUser   ---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log('---    deserializeUser   ---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: '480d23b6053238e152b8',
    clientSecret: '66a038e212b57279cce356a5c6ee13e1f0621bbe',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));


router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}),
  function (req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router