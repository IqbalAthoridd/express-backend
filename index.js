const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const itemRoute = require('./src/routes/items')
const categoryRoute = require('./src/routes/category')
const authRouter = require('./src/routes/auth')
const cartRouter = require('./src/routes/cart')
const publicRoute = require('./src/routes/public')
const conditionRoute = require('./src/routes/condition')
const colorRoute = require('./src/routes/color')
const roleRoute = require('./src/routes/role')
const adressRoute = require('./src/routes/adress')
const sellerRoute = require('./src/routes/seller')
const customerRoute = require('./src/routes/customer')
const adminRoute = require('./src/routes/admin')
require('dotenv').config()

const { verifyAccessToken, verifySeller, verifyCustomer, verifyAdmin } = require('./src/middleware/auth')

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(`${__dirname}`))

app.use('/seller', verifyAccessToken, verifySeller, sellerRoute)
app.use('/customer', verifyAccessToken, verifyCustomer, customerRoute)
app.use('/admin', verifyAccessToken, verifyAdmin, adminRoute)
app.use('/item', verifyAccessToken, verifyAdmin, itemRoute)
app.use('/category', verifyAccessToken, verifyAdmin, categoryRoute)
app.use('/auth', authRouter)
app.use('/cart', verifyAccessToken, verifyAdmin, cartRouter)
app.use('/public', publicRoute)
app.use('/condition', verifyAccessToken, verifyAdmin, conditionRoute)
app.use('/color', verifyAccessToken, verifyAdmin, colorRoute)
app.use('/role', verifyAccessToken, verifyAdmin, roleRoute)
app.use('/adress', verifyAccessToken, adressRoute)

// Error handler http request
app.use(async (req, res, next) => {
  next(new Error('Not Found'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    succes: false,
    status: err.status || 500,
    message: err.message
  })
})

app.listen(8080, () => {
  console.log('running on port:8000')
})
