<template>
  <div class="loading">
    <i class="icon iconfont icon-loading" ref="load"></i>
    <p class="desc" v-show="show"> {{title}} </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: 'Loading...'
      },
      size: {
        type: String,
        default: '30'
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.$refs.load.style.fontSize = this.size + 'px'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    position: absolute
    display: flex
    top: 0
    left: 0
    bottom: 0
    right: 0
    justify-content: center
    align-items: center
    flex-direction: column
    background: $color-grey-cadetblue
    opacity: 0.5
    .icon
      color: $color-dark-cadetblue
      font-weight: 700
      animation: rotate 1.5s infinite 
    @keyframes rotate
      0% 
        transform: rotate(0)
      100% 
        transform: rotate(360deg)
    .desc
      margin-top: 10px
      line-height: 20px
      font-size: $fontsize-large-xx
      color: $color-dark-cadetblue
</style>
