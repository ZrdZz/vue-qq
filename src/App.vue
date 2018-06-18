<template>
  <div class="app">
    <router-view name="login"></router-view>
    <router-view name="main"></router-view>
    <popup :popLevel="popLevel" :popText="popText"></popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations, mapActions} from 'vuex'
  import Popup from 'base/popup/popup'
  import {getFromDB} from 'common/js/store'
  
  export default {
    computed: mapState({
      popLevel: state => state.popup.popLevel,
      popText: state => state.popup.popText
    }),
    components: {
      Popup
    },
    methods: {
      ...mapMutations({
        popUp: 'SET_POPUP',
        setUserInfo: 'SET_USERINFO'
      }),
      ...mapActions([
        'autoLogin'
      ])
    },
    created() {
      this.autoLogin()
        .then((res) => {
          if (res && res.code === 0) {
            getFromDB(res.data.account)
              .then((userInfo) => {
                if (!userInfo) {
                  this.popUp({popLevel: 'success', popText: '请重新登陆'})
                  this.$router.replace('/login')
                  return                
                }
                this.popUp({popLevel: 'success', popText: res.message})
                this.setUserInfo(userInfo)
              })
              .catch(() => {
                this.popUp({popLevel: 'error', popText: '客户端错误'})
                this.$router.replace('/login')
              })
          } else {
            this.popUp({popLevel: 'error', popText: res.message})
            this.$router.replace('/login')
          }
        })
      .catch(() => {
        this.popUp({popLevel: 'error', popText: '客户端错误'})
        this.$router.replace('/login')
      })
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .app
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
</style>
