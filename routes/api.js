var express = require('express');
var router = express.Router();

/* GET home page. */

// 所有note
router.get('/notes', (req, res, next) => {
  console.log('notes')
})

// 新增note
router.post('/notes/add', (req, res, next) => {
  console.log('add')
  res.send('add')
})

// 修改note
router.post('/notes/edit', (req, res, next) => {
  const cxt = req.body.note;
  res.send('cxt')
})

// 删除note
router.post('/notes/delete', (req, res, next) => {
  console.log('delete')
})

module.exports = router;
