const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = Schema({
  nickname: String,
  account: String,
  password: String,
  setting: {type: Schema.Types.ObjectId, ref: 'UserInfo'}
})