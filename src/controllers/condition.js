const { conditionSchema } = require('../helpers/validation_schema')
const { response } = require('../helpers/response')
const { createData, updateData, deleteDataById, listData } = require('../helpers/database_query')
const table = 'conditions'
module.exports = {
  createCondition: async (req, res) => {
    try {
      const data = await conditionSchema.validateAsync({ ...req.body })
      const { affectedRows } = await createData(table, data)
      affectedRows
        ? response(res, 'Condition created!')
        : response(res, 'Internal Server Error', {}, false, 500)
    } catch (error) {

    }
  },
  editCondition: async (req, res) => {
    try {
      const { id } = req.params
      const data = await conditionSchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Condition updated')
        : response(res, `Condition with id ${id} does't exist`, {}, false, 404)
    } catch (error) {

    }
  },
  deleteCondition: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await deleteDataById(table, id)
      affectedRows
        ? response(res, 'Category deleted')
        : response(res, `Condition with id ${id} does't exist`, {}, false, 404)
    } catch (error) {

    }
  },
  getCondition: async (req, res) => {
    const { search = '', sortTo = 'ASC', limit = 5, page = 1 } = req.query
    const offset = (page - 1) * limit
    const data = [
      [table],
      ['%' + search + '%'],
      [+limit],
      [offset]
    ]
    const result = await listData(data, sortTo)
    result.length
      ? response(res, 'List of condition', { data: result })
      : response(res, 'Data not found', {}, false, 404)
  }
}
