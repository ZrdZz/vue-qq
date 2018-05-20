<template>
  <div class="tab">
    <!-- tag属性意思是router-link最后渲染为div, 默认为a -->
    <router-link class="tab-item" tag="div" to="/message">
      <span class="tab-link">消息</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/contact">
      <span class="tab-link">联系人</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/news">
      <span class="tab-link">新闻</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/dynamic">
      <span class="tab-link">动态</span>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .tab
    display: flex
    position: absolute
    bottom: 0
    width: 100%
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-d
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
