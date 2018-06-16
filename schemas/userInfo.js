const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = Schema({
  avatar: String,
  nickname: String,
  gender: String,
  birthday: String,
  city: String,
  career: String,
  company: String,
  university: String
})