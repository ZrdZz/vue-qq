<template>
  <div class="contact">
    <ul class="tap border-1px">
      <li @click="getFriends" :class="{active: styleTab}">好友</li>
      <li @click="getGroups" :class="{active: !styleTab}">群聊</li>
    </ul>
    <list :data="data"></list>
    <loading v-show="isFetching" size="40" :show="true"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from 'base/list/list'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        isFetching: false,
        data: [],
        styleTab: true
      }
    },
    components: {
      List,
      Loading
    },
    methods: {
      getFriends() {
        this.styleTab = true
        this.data = ['我的好友', '哈哈', '家人']
      },
      getGroups() {
        this.styleTab = false
        this.data = ['群组']
      }
    },
    created() {
      this.getFriends()
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .contact  
    position: absolute
    top: 80px
    left: 0
    right: 0
    bottom: 42px
    .tap
      display: flex
      border-1px($color-light-grey)
      li 
        flex: 1
        height: 35px
        line-height: 35px
        box-sizing: border-box
        text-align: center
      .active
        border-bottom: 2px solid $color-light-cadetblue
        color: $color-light-cadetblue
    .list
      position: absolute
      top: 36px
      bottom: 0
      left: 0
      right: 0
</style>
