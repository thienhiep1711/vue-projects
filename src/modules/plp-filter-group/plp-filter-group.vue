<template>
  <div>
    <h3>{{ filter.label }}</h3>

    <PlpFilterCheckbox
      v-for="filterValue in filter.values"
      :key="filterValue.key"
      v-model="selectedCheckboxes"
      :value="filterValue.key"
    />
  </div>
</template>

<script>
import PlpFilterCheckbox from 'modules/plp-filter-checkbox/plp-filter-checkbox.vue'

export default {
  components: {
    PlpFilterCheckbox
  },
  props: {
    filter: {
      type: Object,
      required: true
    },
    selectedValues: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    selectedCheckboxes: {
      get () {
        return this.selectedValues
      },
      set (newValue) {
        this.$emit('change', {
          id: this.filter.filterOptionId,
          value: newValue
        })
      }
    }
  }
}
</script>
