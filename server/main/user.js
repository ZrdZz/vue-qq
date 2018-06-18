const Router = require('koa-router')
const User = require('../../models/User')
const {md5, responseClient} = require('../util.js')

const user = new Router()

// 登录
user.post('session', async(ctx) => {
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
    let user = await User.findOne({account, password}).select({__v: 0, _id: 0, password: 0})
    if (user) {
      ctx.session.userInfo = {account, password}
      responseClient(ctx, 200, 0, '登录成功', user)
    } else {
      responseClient(ctx, 400, 1, '用户名或密码错误')
    }
  } catch (e) {
    responseClient(ctx)
  }
})

// 自动登录
user.get('session', async(ctx) => {
  if (ctx.session.userInfo) {
    responseClient(ctx, 200, 0, '已登录', ctx.session.userInfo)
  } else {
    responseClient(ctx, 200, 1, '请重新登陆')
  }
})

// 登出
// user.delete('session', async(ctx) => {})

// 注册
user.post('user', async(ctx) => {
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
      let newUser = await User.create({nickname, account, password})
      let data = {
        nickname: newUser.nickname,
        account: newUser.account,
      }
      responseClient(ctx, 200, 0, '注册成功', data)
    }
  } catch (e) {
    responseClient(ctx)
  }
})

// 修改信息
user.patch('user', async(ctx) => {
  let account = ctx.request.query.id
  let userinfo = ctx.request.body

  try {
    let setting = await User.update({account: account}, userinfo).exec()
    if (setting) {
      responseClient(ctx, 200, 0, '保存成功')
    } else {
      responseClient(ctx)
    }
  } catch (e) {
    responseClient(ctx)
  }
})

module.exports = user