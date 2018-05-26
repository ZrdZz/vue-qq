const Router = require('koa-router')

const login = new Router()

login.post('/', async(ctx) => {
  ctx.body = ctx.request.body
})

module.exports = login