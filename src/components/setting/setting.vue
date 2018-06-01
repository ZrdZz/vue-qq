<template>
  <div class="setting">
    <div class="top border-1px">
      <img>
      <span class="back" @click="back">
        返回
      </span>
      <span class="title">
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
      <label for="man">男</label>
      <input id="man" type="radio" value="男" v-model="gender">
      <label for="women">女</label>
      <input id="women" type="radio" value="女" v-model="gender">
    </div>
    <div class="birthday setting-option border-1px">
      <span>生日</span>
    </div>
    <div class="location setting-option border-1px">
      <span>地点</span>
      <city-picker></city-picker>
    </div>
    <div class="career setting-option border-1px">
      <span>职业</span>
    </div>
    <div class="company setting-option border-1px">
      <span>公司</span>
      <input type="text" v-model="company" class="company-input" placeholder="请填写全名">
    </div>
    <div class="university setting-option border-1px">
      <span>学校</span>
      <input type="text" v-model="university" class="university-input" placeholder="请填写全名">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CityPicker from 'components/citypicker/citypicker'

  export default {
    data() {
      return {
        nickname: '',
        gender: '',
        company: '',
        university: ''
      }
    },
    components: {
      CityPicker
    },
    methods: {
      back() {
        this.$router.back()
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
    background: $color-light-grey-sss
    color: #000
    .top
      position: relative
      height: 40px
      line-height: 40px
      padding-left: 20px
      border-1px(#000)
      .title
        position: absolute
        left: 50%
        transform: translate(-50%)
    .setting-option
      height: 45px
      line-height: 45px
      padding-left: 20px
      border-1px(#000)
      background: $color-white
      span 
        padding-right: 50px
      input 
        outline: none
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
          padding-right: 0
          border-radius: 10px
          background: $color-light-cadetblue
        .inputfile
          opacity: 0
    .location
      display
</style>
