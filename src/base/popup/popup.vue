// 弹窗组件, 传入属性为等级popLevel、内容poptext和持续时间duration, 等级为success、warnning、error, 默认持续时间是1秒
<template>
  <div class="popup" v-show="popText" :class="color"> 
    <h1 class="level"> {{popLevel}} </h1>
    <p class="text"> {{popText}} </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      popText: {
        type: String,
        default: ''
      },
      popLevel: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    computed: {
      color() {
        switch (this.popLevel) {
          case 'success':
            return 'success'
          case 'warnning':
            return 'warnning'
          case 'error':
            return 'error'
        }
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .popup
    position: fixed 
    top: 0
    left: 10px
    right: 10px
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
    background: $color-background-g
    .level
      margin: 10px
      font-size: 20px
    .text
      margin: 10px
  .success
    color: $color-success
  .warnning
    color: $color-warnning
  .error
    color: $color-error
</style>