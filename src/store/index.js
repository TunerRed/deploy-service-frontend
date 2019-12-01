import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem('username'),
    isLogin: isNaN(localStorage.getItem('token'))
  },
  mutations: {
    'username': function (state, val) {
      state.username = val
    },
    'isLogin': function (state, val) {
      state.isLogin = val
    }
  }
})

export default store
