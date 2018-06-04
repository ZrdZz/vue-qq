const mongoose = require('mongoose')
const settingSchema = require('../schemas/userSetting')

module.exports = mongoose.model('UserSetting', settingSchema)