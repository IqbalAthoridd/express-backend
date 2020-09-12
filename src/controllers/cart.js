const { createCartModel } = require('../models/cart')

module.exports = {
  createCart: (req, res) => {
    const { userId, itemId } = req.body

    createCartModel(+userId, +itemId, result => {
      if (result.affectedRows > 0) {
        res.send({
          success: true,
          message: 'Item added to cart',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Internal Server Error'
        })
      }
    })
  }
}
