const Router = require('koa-router')
const user = require('./user')
const setting = require('./setting')

const main = new Router()

main.use(user.routes(), user.allowedMethods())
main.use(setting.routes(), user.allowedMethods())

module.exports = main

