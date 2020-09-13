const {
  createCartModel,
  getCartItemModel,
  getCartModel,
  deleteCartModel,
  updateTotalModel
} = require('../models/cart')

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
  },
  getCart: (req, res) => {
    const { id } = req.params
    getCartModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'List of Cart',
          data: result
        })
      } else {
        res.send({
          success: false,
          message: 'Cart empty'
        })
      }
    })
  },
  deleteCart: (req, res) => {
    const { id } = req.params
    deleteCartModel(id, result => {
      if (result.affectedRows > 0) {
        res.send({
          success: true,
          message: 'cart deleted'
        })
      } else {
        res.send({
          success: false,
          message: `Data with id ${id} does't exist`
        })
      }
    })
  },
  UpdateTotalItem: (req, res) => {
    const { id } = req.params
    const { total } = req.body
    updateTotalModel(id, total, result => {
      if (result.affectedRows > 0) {
        res.send({
          success: true,
          message: 'Cart Updated'
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
