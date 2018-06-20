<template>
  <div class="list">
    <ul>
      <li class="group" v-for="(item, index) in data" :key="index"> 
        <i class="icon iconfont icon-xiangyoujiantou"></i> {{item}} <span> 8/10 </span>
        <ul>
          <li v-show="item.childData" v-for="(item, index) in item.childData" :key="index"> {{item.name}} </li>
        </ul> 
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .group
    width: 100%
    height: 35px
    line-height: 35px
    font-size: $fontsize-medium
    color: $color-grey
    background: $color-white
</style>
