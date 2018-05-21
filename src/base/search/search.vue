<template>
  <div class="search"> 
    <i class="icon-search"></i>
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
    font-size: $font-size-medium
    background: $color-background-g
    color: $color-background-gg
    i 
      display: inline-block
      vertical-align: text-bottom
</style>
