const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '/dist')
console.log(publicPath)
const port = process.env.PORT || 8000
const app = express()

app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
