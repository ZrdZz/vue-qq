const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  nickname: String,
  account: String,
  password: String
})