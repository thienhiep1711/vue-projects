<template>
  <div class="plp__scaffold">
    <h2>Plp Filter Bar</h2>

    <button>Filter</button>

    <PlpFilterPanel
      v-if="!isMobile"
    />

    <PlpSort
      v-if="!isMobile"
      v-model="sortOrderModel"
      :sort-current="sortOrder"
      :sort-options="sortOptions"
    />

    <PlpActiveFilters
      v-if="!isMobile"
    />

    <PlpLayoutSwitcher />
  </div>
</template>

<script>
import PlpFilterPanel from 'modules/plp-filter-panel/plp-filter-panel.vue'
import PlpSort from 'modules/plp-sort/plp-sort.vue'
import PlpActiveFilters from 'modules/plp-active-filters/plp-active-filters.vue'
import PlpLayoutSwitcher from 'modules/plp-layout-switcher/plp-layout-switcher.vue'
import config from 'config/plp'
import { mapState } from 'vuex'

export default {
  components: {
    PlpFilterPanel,
    PlpSort,
    PlpActiveFilters,
    PlpLayoutSwitcher
  },
  data () {
    return {
      sortOptions: config.collection.sort_options
    }
  },
  computed: {
    ...mapState('plp', ['sortOrder']),
    sortOrderModel: {
      get () {
        return this.sortOrder
      },
      set (newValue) {
        return this.$store.dispatch('plp/sort', { sort: newValue })
      }
    }
  }
}
</script>
