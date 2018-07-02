<template>
  <div class="header">
    <div class="user-img" @click="settingShow">
      <img :src="userInfo.avatar" width="40" height="40"/>
    </div>
    <h2 class="title"> {{title}} </h2>
    <i class="icon iconfont icon-zengjia" @click="moreFeature($event)"></i>
    <div class="feature" v-show="show">
      <ul>
        <li class="feature-item">添加好友</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Setting from 'components/setting/setting'
  import {mapState} from 'vuex'
  import eventHub from 'common/js/eventHub'

  export default {
    data() {
      return {
        title: '消息',
        show: false
      }
    },
    computed: mapState([
      'userInfo'
    ]),
    methods: {
      changeTitle(title) {
        this.title = title
      },
      settingShow() {
        this.$router.push('/setting')
      },
      moreFeature(e) {
        e.stopPropagation()
        this.show = !this.show
      }
    },
    components: {
      Setting
    },
    created() {
      eventHub.$on('change-title', this.changeTitle)
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .header
    display: flex
    position: relative
    width: 100%
    height: 45px
    justify-content: space-between
    align-items: center
    color: $color-white
    background: linear-gradient(to right, $color-light-blue, $color-light-cadetblue)
    img 
      margin-left: 10px
      border-radius: 50%
    h2
      font-size: $fontsize-large
      font-weight: 100
    .icon
      font-size: $fontsize-large-xxx
      margin-right: 10px
    .feature
      position: absolute
      top: 45px
      right: 10px
      background: $color-grey-cadetblue
      .feature-item
        padding: 6px 10px
        color: $color-dark-grey
        border-1px($color-white)
      ul ::before
        position: absolute
        right: 5px
        top: -10px
        content: '';
        border-bottom: 10px solid $color-grey-cadetblue;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
</style>
