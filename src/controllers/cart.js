const {
  getCartModel,
  deleteCartModel,
  updateTotalModel
} = require('../models/cart')
const { getDataById, createData } = require('../helpers/database_query')
const { response } = require('../helpers/response')
const table = 'carts'

module.exports = {
  createCart: async (req, res) => {
    const { userid } = req.payload
    const { itemId, total } = req.body
    const data = await getDataById(table, { itemId: itemId })
    if (data.length) {
      response(res, 'Already added on carts', {}, false, 400)
    } else {
      const { affectedRows } = await createData(table, { userId: userid, itemId, total })
      affectedRows
        ? response(res, 'Added to cart')
        : response(res, 'Failed to added try agin!', {}, false, 400)
    }
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
