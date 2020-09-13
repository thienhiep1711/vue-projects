import store from 'lib/store'
import { config } from 'lib/config'
import axios from 'axios'

export default () => {
  store.registerModule('product', {
    namespaced: true,
    state: {
      products: () => [],
      filterDefault: 'all',
      loaded: false
    },
    getters: {
      productFilterd (state) {
        return state.products
      },
      loaded (state) {
        return state.loaded
      }
    },
    mutations: {
      getProducts (state, payload) {
        state.products = payload
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
      }
    }
  })
}
