// 弹窗组件, 传入属性为等级popLevel、内容poptext和持续时间duration, 等级为success、warnning、error, 默认持续时间是1秒

<template>
  <transition name="slide-fade">
    <div class="popup" v-show="isShow" :class="color"> 
      <h1 class="level"> {{popLevel}} </h1>
      <p class="text"> {{popText}} </p>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

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
        default: 2000
      }
    },
    computed: {
      isShow() {
        return this.popLevel && this.popText
      },
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
    },
    methods: {
      ...mapMutations({
        popUp: 'SET_POPUP'
      })
    },
    // 这里有个小问题, 弹窗出来后会执行update, 消失后还会执行, 也就是说会执行两次
    updated() {
      setTimeout(() => {
        this.popUp({popLevel: '', popText: ''})
      }, this.duration)
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
    background: $color-light-greenyellow 
    .level
      margin: 10px
      font-size: $fontsize-large-xx
    .text
      margin: 10px
  .success
    color: $color-dark-deepgreen
  .warnning
    color: $color-light-yellow
  .error
    color: $color-light-red
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translate3d(0, -100%, 0)
    opacity: 0;
  }
</style>