const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const itemRoute = require('./src/routes/items')
const categoryRoute = require('./src/routes/category')
const authRouter = require('./src/routes/auth')
const cartRouter = require('./src/routes/cart')
const publicRoute = require('./src/routes/public')
require('dotenv').config()

const { verifyAccessToken } = require('./src/middleware/auth')

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/item', verifyAccessToken, itemRoute)
app.use('/category', categoryRoute)
app.use('/auth', authRouter)
app.use('/cart', cartRouter)
app.use('/public', publicRoute)

app.listen(8080, () => {
  console.log('running on port:8000')
})
