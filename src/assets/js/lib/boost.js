// TODO: Remove hardcoded files. These are for demo purposes only
import { fetchData } from 'lib/shopify'
import config from 'config/plp'
const SELECTED_VALUES_KEY = 'selectedValues'

class Boost {
  constructor (options) {
    this.options = options
  }

  async fetch (payload) {
    if (!payload.event_type) {
      payload.event_type = 'filter'
    }

    if (!payload.page) {
      payload.page = 1
    }

    if (!payload.build_filter_tree) {
      payload.build_filter_tree = true
    }

    if (!payload.collection_scope) {
      payload.collection_scope = config.collection.id
    }

    if (!payload.selectedValues) {
      payload.selectedValues = ''
    }

    payload.t = Date.now()
    payload.limit = this.options.limit

    const buildURI = Object.entries(payload).map(([key, value]) => {
      if (key === SELECTED_VALUES_KEY && typeof payload[key] === 'object') {
        const selectedValuesURI = Object.keys(value).map(item => {
          const currentFilter = payload.filters.find(filter => filter.filterOptionId === item)
          const selectTypeString = Object.prototype.hasOwnProperty.call(currentFilter, 'selectType') ? currentFilter.selectType === 'multiple' ? '[]' : '' : ''
          return value[item].map(childValue => `${item}${selectTypeString}=${childValue}`).join('&')
        }).join('&')
        return `_=pf&${encodeURI(selectedValuesURI)}`
      } else if (key !== 'filters') {
        return `${key}=${encodeURI(value)}`
      }
    }).join('&')

    // TODO: Write AJAX code here to fetch from Boost API
    const endpoint = `${this.options.shop}&${buildURI}`
    const response = await fetchData(endpoint)

    return {
      products: response.products,
      filters: response.filter.options,
      total_product: response.total_product
    }
  }
}

export default Boost
