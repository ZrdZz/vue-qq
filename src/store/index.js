import Vue from 'vue'
import Vuex from 'vuex'
import {get, post, put} from 'common/js/fetch'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const mutationTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_END: 'FETCH_END',
  USER_LOGIN: 'USER_LOGIN',
  SET_POPUP: 'SET_POPUP',
  SET_USERINFO: 'SET_USERINFO'
}

export default new Vuex.Store({
  // 全局状态, 包括用户信息、请求状态、响应消息
  state: {
    userInfo: {},
    isFetching: false,
    popup: {
      popLevel: '',
      popText: ''
    }
  },
  mutations: {
    [mutationTypes.SET_POPUP](state, payload) {
      state.popup = {...payload}
    },
    [mutationTypes.FETCH_START](state) {
      state.isFetching = true
    },
    [mutationTypes.FETCH_END](state) {
      state.isFetching = false
    },
    [mutationTypes.SET_USERINFO](state, payload) {
      state.userInfo = {...state.userInfo, ...payload}
    }
  },
  actions: {
    async login({commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await post('/session', payload)
        if (res && res.code === 0) {
          var info = {
            nickname: res.data.nickname,
            account: res.data.account,
            password: res.data.password,
            ...res.data.setting
          }
          commit(mutationTypes.SET_POPUP, {popLevel: 'success', popText: res.message})
          commit(mutationTypes.SET_USERINFO, info)
        } else {
          commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: res.message})
          return
        }
        return info
      } catch (e) {
        console.log(e)
        commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: '用户名或密码错误'})
      } finally {
        commit(mutationTypes.FETCH_END)
      }
    },
    async register({commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await post('/user', payload)
        if (res && res.code === 0) {
          commit(mutationTypes.SET_POPUP, {popLevel: 'success', popText: res.message})
          commit(mutationTypes.SET_USERINFO, {account: res.data.account})
        } else {
          commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: res.message})
          return
        }
        return res
      } catch (e) {
        commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: '注册失败'})
      } finally {
        commit(mutationTypes.FETCH_END)
      }      
    },
    async autoLogin({commit}) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await get('/session')
        return res
      } catch (e) {
        console.log(e)
      } finally {
        commit(mutationTypes.FETCH_END)
      }      
    },
    async userSetting({state, commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = null
        let {account} = state.userInfo
        if ((Object.keys(state.userInfo).length <= 3)) {
          res = await post('/userinfo', payload, {params: {id: account}})
        } else {
          res = await put('/userinfo', payload, {params: {id: payload._id}})
        }
        if (res && res.code === 0) {
          commit(mutationTypes.SET_POPUP, {popLevel: 'success', popText: res.message})
          commit(mutationTypes.SET_USERINFO, payload)
        } else {
          commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: res.message})
          return
        }
        return res
      } catch (e) {
        commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: '保存失败'})
      } finally {
        commit(mutationTypes.FETCH_END)
      }       
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})