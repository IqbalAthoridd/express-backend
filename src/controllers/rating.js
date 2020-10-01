const { response } = require('../helpers/response')
const { createData, updateTwoCondst } = require('../helpers/database_query')
const { ratingSchema, updateRatingSchema } = require('../helpers/validation_schema')
const table = 'ratings'

module.exports = {
  createRating: async (req, res) => {
    try {
      const { userid } = req.payload
      const { id } = req.params
      const data = await ratingSchema.validateAsync({ ...req.body })

      const { affectedRows } = await createData(table, { ...data, product_id: id, user_id: userid })
      affectedRows
        ? response(res, 'Rating created', { data: { ...data, product_id: id, user_id: id } })
        : response(res, 'Failed updated', {}, false, 400)
    } catch (error) {

    }
  },
  updateRating: async (req, res) => {
    try {
      const { userid } = req.payload
      const { id } = req.params
      const data = await updateRatingSchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateTwoCondst(table, { product_id: id }, { user_id: userid }, data)
      affectedRows
        ? response(res, 'Rating updated')
        : response(res, 'Failed updated', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  }
}
