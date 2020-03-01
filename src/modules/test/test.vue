<template>
  <div
    v-if="isActive"
    class="test-vue"
  >
    test
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('test', ['isActive'])
  },
  mounted () {
    console.log('test vue')
    this.$store.dispatch('test/hide')
  }
}
</script>
