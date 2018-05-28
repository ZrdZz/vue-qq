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
  SET_MESSAGE: 'SET_MESSAGE',
  SET_POPUP: 'SET_POPUP'
}

export default new Vuex.Store({
  // 全局状态, 包括用户信息、请求状态、响应消息
  state: {
    isFetching: false,
    userInfo: {},
    // 0成功, 1失败
    // msg: {
    //   msgType: 0,    
    //   msgContent: ''
    // },
    popup: {
      popLevel: '',
      popText: ''
    }
  },
  mutations: {
    [mutationTypes.SET_POPUP](state, payload) {
      state.popup = {
        ...payload
      }
    },
    [mutationTypes.FETCH_START](state) {
      state.isFetching = true
    },
    [mutationTypes.FETCH_END](state) {
      state.isFetching = false
    }
    // [mutationTypes.SET_MESSAGE](state, payload) {
    //   state.isFetching = false
    //   state.msg = {
    //     ...payload
    //   }
    // }
  },
  actions: {
    async login({commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await axios.post('/login', payload)
        return res
      } catch (e) {
        console.log(e)
      } finally {
        commit(mutationTypes.FETCH_END)
      }
    },
    async register({commit}, payload) {
      commit(mutationTypes.FETCH_START)
      try {
        let res = await axios.post('/register', payload)
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