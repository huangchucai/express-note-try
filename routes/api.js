var express = require('express');
var router = express.Router();
var Note = require('../models/note').Note;
/* GET home page. */

// 所有note
router.get('/notes', (req, res, next) => {
  Note.findAll({raw: true}).then((notes) => {
    res.send({status: 0, data:notes})
  })
})

// 新增note
router.post('/notes/add', (req, res, next) => {
  let note = req.body.note;
  Note.create({text: note}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

// 修改note
router.post('/notes/edit', (req, res, next) => {
  const note = req.body.note;
  Note.update({text: note}, {where: {id: req.body.id}}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

// 删除note
router.post('/notes/delete', (req, res, next) => {
  Note.destroy({where: {id:req.body.id}}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

module.exports = router;
