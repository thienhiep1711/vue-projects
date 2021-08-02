<template>
  <section class="plp__scaffold">
    <h2>PLP Grid</h2>

    <plp-card
      v-for="product in products"
      :key="product.handle"
      :product="product"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PlpCard from 'modules/plp-card/plp-card.vue'

export default {
  components: {
    PlpCard
  },
  computed: {
    ...mapState('plp', ['products'])
  }
}
</script>
