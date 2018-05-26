const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  username: String,
  account: String,
  password: String
})