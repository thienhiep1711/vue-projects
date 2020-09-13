<template>
  <div class="topbar">
    <div class="topbar__inner">
      <div
        v-for="(filter, index) in currentFilter"
        :key="index"
        class="topbar__item"
      >
        <div class="topbar__text">
          {{ filter }}
        </div>
        <div
          class="topbar__remove"
          @click="removeFilter(filter)"
        >
          x
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentFilter: 'product/getCurrentFilter'
    })
  },
  methods: {
    removeFilter (key) {
      this.$store.dispatch('product/removeFilter', key)
    }
  }
}
</script>
