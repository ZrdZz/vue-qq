<template>
  <div class="login">
    <form class="form" @submit.prevent="submitLogin" v-show="loginForm">
      <div class="input-container border-1px">
        <input class="account border-1px" v-model="account" type="text" placeholder="账号">
      </div>
      <div class="input-container border-1px">
        <input class="password border-1px" v-model="password" type="password" placeholder="密码">
      </div>
      <div class="btn-container">
        <input class="submitBtn" type="submit" value="登录">
      </div> 
      <div class="help">
        <span>忘记密码?</span>
        <span @click="registerPage">新用户注册</span>
      </div>
    </form>
    <div class="register" v-if="registerForm">
      <form class="form" @submit.prevent="submitRegister">
        <span class="prompt">账号应为8位数字, 密码应为8位到12位字母和数字</span>
        <div class="input-container border-1px">
          <input class="nickname border-1px" v-model="nickname" type="text" placeholder="昵称">
        </div>
        <div class="input-container border-1px">
          <input class="account border-1px" v-model="account" type="text" placeholder="账号">
        </div>
        <div class="input-container border-1px">
          <input class="password border-1px" v-model="password" type="password" placeholder="密码">
        </div>
        <div class="input-container border-1px">
          <input class="password border-1px" v-model="rePassword" type="password" placeholder="重复密码">
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
    <loading v-show="isFetching"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  // import axios from 'axios'
  import Loading from 'base/loading/loading'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import validator from 'common/js/validator'
  import {putToDB, getFromDB} from 'common/js/store'

  export default {
    data() {
      return {
        nickname: '',
        account: '',
        password: '',
        rePassword: '',
        loginForm: true,
        registerForm: false
      }
    },
    components: {
      Loading
    },
    computed: mapState([
      'isFetching'
    ]),
    methods: {
      submitLogin() {
        let verifyData = [
          [[this.account, this.password], [{strategy: 'isNotEmpty', errorMsg: '账号密码不能为空'}]]
        ]
        if (this.validator(verifyData)) {
          return
        }
        let data = {
          account: this.account,
          password: this.password
        }
        this.login(data)
          .then((res) => {
            if (res && res.data.code === 0) {
              // 登录时将其填充到vuex, 并保存到本地存储
              this.setUserInfo({...res.data.data})
              putToDB(res.data.data)
              this.$router.push('/message')    
            }
          })
          .catch((e) => {
            this.popUp({popLevel: 'error', popText: '服务器维护中'})
          })
      },
      submitRegister() {
        let verifyData = [
          [[this.nickname, this.account, this.password, this.rePassword], [{strategy: 'isNotEmpty', errorMsg: '各选项不能为空'}]],
          [[this.account], [{strategy: 'accountFormat', errorMsg: '账号不合法'}]],
          [[this.password], [{strategy: 'length:8:12', errorMsg: '密码位数不正确'}, {strategy: 'passwordFormat', errorMsg: '必须包含数字和字母'}]],
          [[this.password, this.rePassword], [{strategy: 'isEqual', errorMsg: '密码输入不一致'}]]
        ]
        if (this.validator(verifyData)) {
          return
        }
        let data = {
          nickname: this.nickname,
          account: this.account,
          password: this.password,
          rePassword: this.rePassword
        }
        this.register(data)
          .then((res) => {
            if (res && res.data.code === 0) {
              this.returnLogin()
            }
          })
          .catch((e) => {
            this.popUp({popLevel: 'error', popText: '服务器维护中'})
          })
      },
      registerPage() {
        this.loginForm = false
        this.registerForm = true
        this.nickname = ''
        this.account = ''
        this.password = ''
        this.rePassword = ''
      },
      returnLogin() {
        this.loginForm = true
        this.registerForm = false
        this.account = ''
        this.password = ''
      },
      validator(data) {
        let errorMsg = validator(data)
        if (errorMsg) {
          this.popUp({popLevel: 'error', popText: errorMsg})
        }
        return errorMsg
      },
      ...mapMutations({
        popUp: 'SET_POPUP',
        setUserInfo: 'SET_USERINFO'
      }),
      ...mapActions([
        'login',
        'register'
      ])
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
    color: $color-white
    .form
      display: flex
      margin-top: 200px
      flex-direction: column
      align-items: center
      font-size: $fontsize-large-xx
      .input-container
        width: 80%
        border-1px($color-light-grey)
        .account, .password, .nickname
          width: 100%
          height: 50px
          outline: none
          background: transparent
          color: $color-white
        .account::placeholder, .password::placeholder, .nickname::placeholder
          color: $color-light-grey
      .btn-container
        width: 80%
        .submitBtn
          width: 100%
          height: 40px
          margin-top: 20px
          border: 1px solid
          border-radius: 5px
          background: transparent
          color: $color-light-cadetblue
      .help
        display: flex
        width: 80%
        margin: 5px auto
        justify-content: space-between
        font-size: $fontsize-medium
        color: $color-light-cadetblue
    .register
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      .prompt
        width: 80%
        font-size: $fontsize-medium
      .return
        position: absolute
        top: 10px
        left: 10px
        .return-img
          vertical-align: middle
        .return-text
          vertical-align: middle
</style>
