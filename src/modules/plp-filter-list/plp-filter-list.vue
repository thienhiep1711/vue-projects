<template>
  <div class="plp__scaffold">
    <h3>Plp Filter List</h3>

    <PlpSort
      v-if="isMobile"
      v-model="localSortOrder"
      :sort-options="sortOptions"
      @change-sort="changeSort"
    />

    <template
      v-for="filter in filters"
    >
      <PlpFilterGroup
        v-if="filter.displayType === 'list'"
        :key="filter.filterOptionId"
        :filter="filter"
        :selected-values="localSelectedValues[filter.filterOptionId]"
        @change="onChange"
      />
    </template>

    <button @click="onApplyFilters">
      Apply Filters
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from 'config/plp'
import PlpFilterGroup from 'modules/plp-filter-group/plp-filter-group.vue'
import PlpSort from 'modules/plp-sort/plp-sort.vue'

export default {
  components: {
    PlpFilterGroup,
    PlpSort
  },
  data () {
    return {
      localSelectedValues: {},
      localSortOrder: null,
      sortOptions: config.collection.sort_options
    }
  },
  computed: {
    ...mapState('plp', ['filters', 'selectedValues', 'isMobile', 'sortOrder'])
  },
  watch: {
    selectedValues (newValue) {
      this.localSelectedValues = newValue
    }
  },
  beforeMount () {
    this.initLocalSelectedFilters()
    this.localSortOrder = this.sortOrder
  },
  methods: {
    initLocalSelectedFilters () {
      const availableFilterIds = this.filters.map(filter => filter.filterOptionId)
      const newSelectedValues = {}

      for (const filterId of availableFilterIds) {
        newSelectedValues[filterId] = this.selectedValues[filterId] || []
      }

      this.localSelectedValues = newSelectedValues
    },
    onChange ({ id, value }) {
      this.localSelectedValues = {
        ...this.localSelectedValues,
        [id]: value
      }
      if (value.length === 0) {
        delete this.localSelectedValues[id]
      }
    },
    onApplyFilters () {
      this.applyFilters({
        selectedValues: this.localSelectedValues,
        sort: this.localSortOrder
      })
    },
    changeSort (value) {
      if (this.localSortOrder !== value) {
        this.localSortOrder = value
      }
    },
    ...mapActions('plp', ['applyFilters'])
  }
}
</script>
