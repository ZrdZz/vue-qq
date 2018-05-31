<template>
  <div class="setting">
    <div class="title border-1px">
      <span class="return">
        返回
      </span>
      <span>
        编辑资料
      </span>
    </div>
    <div class="avatar setting-option border-1px">
      <img src='../../common/images/default.png' width="50" height="50">
      <div class="upload">
        <span class="text">上传头像</span>
        <input type="file" accept="image/*" class="inputfile">
      </div>
    </div>
    <div class="nickname setting-option border-1px">
      <span>昵称</span>
      <input type="text" v-model="nickname" class="nickname-input">
    </div>
    <div class="gender setting-option border-1px">
      <span>性别</span>
      <input type="radio" value="男" v-model="gender">
      <input type="radio" value="女" v-model="gender">
    </div>
    <div class="birthday setting-option border-1px">
      <span>出生日期</span>
    </div>
    <div class="location setting-option border-1px">
      <span>所在地</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        nickname: '',
        gender: ''
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .setting
    position: fixed
    display: flex
    flex-direction: column
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 100
    background: $color-background-g
    color: #000
    .title
      height: 35px
      line-height: 35px
      border-1px(#000)
    .setting-option
      height: 45px
      line-height: 45px
      padding-left: 20px
      border-1px(#000)
      background: $color-background-w
    .avatar
      display: flex
      height: 50px
      padding: 20px
      .upload
        position: relative
        width: 100px
        height: 50px
        margin-left: 20px
        .text
          position: absolute
          width: 100%
          height: 100%
          text-align: center
          line-height: 50px
          border-radius: 10px
          background: $color-background-b
        .inputfile
          opacity: 0
    .nickname
      .nickname-input
        margin-left: 10px
        outline: none
</style>
