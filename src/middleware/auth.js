const jwt = require('jsonwebtoken')
require('dotenv').config()
const { response } = require('../helpers/response')

module.exports = {
  signAcessToken: (userid, role) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userid,
        role
      }
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
      }
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.send({ succes: false, message: 'Unauthorized' })
    }
    const authHeader = req.headers.authorization
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return res.send({ succes: false, message })
      }
      req.payload = payload
      next()
    })
  },
  verifySeller: (req, res, next) => {
    const { role } = req.payload
    role !== 4 && response(res, 'Forbiddem Access', {}, false, 400)
    next()
  },
  verifyCustomer: (req, res, next) => {
    const { role } = req.payload
    role !== 3 && response(res, 'Forbidden Access', {}, false, 400)
    next()
  },
  verifyAdmin: (req, res, next) => {
    const { role } = req.payload
    role !== 3 && response(res, 'Forbidden Access', {}, false, 400)
    next()
  }
}
