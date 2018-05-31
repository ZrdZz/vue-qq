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
        <input class="submitBtn" type="submit" value="登录" :disabled="isDisable">
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
          <input class="submitBtn" type="submit" value="注册" :disabled="isDisable">
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

  export default {
    data() {
      return {
        nickname: '',
        account: '',
        password: '',
        rePassword: '',
        loginForm: true,
        registerForm: false,
        isDisable: false
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
        this.isDisable = true
        let verifyData = [
          [[this.account, this.password], [{strategy: 'isNotEmpty', errorMsg: '账号密码不能为空'}]]
        ]
        if (this.validator(verifyData)) {
          this.isDisable = false
          return
        }
        let data = {
          account: this.account,
          password: this.password
        }
        this.login(data)
          .then((res) => {
            if (res.data.code === 0) {
              this.popUp({popLevel: 'success', popText: res.data.message})
              this.$router.push('/message')
            } else {
              this.popUp({popLevel: 'error', popText: res.data.message})
            }
            this.isDisable = false
          })
          .catch((err) => {
            this.popUp({popLevel: 'error', popText: err})
            this.isDisable = false
          })
      },
      submitRegister() {
        this.isDisable = true
        let verifyData = [
          [[this.nickname, this.account, this.password, this.rePassword], [{strategy: 'isNotEmpty', errorMsg: '各选项不能为空'}]],
          [[this.account], [{strategy: 'accountFormat', errorMsg: '账号不合法'}]],
          [[this.password], [{strategy: 'length:8:12', errorMsg: '密码位数不正确'}, {strategy: 'passwordFormat', errorMsg: '必须包含数字和字母'}]],
          [[this.password, this.rePassword], [{strategy: 'isEqual', errorMsg: '密码输入不一致'}]]
        ]
        if (this.validator(verifyData)) {
          this.isDisable = false
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
            if (res.data.code === 0) {
              this.popUp({popLevel: 'success', popText: res.data.message})
              this.returnLogin()
            } else {
              this.popUp({popLevel: 'error', popText: res.data.message})
            }
            this.isDisable = false
          })
          .catch((err) => {
            this.popUp({popLevel: 'error', popText: err})
            this.isDisable = false
          })
      },
      registerPage() {
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
      validator(data) {
        let errorMsg = validator(data)
        if (errorMsg) {
          this.popUp({popLevel: 'error', popText: errorMsg})
        }
        return errorMsg
      },
      ...mapMutations({
        popUp: 'SET_POPUP'
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
