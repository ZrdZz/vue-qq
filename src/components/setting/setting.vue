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
      <img src='../../common/images/default.png' width="50" height="50" ref="img">
      <div class="upload">
        <span class="text">上传头像</span>
        <input type="file" accept="image/*" class="inputfile" @change="readFile()">
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
      <input type="text" placeholder="例: 1997/01/13" v-model="birthday">
    </div>
    <div class="city setting-option border-1px">
      <span>地点</span>
      <city-picker @city="city = city"></city-picker>
    </div>
    <div class="career setting-option border-1px">
      <span>职业</span>
      <select v-model="career">
        <option disabled value="">请选择</option>
        <option>计算机/互联网/通信</option>
        <option>生产/工艺/制造</option>
        <option>医疗/护理/制药</option>
        <option>金融/银行/投资/保险</option>
        <option>商业/服务业/个体经营</option>
        <option>文化/广告/传媒</option>
        <option>娱乐/艺术/表演</option>
        <option>律师/法务</option>
        <option>教育/法务</option>
        <option>公务员/行政/事业单位</option>
        <option>模特</option>
        <option>空姐</option>
        <option>学生</option>
        <option>其他职业</option>
      </select>
    </div>
    <div class="company setting-option border-1px">
      <span>公司</span>
      <input type="text" v-model="company" class="company-input" placeholder="请填写全名">
    </div>
    <div class="university setting-option border-1px">
      <span>学校</span>
      <input type="text" v-model="university" class="university-input" placeholder="请填写全名">
    </div>
    <div class="btn" @click="save">保存</div> 
    <loading v-show="isFetching"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import CityPicker from 'components/citypicker/citypicker'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        avatar: '',
        nickname: '',
        gender: '',
        birthday: '',
        city: '',
        career: '',
        company: '',
        university: ''
      }
    },
    components: {
      CityPicker,
      Loading
    },
    methods: {
      back() {
        this.$router.back()
      },
      readFile() {
        let inputfile = document.querySelector('.inputfile')
        let file = inputfile.files[0]
        // 1MB = 1024KB = 1024*1024B(1MB和1Mb不一样, )
        if (file.size > 2 * 1024 * 1024) {
          this.popUp({popLevel: 'error', popText: '上传图片大于2M, 请重新选择'})
          return 
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        let self = this
        reader.onload = function() {
          self.$refs.img.src = this.result
        }
        reader.onerror = function() {
          self.popUp({popLevel: 'error', popText: '上传出错, 请重新上传'})
        }
      },
      save() {

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
    .career
      select 
        font-size: $fontsize-large
        appearance: none
        outline: none
        border: none
    .btn
      width: 100px
      height: 30px
      margin: 10px auto
      line-height: 30px
      text-align: center
      border-radius: 5px
      background: $color-light-cadetblue
</style>
