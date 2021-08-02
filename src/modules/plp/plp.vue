<template>
  <div>
    <plp-filter-bar />
    <plp-filter-slideout />
    <plp-grid />
    <plp-pagination />
  </div>
</template>

<script>
export default {
  async created () {
    this.$store.dispatch('plp/init')
  }
}
</script>
