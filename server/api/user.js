const Router = require('koa-router')
const User = require('../../models/User')
const {md5, responseClient} = require('../util.js')

const user = new Router()

user.post('login', async(ctx) => {
  let {account, password} = ctx.request.body
  if (!account) {
    responseClient(ctx, 400, 2, '账号不能为空')
    return
  }
  if (!password) {
    responseClient(ctx, 400, 2, '密码不能为空')
    return
  }
  try {
    password = md5(password)
    let user = await User.findOne({account, password})
    if (user) {
      ctx.session.userInfo = user
      responseClient(ctx, 200, 0, '登录成功')
    } else {
      responseClient(ctx, 400, 1, '用户名或密码错误')
    }
  } catch (e) {
    responseClient(ctx)
  }
})

user.post('register', async(ctx) => {
  let {nickname, account, password, rePassword} = ctx.request.body
  if (!nickname) {
    responseClient(ctx, 400, 2, '昵称不可为空')
    return
  }
  if (!account) {
    responseClient(ctx, 400, 2, '账号不能为空')
    return
  }
  if (!password) {
    responseClient(ctx, 400, 2, '密码不可为空')
    return
  }
  if (password !== rePassword) {
    responseClient(ctx, 400, 2, '两次密码不一致')
    return
  }   
  try {
    let isRegister = await User.findOne({account})
    if (isRegister) {
      responseClient(ctx, 200, 1, '账号已存在')
      return
    } else {
      password = md5(password)
      let user = new User({
        nickname,
        account,
        password
      })
      let newUser = await user.save()
      let data = {
        nickname: newUser.nickname,
        account: newUser.account,
        password: newUser.password
      }
      responseClient(ctx, 200, 0, '注册成功', data)
    }
  } catch (e) {
    responseClient(ctx)
  }
})

user.get('autoLogin', async(ctx) => {
  if (ctx.session.userInfo) {
    responseClient(ctx, 200, 0, '已登录')
  } else {
    responseClient(ctx, 200, 1, '请重新登陆')
  }
})

module.exports = user