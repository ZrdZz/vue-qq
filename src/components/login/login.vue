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
        <div class="input-container border-1px">
          <input class="nickname border-1px" v-model="nickname" type="text" placeholder="昵称">
        </div>
        <div class="input-container border-1px">
          <input class="account border-1px" v-model="account" type="text" placeholder="账号">
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
    <popup :popLevel="popLevel" :popText="popText"></popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Popup from 'base/popup/popup'

  export default {
    data() {
      return {
        nickname: '',
        account: '',
        password: '',
        loginForm: true,
        registerForm: false,
        popLevel: 'error',
        popText: '警告'
      }
    },
    components: {
      Popup
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
      register() {
        this.loginForm = false
        this.registerForm = true
      },
      returnLogin() {
        this.loginForm = true
        this.registerForm = false
      }
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
          color: $color-text
        .account::placeholder, .password::placeholder, .nickname::placeholder
          color: $color-text-d
      .btn-container
        width: 80%
        .submitBtn
          width: 100%
          height: 40px
          margin-top: 20px
          border-radius: 5px
          background: $color-background-b
          color: $color-text
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
      .return
        position: absolute
        top: 10px
        left: 10px
        .return-img
          vertical-align: middle
        .return-text
          vertical-align: middle
          color: $color-text
</style>
