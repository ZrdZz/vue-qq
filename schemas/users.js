const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSetting = require('../models/UserSetting')

module.exports = Schema({
  nickname: String,
  account: String,
  password: String,
  setting: [{type: Schema.Types.ObjectId, ref: 'UserSetting'}]
})