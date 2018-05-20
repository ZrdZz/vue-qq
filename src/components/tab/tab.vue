<template>
  <div class="tab">
    <!-- tag属性意思是router-link最后渲染为div, 默认为a -->
    <router-link class="tab-item" tag="div" to="/message" @click.native="changeTitle">
      <i class="icon-bubble"></i>
      <span class="tab-link">消息</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/contact" @click.native="changeTitle"> 
      <i class="icon-user"></i>
      <span class="tab-link">联系人</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/news" @click.native="changeTitle">
      <i class="icon-eye"></i>
      <span class="tab-link">新闻</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/dynamic" @click.native="changeTitle">
      <i class="icon-star"></i>
      <span class="tab-link">动态</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    methods: {
      changeTitle(e) {
        let title = ''
        let node = e.target
        if (node.tagName === 'DIV') {
          title = node.lastChild.innerHTML
        }
        if (node.tagName === 'I') {
          title = node.nextSibling.nextSibling.innerHTML
        }
        if (node.tagName === 'SPAN') {
          title = node.innerHTML
        }
        this.$emit('changeTitle', title)
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .tab
    display: flex
    position: absolute
    bottom: 0
    width: 100%
    font-size: $font-size-small-s
    background: $color-background-w
    .tab-item
      display: flex
      flex: 1
      flex-direction: column
      justify-content: center
      align-items: center 
      i 
        padding: 8px
        font-size: $font-size-large
      .tab-link
        padding-bottom: 5px
        color: $color-text-d
      &.router-link-active
        border-bottom: 2px solid $color-text-b
        .tab-link, i
          color: $color-text-b
</style>
