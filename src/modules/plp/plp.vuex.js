import store from 'lib/store'
import Boost from 'lib/boost'
import { on } from 'lib/dom'
import { debounce } from 'lib/utils'
import config from 'config/plp'

const PRODUCTS_PER_PAGE = 10
const MOBILE_BREAKPOINT = 768

export default () => {
  const boostInstance = new Boost({
    shop: `${config.boost.endpoint}shop=${config.boost.shopName !== 'localhost:3000' ? config.boost.shopName : 'modibodi-dev-convert.myshopify.com'}`,
    limit: config.boost.pageLimit
  })

  const detechBreakPoint = () => window.innerWidth < MOBILE_BREAKPOINT

  store.registerModule('plp', {
    namespaced: true,
    state: {
      isMobile: detechBreakPoint(),
      isFilterDisplayed: false,
      selectedLayout: '',
      sortOrder: config.collection.default_sort_by,
      currentPage: 1,
      totalPages: 1,
      filters: [],
      selectedValues: {},
      products: []
    },
    getters: {
      appliedFilters (state) {
        // TODO: Return applied filters and their selected values
        // Build it from state.filters
        return {}
      }
    },
    mutations: {
      mutateIsFilterDisplayed (state, isFilterDisplayed) {
        state.isFilterDisplayed = isFilterDisplayed
      },
      mutateIsMobile (state, isMobile) {
        state.isMobile = isMobile
      },
      mutateSelectedLayout (state, selectedLayout) {
        state.selectedLayout = selectedLayout
      },
      mutateSortOrder (state, sortOrder) {
        state.sortOrder = sortOrder
      },
      mutateCurrentPage (state, page) {
        state.page = page
      },
      mutateTotalPages (state, totalPages) {
        state.totalPages = totalPages
      },
      mutateSelectedValues (state, selectedValues) {
        const newSelectedValues = {}

        // Ensure this is a complete clone of the object to prevent reactivity issues
        for (const [key, values] of Object.entries(selectedValues)) {
          newSelectedValues[key] = [...values]
        }

        state.selectedValues = newSelectedValues
      },
      mutateFilters (state, filters) {
        state.filters = filters
      },
      mutateProducts (state, products) {
        state.products = products
      }
    },
    actions: {
      init ({ dispatch }, payload = {}) {
        return dispatch('applyFilters', {
          ...payload,
          event_type: 'init'
        })
      },
      sort ({ dispatch }, payload = {}) {
        return dispatch('applyFilters', {
          ...payload,
          event_type: 'sort'
        })
      },
      async applyFilters ({ state, commit, dispatch }, payload = {}) {
        let response

        if (payload.sort) {
          commit('mutateSortOrder', payload.sort)
        } else {
          payload.sort = state.sortOrder
        }

        if (payload.page) {
          commit('mutateCurrentPage', payload.page)
        } else {
          commit('mutateCurrentPage', 1)
        }

        if (payload.selectedValues) {
          commit('mutateSelectedValues', payload.selectedValues)
        }

        if (state.filters) {
          payload.filters = state.filters
        }

        try {
          response = await boostInstance.fetch(payload)
        } catch (e) {
          // TODO: Handle error
          console.error(e)
        }

        commit('mutateFilters', response.filters)
        commit('mutateProducts', response.products)
        commit('mutateTotalPages', Math.ceil(parseInt(response.total_product) / PRODUCTS_PER_PAGE))
        dispatch('changeQueryUrl', payload)
      },
      changeQueryUrl (context, payload) {
        console.log('changeQuerry', payload)
        // TODO: Change browser URL using history pushState here
      },
      async goToPage ({ state, dispatch }, page) {
        const payload = {
          sort: state.sortOrder,
          selectedValues: state.selectedValues,
          page
        }

        return dispatch('applyFilters', payload)
      }
    }
  })

  on(
    'resize',
    debounce(() => {
      // TODO: Detect mobile breakpoint and commit to store
      store.commit('plp/mutateIsMobile', detechBreakPoint())
    }, 200),
    window
  )
}
