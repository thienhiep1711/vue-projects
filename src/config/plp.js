export default {
  boost: {
    endpoint: 'https://services.mybcapps.com/bc-sf-filter/filter?',
    shopName: 'modibodi-dev-convert.myshopify.com',
    pageLimit: 10
  },
  collection: {
    id: 261880873110,
    title: 'Products',
    url: '/collections/bikini',
    default_sort_by: 'title-ascending',
    sort_options: [
      {
        value: 'manual',
        title: 'Featured',
        shortName: 'Feature'
      },
      {
        value: 'best-selling',
        title: 'Best selling',
        shortName: 'Best sellin'
      },
      {
        value: 'title-ascending',
        title: 'Alphabetically, A-Z',
        shortName: 'A-Z'
      },
      {
        value: 'title-descending',
        title: 'Alphabetically, Z-A',
        shortName: 'Z-A'
      },
      {
        value: 'price-ascending',
        title: 'Price, low to high',
        shortName: 'Low to high'
      },
      {
        value: 'price-descending',
        title: 'Price, high to low',
        shortName: 'High to low'
      },
      {
        value: 'created-ascending',
        title: 'Date, old to new',
        shortName: 'Old to new'
      },
      {
        value: 'created-descending',
        title: 'Date, new to old',
        shortName: 'New to old'
      }
    ],
    sort_by: ''
  }
}
