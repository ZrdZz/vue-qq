import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const mutationTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_END: 'FETCH_END',
  USER_LOGIN: 'USER_LOGIN',
  SET_MESSAGE: 'SET_MESSAGE'
}

export default new Vuex.Store({
  // 全局状态, 包括用户信息、请求状态、响应消息
  state: {
    isFetching: false,
    userInfo: {},
    // 0成功, 1失败
    msg: {
      msgType: 0,    
      msgContent: ''
    }
  },
  mutations: {
    [mutationTypes.FETCH_START](state) {
      state.isFetching = true
    },
    [mutationTypes.FETCH_END](state) {
      state.isFetching = false
    },
    [mutationTypes.SET_MESSAGE](state, payload) {
      state.isFetching = false
      state.msg = {
        msgType: payload.msgType,
        msgContent: payload.msgContent
      }
    }
  },
  actions: {
    async login({commit}, {account, password}) {
      commit(mutationTypes.FETCH_START)
      // let res = await axios.put('/login', {account, password})
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})