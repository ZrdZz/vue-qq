<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc"> {{title}} </p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
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
    background: $color-dark-grey
    opacity: 0.5
    .desc
      line-height: 20px
      font-size: $fontsize-small
      color: $color-white
</style>
