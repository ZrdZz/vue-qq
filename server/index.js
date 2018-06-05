const Koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')

const config = require('../config/index')
const main = require('./main/index')
// const feature = require('./api/setting')

const app = new Koa()
const router = new Router()
const HOST = process.env.HOST || config.build.host
const PORT = process.env.PORT || config.build.port

app.keys = ['some secret hurr']
app.use(koaStatic(path.join(__dirname, '..', 'dist')))
app.use(bodyParser())
app.use(session(app))

router.use('/', main.routes(), main.allowedMethods())
// router.use('/feature', feature.routes(), feature.allowedMethods())

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