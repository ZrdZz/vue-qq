import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
        let res = await axios.post('/login', payload)
        if (res && res.data.code === 0) {
          commit(mutationTypes.SET_POPUP, {popLevel: 'success', popText: res.data.message})
          commit(mutationTypes.SET_USERINFO, {account: res.data.data.account})
        } else {
          commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: res.data.message})
        }
        return res
      } catch (e) {
        commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: '用户名或密码错误'})
      } finally {
        commit(mutationTypes.FETCH_END)
      }
    },
    async register({commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await axios.post('/register', payload)
        if (res && res.data.code === 0) {
          commit(mutationTypes.SET_POPUP, {popLevel: 'success', popText: res.data.message})
          commit(mutationTypes.SET_USERINFO, {account: res.data.data.account})
        } else {
          commit(mutationTypes.SET_POPUP, {popLevel: 'error', popText: res.data.message})
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
        let res = await axios.get('/autoLogin')
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
        let account = payload.account
        let config = {
          params: {
            id: account
          }
        }
        if (state.userInfo.account && (Object.keys(state.userInfo).length === 1)) {
          res = await axios.post('/setting', payload, config)
        } else {
          res = await axios.put('/setting', payload, config)
        }
        return res
      } catch (e) {
        console.log(e)
      } finally {
        commit(mutationTypes.FETCH_END)
      }       
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})