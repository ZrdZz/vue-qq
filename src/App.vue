<template>
  <div class="app">
    <router-view name="login"></router-view>
    <router-view name="main"></router-view>
    <popup :popLevel="popLevel" :popText="popText"></popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Popup from 'base/popup/popup'
  
  export default {
    computed: mapState({
      popLevel: state => state.popup.popLevel,
      popText: state => state.popup.popText
    }),
    components: {
      Popup
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
