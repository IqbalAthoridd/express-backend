const { response } = require('../helpers/response')
const { updateData } = require('../helpers/database_query')
const { colorSchema } = require('../helpers/validation_schema')
const table = 'product_colors'

module.exports = {
  updateColors: async (req, res) => {
    try {
      const { id } = req.params
      const data = await colorSchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Color updated!', { data: { id, ...data } })
        : response(res, 'Failed updated !', {}, false, 400)
    } catch (error) {

    }
  }
}
