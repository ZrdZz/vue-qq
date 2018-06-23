<template>
  <div class="header">
    <div class="user-img" @click="settingShow">
      <img :src="userInfo.avatar" width="40" height="40"/>
    </div>
    <h2 class="title"> {{title}} </h2>
    <i class="icon iconfont icon-zengjia"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import Setting from 'components/setting/setting'
  import {mapState} from 'vuex'
  import eventHub from 'common/js/eventHub'

  export default {
    data() {
      return {
        title: '消息'
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
  @import "~common/stylus/variable"

  .header
    display: flex
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
</style>
