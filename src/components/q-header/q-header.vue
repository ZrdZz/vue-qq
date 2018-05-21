<template>
  <div class="header">
    <div class="user-img">
      <img src="./user.jpg" width="40" height="40"/>
    </div>
    <h2 class="title"> {{title}} </h2>
    <div>
      <i class="icon-settings"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      }
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
    i 
      margin-right: 10px
      font-size: $font-size-large
</style>
