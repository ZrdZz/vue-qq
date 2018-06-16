const mongoose = require('mongoose')
const settingSchema = require('../schemas/userInfo')

module.exports = mongoose.model('UserInfo', settingSchema)