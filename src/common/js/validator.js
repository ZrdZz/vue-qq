/**
 * 例:
 * let validator = new Validator()
 * validator.add(['1234567435424245242'], [{strategy: 'length:8:12', errorMsg: '长度不对'},{strategy: 'passwordFormat', errorMsg: '格式不对'}])
 * let msg = validator.start()
 * console.log(msg)
 */

const strategies = {
  // 校验是否为空
  isNotEmpty: function(errorMsg, ...values) {
    let msg = values.every((value) => {
      return value !== '' 
    })
    if (!msg) {
      return errorMsg
    }
  },
  // 校验长度
  length: function(errorMsg, min, max, ...values) {
    max = +max
    min = +min
    let msg = values.every((value) => {
      return value.length >= min && value.length <= max
    })
    if (!msg) {
      return errorMsg
    }    
  },
  // 校验账号格式(8位数字)
  accountFormat: function(errorMsg, ...values) {
    let msg = values.every((value) => {
      return /^[1-9][0-9]{7}$/.test(value)
    })
    if (!msg) {
      return errorMsg
    }
  },
  // 校验密码格式(8-12位字符, 必须包含数字或字母)
  passwordFormat: function(errorMsg, ...values) {
    let msg = values.every((value) => {
      return value.match(/[^0-9]/) && value.match(/[^a-zA-Z]/)
    })
    if (!msg) {
      return errorMsg
    }    
  },
  // 校验两个值是否一致
  isEqual: function(errorMsg, value1, value2) {
    if (value1 !== value2) {
      return errorMsg
    }
  }
}

export default class Validator {
  constructor() {
    this.cache = []
  }

  // values为一个数组, 表示数据, rules为验证规则的数组
  add(values, rules) {
    let self = this

    for (let i = 0; i < rules.length; i++) {
      // 这句后面要加分号, 不然会提示rules[i] is not a function, 因为他把下面的自执行函数连起来了
      let rule = rules[i];
      (function(rule) {
        let strategyArr = rule.strategy.split(':')
        let errorMsg = rule.errorMsg

        self.cache.push(function() {
          let strategy = strategyArr.shift()
          strategyArr.unshift(errorMsg)
          strategyArr.push(...values)
          return strategies[strategy].apply(null, strategyArr)
        })
      })(rule)
    }
  }

  start() {
    for (let i = 0; i < this.cache.length; i++) {
      let msg = this.cache[i]()
      if (msg) {
        return msg
      }
    }
  }
}
