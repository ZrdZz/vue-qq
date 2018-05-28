const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const config = require('../config/index')
const main = require('./api/main')
// const setting = require('./api/setting')

const app = new Koa()
const router = new Router()
const HOST = process.env.HOST || config.build.host
const PORT = process.env.PORT || config.build.port

app.use(BodyParser())

router.use('/', main.routes(), main.allowedMethods())
// router.use('/setting', setting.routes(), setting.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

mongoose.connect('mongodb://localhost/QQusers', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(PORT, HOST, function(err) {
      if (err) {
        console.error('err:', err)
      } else {
        console.info(`server is running at ${HOST}:${PORT}`)
      }
    })
  }
})