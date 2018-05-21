<template>
  <div class="app">
    <!-- 使用组件小写 -->
    <q-header></q-header>
    <search></search>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import QHeader from 'components/q-header/q-header'
  import Search from 'base/search/search'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      QHeader,
      Search,
      Tab
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
