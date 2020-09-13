<template>
  <div class="grid__item">
    <a
      :href="product.handle"
      class="product__item"
    >
      <div class="product__image">
        <image-lazy
          data-vue
          class="product__image-img"
          :cover="true"
          :image-url="product.image"
          :is-src-set="false"
        />
      </div>
      <div class="product__content">
        <strong class="product__vendor">
          {{ product.collection }}
        </strong>
        <h2 class="product__title">
          {{ product.title }}
        </h2>
        <div class="product__price">
          <div class="product__price-current">
            {{ product.price }}
          </div>
        </div>
        <div class="product-button">
          <div class="button button--secondary">Add To Cart</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
