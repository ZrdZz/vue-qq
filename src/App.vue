<template>
  <div class="app">
    <!-- 使用组件小写 -->
    <q-header></q-header>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import QHeader from 'components/q-header/q-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      QHeader,
      Tab
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
