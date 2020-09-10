const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const itemRoute = require('./src/routes/items')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/item', itemRoute)

app.listen(8080, () => {
  console.log('running on port:8000')
})
