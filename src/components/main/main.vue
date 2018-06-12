<template>
  <div class="main">
    <q-header></q-header>
    <search></search>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import QHeader from 'components/q-header/q-header'
  import Search from 'base/search/search'
  import Tab from 'components/tab/tab'
  import Vue from 'vue'

  export default {
    components: {
      QHeader,
      Search,
      Tab
    },
    create() {
      Vue.prototype.account = '123456'
    }    
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"  
  
  .main
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-main
  .fade-enter-active, .fade-leave-active
    transition: all 0.3s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
