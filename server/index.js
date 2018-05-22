const Koa = require('koa')
const config = require('../config/index')

const app = new Koa()
const HOST = process.env.HOST || config.build.host
const PORT = process.env.PORT || config.build.port

app.use(async(ctx) => {
  ctx.body = 'aaa'
  console.log(1111)
})

app.listen(PORT, HOST, () => {
  console.log('连接成功')
})