/**
 * Created by Z7 on 2017/10/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var WeiboStrategy = require('passport-weibo').Strategy
var GitHubStrategy = require('passport-github').Strategy
var WeixinStrategy = require('passport-github').Strategy

passport.serializeUser(function (user, done) {
  console.log('---    serializeUser   ---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log('---    deserializeUser   ---')
  done(null, obj);
});

// 中间件
passport.use(new GitHubStrategy({
    clientID: '480d23b6053238e152b8',
    clientSecret: '66a038e212b57279cce356a5c6ee13e1f0621bbe',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log('---  GitHubStrategy  ----')
    console.log(profile)
    return cb(null, profile);
  }
));

passport.use('loginByWeixin', new WeixinStrategy({
  clientID: 'wx4ca7b1cbfbf9c3c7'
  , clientSecret: 'c3bdea770631b1ddd83d1659f2c20939'
  , callbackURL: 'http://127.0.0.1:3000/auth/weixin/callback'
  , requireState: false
  , scope: 'snsapi_login'
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

passport.use(new WeiboStrategy({
    clientID: '2655634137',
    clientSecret: '6ab6964e44eba44ec1c87a26564b2e0a',
    callbackURL: "http://localhost:3000/auth/weibo/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    return done(err, profile);
  }
));



// github
router.get('/github', passport.authenticate('github'));
router.get('/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}),
  function (req, res) {
    console.log('---- success  ---')
    console.log(req.user)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });
// 微博
// router.get('/weibo', passport.authenticate('weibo'));
// router.get('/weibo/callback',
//   passport.authenticate('weibo', {failureRedirect: '/'}),
//   function (req, res) {
//     console.log('---- success  ---')
//     console.log(req.user)
//     req.session.user = {
//       id: req.user.id,
//       username: req.user.displayName || req.user.username,
//       avatar: req.user._json.avatar_url,
//       provider: req.user.provider
//     };
//     res.redirect('/');
//   });
// 微信
router.get('/weixin', passport.authenticate('loginByWeixin'));
router.get('/weixin/callback',
  passport.authenticate('weixin', {failureRedirect: '/'}),
  function (req, res) {
    console.log('---- success  ---')
    console.log(req.user)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})


module.exports = router