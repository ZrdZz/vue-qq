const crypto = require('crypto')

const MD5_SUFFIX = 'dckdhcJCSHC9AHNUSif刚上班才能健康水泥%&##@&&...'

/**
 * 0: 成功
 * 1: 数据不合法
 * 2: 客户端数据错误
 * 3: 后端错误
 */
module.exports = {
  md5: function(password) {
    let md5 = crypto.createHash('md5')
    return md5.update(password + MD5_SUFFIX).digest('hex')
  },
  responseClient(ctx, httpCode = 500, code = 3, message='服务端异常', data={}) {
    let responseData = {}
    responseData.code = code
    responseData.message = message
    responseData.data = data
    ctx.status = httpCode
    ctx.body = responseData
  }  
}