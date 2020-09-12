const { createCartModel, getCartItemModel } = require('../models/cart')

module.exports = {
  createCart: (req, res) => {
    const { userId, itemId, total } = req.body

    getCartItemModel(itemId, dataResult => {
      if (dataResult.length === 0) {
        dataResult = [{ itemId: 0 }]
      }
      if (dataResult[0].itemId !== +itemId) {
        createCartModel(userId, itemId, total, result => {
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
      } else {
        res.send({
          success: false,
          message: 'Item alredy added on cart'
        })
      }
    })
  }

}
