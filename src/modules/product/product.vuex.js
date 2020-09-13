import store from 'lib/store'
import { config } from 'lib/config'
import axios from 'axios'

export default () => {
  store.registerModule('product', {
    namespaced: true,
    state: {
      products: () => [],
      productFilterd: null,
      loaded: false,
      filtered: []
    },
    getters: {
      productFilterd (state) {
        return state.productFilterd ? state.productFilterd : state.products
      },
      loaded (state) {
        return state.loaded
      },
      getCurrentFilter (state) {
        return state.filtered
      }
    },
    mutations: {
      getProducts (state, payload) {
        state.products = payload
      },
      setFilter (state, payload) {
        const isExits = state.filtered.some((item) => item === payload)
        if (!isExits) {
          state.filtered.push(payload)
          state.productFilterd = state.products.filter((item) => item.collection === payload)
        }
      },
      removeFilter (state, payload) {
        const index = state.filtered.findIndex(item => item === payload)
        state.filtered.splice(index, 1)
        state.productFilterd = null
      },
      loaded (state, payload) {
        state.loaded = payload
      }
    },
    actions: {
      getProducts ({ commit }) {
        axios.get(`${config.api}/products`)
          .then(response => {
            commit('getProducts', response.data)
            commit('loaded', true)
          }).catch(error => {
            console.log(error)
          })
      },
      setFilter ({ commit }, payload) {
        commit('setFilter', payload)
      },
      removeFilter ({ commit }, payload) {
        commit('removeFilter', payload)
      }
    }
  })
}
