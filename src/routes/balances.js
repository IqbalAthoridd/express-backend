const route = require('express').Router()
const balance = require('../controllers/balances')

route.post('/:id', balance.updateBalance)

module.exports = route
