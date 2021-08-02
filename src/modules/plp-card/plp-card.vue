<template>
  <div class="plp__scaffold">
    <h3>Plp Card</h3>
    <p>{{ product.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
