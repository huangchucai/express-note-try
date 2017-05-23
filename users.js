var express = require('express');
//路由
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/abc', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
