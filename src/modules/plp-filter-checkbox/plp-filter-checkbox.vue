<template>
  <div>
    <label>
      <input
        type="checkbox"
        :value="value"
        :checked="isChecked"
        @change="onChange"
      >

      <span>{{ value }}</span>
    </label>
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
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    isChecked () {
      return this.modelValue.includes(this.value)
    }
  },
  methods: {
    onChange (e) {
      const newValue = [...this.modelValue]
      if (e.target.checked) {
        newValue.push(this.value)
      } else {
        newValue.splice(this.modelValue.indexOf(this.value), 1)
      }
      this.$emit('change', newValue)
    }
  }
}
</script>
