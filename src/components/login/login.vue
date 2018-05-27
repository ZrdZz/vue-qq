<template>
  <div class="login">
    <form class="form" @submit.prevent="submitLogin" v-show="loginForm">
      <div class="input-container border-1px">
        <input class="account border-1px" v-model="account" type="text" placeholder="账号">
      </div>
      <div class="input-container border-1px">
        <input class="password border-1px" v-model="password" type="text" placeholder="密码">
      </div>
      <div class="btn-container">
        <input class="submitBtn" type="submit" value="登录">
      </div> 
      <div class="help">
        <span>忘记密码?</span>
        <span @click="register">新用户注册</span>
      </div>
    </form>
    <div class="register" v-if="registerForm">
      <form class="form" @submit.prevent="submitRegister">
        <span class="prompt">账号应为8位数字, 密码应为8位到12位字母和数字</span>
        <div class="input-container border-1px">
          <input class="nickname border-1px" v-model="nickname" type="text" placeholder="昵称">
        </div>
        <div class="input-container border-1px">
          <input class="account border-1px" v-model.number="account" type="text" placeholder="账号">
        </div>
        <div class="input-container border-1px">
          <input class="password border-1px" v-model="password" type="text" placeholder="密码">
        </div>
        <div class="btn-container">
          <input class="submitBtn" type="submit" value="注册">
        </div> 
      </form>  
      <div class="return" @click="returnLogin">
        <img class="return-img" width="30" height="30" src="../../common/images/close.png"/> 
        <span class="return-text">返回</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        nickname: '',
        account: '',
        password: '',
        loginForm: true,
        registerForm: false
      }
    },
    methods: {
      submitLogin() {
        let data = {
          account: this.account,
          password: this.password
        }
        axios.post('/login', data).then((res) => {
          console.log(res)
        })
      },
      submitRegister() {
        if (!this.validator()) {
          return false
        }
        // let data = {
        //   nickname: this.nickname,
        //   account: this.account,
        //   password: this.password
        // }
        // axios.post('/register', data).then((res) => {

        // })
      },
      register() {
        this.loginForm = false
        this.registerForm = true
        this.nickname = ''
        this.account = ''
        this.password = ''
      },
      returnLogin() {
        this.loginForm = true
        this.registerForm = false
        this.nickname = ''
        this.account = ''
        this.password = ''
      },
      validator() {
        if (this.nickname || this.account || this.password) {
          this.popUp({popLevel: 'error', popText: '全部为必填项'})
          return false
        }
        // 验证账号
        if (!/^[1-9][0-9]{7}$/.test(this.account)) {
          this.popUp({popLevel: 'error', popText: '账号不合法'})
          return false
        }
        // 验证密码
        if (!/^(\w){8,12}$/.test(this.password)) {
          this.popUp({popLevel: 'error', popText: '密码位数不合法'})
          return false
        } else {
          // 正则表达式写的有点蠢
          if (!(this.password.match(/[^0-9]/) && this.password.match(/[^a-zA-Z]/))) {
            this.popUp({popLevel: 'error', popText: '密码必须包含两种不同的字符'})
            return false
          }
        }
        return true
      },
      ...mapMutations({
        popUp: 'SET_POPUP'
      })
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .login
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-image: url('login.jpg')
    background-position: center
    background-size: 200% 100%
    color: $color-text-d
    .form
      display: flex
      margin-top: 200px
      flex-direction: column
      align-items: center
      font-size: $font-size-large
      .input-container
        width: 80%
        border-1px($color-text-d)
        .account, .password, .nickname
          width: 100%
          height: 50px
          outline: none
          background: transparent
          color: $color-text-d
        .account::placeholder, .password::placeholder, .nickname::placeholder
          color: $color-text-d
      .btn-container
        width: 80%
        .submitBtn
          width: 100%
          height: 40px
          margin-top: 20px
          border: 1px solid
          border-radius: 5px
          background: transparent
          color: $color-text-d
      .help
        display: flex
        width: 80%
        margin: 5px auto
        justify-content: space-between
        font-size: $font-size-medium
        color: $color-text-b
    .register
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      .prompt
        width: 80%
        font-size: $font-size-medium
      .return
        position: absolute
        top: 10px
        left: 10px
        .return-img
          vertical-align: middle
        .return-text
          vertical-align: middle
</style>
