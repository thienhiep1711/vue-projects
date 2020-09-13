<template>
  <div
    v-if="loaded && products"
    class="container"
  >
    <product-inner
      :products="products"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loaded: 'product/loaded',
      products: 'product/productFilterd'
    })
  },
  created () {
    this.$store.dispatch('product/getProducts')
  }
}
</script>
