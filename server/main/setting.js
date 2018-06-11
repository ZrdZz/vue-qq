const Router = require('koa-router')
const User = require('../../models/User')
const UserSetting = require('../../models/UserSetting')
const {responseClient} = require('../util.js')

const setting = new Router()

setting.post('setting', async(ctx) => {
  let account = ctx.request.query.id
  let userInfo = ctx.request.body

  try {
    // let userSetting = await UserSetting.create({...userInfo})
    // let user = await User.findOne({account: account})
    // 上面的写法将异步改为了串行, 应该将不相关的异步请求合并, 同时注册多个异步事件
    let [userSetting, user] = await Promise.all([
      UserSetting.create({...userInfo}),
      User.findOne({account: account})
    ])

    user.setting = userSetting
    let newUser = await user.save()
    if (newUser) {
      responseClient(ctx, 200, 0, '保存成功', {...userInfo, setting_id: userSetting._id})
    } else {
      responseClient(ctx)
    }
  } catch (e) {
    responseClient(ctx)
  }
})

setting.put('setting', async(ctx) => {
  let setting_id = ctx.request.query.id
  let userSetting = ctx.request.body

  try {
    let setting = await UserSetting.update({_id: setting_id}, {...userSetting}).exec()
    if (setting) {
      responseClient(ctx, 200, 0, '保存成功')
    } else {
      responseClient(ctx)
    }
  } catch (e) {
    responseClient(ctx)
  }
})

module.exports = setting