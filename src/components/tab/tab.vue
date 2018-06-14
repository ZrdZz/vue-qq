<template>
  <div class="tab">
    <!-- tag属性意思是router-link最后渲染为div, 默认为a -->
    <router-link class="tab-item" tag="div" to="/message" @click.native="changeTitle">
      <i class="icon iconfont icon-xiaoxi"></i>
      <span class="tab-link">消息</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/contact" @click.native="changeTitle"> 
      <i class="icon iconfont icon-jieban"></i>
      <span class="tab-link">联系人</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/news" @click.native="changeTitle">
      <i class="icon iconfont icon-faxian"></i>
      <span class="tab-link">新闻</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/dynamic" @click.native="changeTitle">
      <i class="icon iconfont icon-shoucang"></i>
      <span class="tab-link">动态</span>
    </router-link>
  </div>
</template>

<script>
  import eventHub from 'src/eventHub'

  export default {
    methods: {
      changeTitle(e) {
        eventHub.$emit('change-title', e.currentTarget.lastChild.innerHTML)
      }
    },
    mounted() {
      let activeLink = document.querySelector('.router-link-active')
      if (activeLink) {
        activeLink.click()
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
    font-size: $fontsize-small
    background: $color-white
    .tab-item
      display: flex
      flex: 1
      flex-direction: column
      justify-content: center
      align-items: center 
      .tab-link
        padding-bottom: 5px
        color: $color-light-grey
      .icon
        font-size: $fontsize-large-xx
        margin: 3px
      &.router-link-active
        border-bottom: 2px solid $color-main-l
        .tab-link, i
          color: $color-main-l
</style>
