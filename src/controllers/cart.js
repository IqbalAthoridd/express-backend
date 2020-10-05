const {
  getCartModel,
  countCartModel
} = require('../models/cart')
const { getDataById, createData, deleteDataById, updateData } = require('../helpers/database_query')
const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const table = 'carts'

module.exports = {
  createCart: async (req, res) => {
    const { userid } = req.payload
    const { productId, total } = req.body
    const data = await getDataById(table, { productId: productId })
    if (data.length) {
      response(res, 'Already added on carts', {}, false, 400)
    } else {
      const { affectedRows } = await createData(table, { userId: userid, productId, total })
      affectedRows
        ? response(res, 'Added to cart')
        : response(res, 'Failed to added try agin!', {}, false, 400)
    }
  },
  getCart: async (req, res) => {
    try {
      const { limit = 5, page = 1 } = req.query
      const offset = (page - 1) * limit
      const { userid } = req.payload
      const result = await getCartModel([{ userId: userid }, +limit, offset])
      if (result.length) {
        const data = await countCartModel({ userId: userid })
        const { count } = data[0]
        const pageInfo = pagination(req.query, page, limit, count)
        response(res, 'List of Cart', { data: result, pageInfo })
      } else {
        response(res, "you don't have a cart yet", {}, false, 404)
      }
    } catch (error) {

    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await deleteDataById(table, id)
      affectedRows
        ? response(res, 'Cart deleted')
        : response(res, 'Failed deleted', {}, false, 400)
    } catch (error) {

    }
  },
  UpdateTotalItem: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await updateData(table, id, req.body)
      affectedRows
        ? response(res, 'Cart Updated')
        : response(res, 'Error try again !', {}, false, 400)
    } catch (error) {

    }
  }

}
