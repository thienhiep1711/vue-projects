<template>
  <div class="plp__scaffold plp-sort">
    <div
      v-if="isMobile"
      class="plp-sort__radio"
    >
      <div
        v-for="option in sortOptions"
        :key="option.value"
        class="plp-sort__radio-item"
      >
        <input
          :id="option.value"
          type="radio"
          name="plp-sort-radio"
          class="plp-sort__radio-input"
          :value="option.value"
          :checked="option.value === modelValue"
          @change="onChange($event)"
        >
        <label
          :for="option.value"
          class="plp-sort__radio-label"
        >
          {{ option.title }}
        </label>
      </div>
    </div>
    <div
      v-else
      class="plp-sort__select"
    >
      <select
        @change="onChange($event)"
      >
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    sortOptions: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange (event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>
