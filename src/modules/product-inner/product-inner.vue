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
              v-for="product in pageItems"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
        <div class="pagination">
          <pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-total="totalPages"
            @update-page="updateCurrentPage"
          />
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
  data () {
    return {
      currentPage: 0,
      pageSize: 8,
      pageItems: []
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
    },
    totalPages () {
      return Math.ceil(this.products.length / this.pageSize)
    }
  },
  beforeMount () {
    this.updatePageItems()
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
    },
    updateCurrentPage (pageNumber) {
      console.log(pageNumber)
      this.currentPage = pageNumber
      this.updatePageItems()
    },
    updatePageItems () {
      this.pageItems = this.productFiltered.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)

      if (this.pageItems.length === 0 && this.currentPage > 0) {
        this.updateCurrentPage(this.currentPage - 1)
      }
    }
  }
}
</script>
