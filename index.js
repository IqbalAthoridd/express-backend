const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const itemRoute = require('./src/routes/items')
const categoryRoute = require('./src/routes/category')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/item', itemRoute)
app.use('/category', categoryRoute)

app.listen(8080, () => {
  console.log('running on port:8000')
})
