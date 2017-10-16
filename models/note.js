/**
 * Created by Z7 on 2017/10/16.
 */
var Sequelize = require('sequelize');
var path = require('path')
var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite' )
})
// 测试连接
// sequelize
//   .authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
// 创建表单
// Note.sync().then(() => {
//   // Table created
//   return Note.create({
//     text: 'hello hcc',
//   });
// });

// 查询全部
// Note.findAll({raw: true}).then(notes => {
//   console.log(notes)
// })

// 查询指定的id
// Note.findAll({raw: true, where: {id: 2}}).then(notes => {
//   console.log(notes)
// })

exports.Note = Note;