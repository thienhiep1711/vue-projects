<template>
  <div class="wrapper">
    <div class="inner">
      <product-sidebar
        :colors="getColors"
        :categories="getCategories"
      />
      <div class="content">
        <div class="topbar">
          <div class="topbar__inner">
            <div class="topbar__item">
              <div class="topbar__text">
                Jacket
              </div>
              <div class="topbar__remove">
                x
              </div>
            </div>
            <div class="topbar__item">
              <div class="topbar__text">
                Top
              </div>
              <div class="topbar__remove">
                x
              </div>
            </div>
            <div class="topbar__item">
              <div class="topbar__text">
                Sneaker
              </div>
              <div class="topbar__remove">
                x
              </div>
            </div>
            <div class="topbar__item">
              <div class="topbar__text">
                Jean
              </div>
              <div class="topbar__remove">
                x
              </div>
            </div>
          </div>
        </div>
        <div class="products">
          <div class="grid grid--4">
            <product-item
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getColors () {
      const arr = []
      this.products.map((product) => {
        const isExits = arr.some(item => product.collection === item)
        if (!isExits) {
          arr.push(product.collection)
        }
      })
      return arr
    },
    getCategories () {
      const arr = []
      this.products.map((product) => {
        const isExits = arr.some(item => product.color === item)
        if (!isExits) {
          arr.push(product.color)
        }
      })
      return arr
    }
  }
}
</script>
