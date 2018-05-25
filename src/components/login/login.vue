<template>
  <div class="login">
    <form class="form" @submit.prevent="submit">
      <div class="input-container border-1px">
        <input class="account border-1px" type="text" placeholder="账号">
      </div>
      <div class="input-container border-1px">
        <input class="password border-1px" type="text" placeholder="密码">
      </div>
      <div class="btn-container">
        <input class="submitBtn" type="submit" value="登录">
      </div> 
    </form>
    <div class="help">
      <span>忘记密码?</span>
      <span>新用户注册</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
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
    z-index: 100
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
        .account, .password
          width: 100%
          height: 50px
          outline: none
          background: transparent
          color: $color-text
        .account::placeholder, .password::placeholder
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
</style>
