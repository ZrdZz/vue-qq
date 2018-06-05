const Router = require('koa-router')
const User = require('../../models/User')
const UserSetting = require('../../models/UserSetting')
const {responseClient} = require('../util.js')

const setting = new Router()

setting.post('setting', async(ctx) => {
  let account = ctx.request.query.account
  let userInfo = ctx.request.body
  try {
    let userInfo = new UserSetting({...userInfo})
    let newUserInfo = await userInfo.save()
    responseClient(ctx, 200, 0, '保存成功', newUserInfo)
  } catch (e) {
    responseClient(ctx)
  }
})

setting.put('setting', async(ctx) => {

})

module.exports = setting