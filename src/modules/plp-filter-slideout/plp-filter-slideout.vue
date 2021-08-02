<template>
  <div
    v-if="isMobile"
    class="plp__scaffold"
  >
    <h2>Plp Filter Slideout</h2>

    <PlpActiveFilters />

    <PlpFilterList />
  </div>
</template>

<script>
import PlpActiveFilters from 'modules/plp-active-filters/plp-active-filters.vue'
import PlpFilterList from 'modules/plp-filter-list/plp-filter-list.vue'

export default {
  components: {
    PlpActiveFilters,
    PlpFilterList
  }
}
</script>
