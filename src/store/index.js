import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curGroup: {}
  },
  mutations: {
    updateCurGroup(state, { gid, gname, gtype }) {
      state.curGroup = {
        gid,
        gname,
        gtype
      }
    }
  },
  getters: {
    curGroup: state => {
      return state.curGroup
    }
  },
  actions: {},
  modules: {}
})
