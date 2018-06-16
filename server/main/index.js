const Router = require('koa-router')
const user = require('./user')
const userinfo = require('./userinfo')

const main = new Router()

main.use(user.routes(), user.allowedMethods())
main.use(userinfo.routes(), user.allowedMethods())

module.exports = main

