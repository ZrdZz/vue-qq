const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const config = require('../config/index')
const login = require('./login')

const app = new Koa()
const router = new Router()

app.use(BodyParser())

const HOST = process.env.HOST || config.build.host
const PORT = process.env.PORT || config.build.port

router.use('/login', login.routes(), login.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

mongoose.connect('mongodb://localhost/QQusers', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(PORT, HOST)
  }
})