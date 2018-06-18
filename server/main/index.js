const Router = require('koa-router')
const user = require('./user')

const main = new Router()

main.use(user.routes(), user.allowedMethods())

module.exports = main

