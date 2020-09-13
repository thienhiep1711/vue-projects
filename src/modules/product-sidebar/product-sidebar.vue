<template>
  <div class="sidebar">
    <div class="sidebar__wrap">
      <product-sidebar-list
        v-if="categories.length > 0"
        :items="categories"
        title="Collection"
      />
      <product-sidebar-list
        v-if="colors.length > 0"
        :items="colors"
        title="Color"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    }
  }
}
</script>
