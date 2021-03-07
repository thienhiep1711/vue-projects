<template>
  <div class="pagination">
    <div
      v-if="currentPage !== 0"
      class="pagination__item"
      @click="updateCurrentPage(currentPage - 1)"
    >
      Prev
    </div>
    <div class="pagination__item pagination__item--current">
      <span v-text="currentPage + 1" />
      <span>of</span>
      <span v-text="pageTotal" />
    </div>
    <div
      v-if="currentPage !== (pageTotal - 1)"
      class="pagination__item"
      @click="updateCurrentPage(currentPage + 1)"
    >
      Next
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: null
    },
    currentPage: {
      type: Number,
      default: null
    },
    pageTotal: {
      type: Number,
      default: null
    }
  },
  methods: {
    updateCurrentPage (page) {
      this.$emit('update-page', page)
    }
  }
}
</script>
