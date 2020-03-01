import store from 'lib/store'

export default () => {
  store.registerModule('test', {
    namespaced: true,
    state: {
      isActive: false
    },
    getters: {
      isActive (state) {
        return state.isActive
      }
    },
    mutations: {
      display (state) {
        state.isActive = true
      },
      hide (state) {
        state.isActive = false
      }
    },
    actions: {
      activate ({ commit }, payload) {
        commit('display')
      },
      hide ({ commit }) {
        commit('hide')
      }
    }
  })
}
