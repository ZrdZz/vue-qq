<template>
  <div class="app">
    <!-- 使用组件小写 -->
    <keep-alive>
      <q-header :title="title"></q-header>
    </keep-alive>
    <router-view></router-view>
    <tab @changeTitle="changeTitle"></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import QHeader from 'components/q-header/q-header'
  import Tab from 'components/tab/tab'

  export default {
    data() {
      return {
        title: '消息'
      }
    },
    methods: {
      changeTitle(title) {
        this.title = title
      }
    },
    components: {
      QHeader,
      Tab
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
