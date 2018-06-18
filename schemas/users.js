const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = Schema({
  nickname: String,
  account: String,
  password: String,
  avatar: String,
  gender: String,
  birthday: String,
  city: String,
  career: String,
  company: String,
  university: String
})