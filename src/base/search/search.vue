<template>
  <div class="search"> 
    <span class="icon-search"></span>
    搜索 
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .search
    width: 95%
    height: 30px
    line-height: 30px
    margin: 5px auto
    text-align: center
    border-radius: 5px
    font-size: $fontsize-medium
    background: $color-light-grey-sss
    i 
      display: inline-block
      vertical-align: text-bottom
</style>
