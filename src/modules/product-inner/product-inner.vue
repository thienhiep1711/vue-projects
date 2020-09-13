<template>
  <div class="wrapper">
    <div class="inner">
      <product-sidebar
        :colors="getColors"
        :categories="getCategories"
      />
      <div class="content">
        <product-topbar />
        <div class="products">
          <div class="grid grid--4">
            <product-item
              v-for="product in productFiltered"
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
      return this.createFilterByCollection('color', this.productFiltered)
    },
    getCategories () {
      return this.createFilterByCollection('collection', this.productFiltered)
    },
    productFiltered () {
      return this.products
    }
  },
  methods: {
    createFilterByCollection (key, products) {
      const arr = []
      products.map((product) => {
        const isExits = arr.some(item => product[key] === item)
        if (!isExits) {
          arr.push(product[key])
        }
      })
      return arr
    }
  }
}
</script>
