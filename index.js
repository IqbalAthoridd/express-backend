const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const itemRoute = require('./src/routes/items')
const categoryRoute = require('./src/routes/category')
const authRouter = require('./src/routes/auth')
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/item', itemRoute)
app.use('/category', categoryRoute)
app.use('/auth', authRouter)

app.listen(8080, () => {
  console.log('running on port:8000')
})
