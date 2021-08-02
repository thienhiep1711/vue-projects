<template>
  <div class="plp__scaffold">
    <h3>Plp Filter Panel</h3>

    <PlpFilterList />
  </div>
</template>

<script>
import PlpFilterList from 'modules/plp-filter-list/plp-filter-list.vue'

export default {
  components: {
    PlpFilterList
  }
}
</script>
