<template>
  <div class="header">
    <div class="user-img" @click="settingShow">
      <img src="../../common/images/default.png" width="40" height="40"/>
    </div>
    <h2 class="title"> {{title}} </h2>
    <img class="head-img" width="30" height="30" src="../../common/images/add.png"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Setting from 'components/setting/setting'
  import eventHub from '../../eventHub'

  export default {
    data() {
      return {
        title: '消息'
      }
    },
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
    height: 50px
    justify-content: space-between
    align-items: center
    color: $color-text
    background: $color-background-b
    img 
      margin-left: 10px
      border-radius: 50%
    h2
      font-size: $font-size-large
      font-weight: 100
    .head-img
      margin-right: 10px
</style>
