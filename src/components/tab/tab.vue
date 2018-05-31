<template>
  <div class="tab">
    <!-- tag属性意思是router-link最后渲染为div, 默认为a -->
    <router-link class="tab-item" tag="div" to="/message" @click.native="changeTitle">
      <img class="tab-img" src="../../common/images/message.png"/>
      <span class="tab-link">消息</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/contact" @click.native="changeTitle"> 
      <img class="tab-img" src="../../common/images/friends.png"/>
      <span class="tab-link">联系人</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/news" @click.native="changeTitle">
      <img class="tab-img" src="../../common/images/news.png"/>
      <span class="tab-link">新闻</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/dynamic" @click.native="changeTitle">
      <img class="tab-img" src="../../common/images/star.png"/>
      <span class="tab-link">动态</span>
    </router-link>
  </div>
</template>

<script>
  import eventHub from '../../eventHub'

  export default {
    methods: {
      changeTitle(e) {
        eventHub.$emit('change-title', e.currentTarget.lastChild.innerHTML)
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
      .tab-link
        padding-bottom: 5px
        color: $color-text-bl
      .tab-img
        width: 20px
        height: 20px
        margin: 3px
      &.router-link-active
        border-bottom: 2px solid $color-text-b
        .tab-link, i
          color: $color-text-b
</style>
