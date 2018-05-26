<template>
  <div class="main">
    <q-header></q-header>
    <search></search>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
