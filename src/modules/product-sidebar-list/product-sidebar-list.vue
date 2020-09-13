<template>
  <div
    v-if="items.length > 0"
    class="sidebar__section"
  >
    <div class="sidebar__inner">
      <div class="sidebar__header">
        <div class="sidebar__header-title">
          {{ title }}
        </div>
      </div>
      <div class="sidebar__main">
        <div class="sidebar__list">
          <div
            v-for="(item, index) in items"
            :key="`title-${index}`"
            class="sidebar__item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
