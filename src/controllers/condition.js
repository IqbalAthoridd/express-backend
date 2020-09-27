const { conditionSchema } = require('../helpers/validation_schema')
const { response } = require('../helpers/response')
const { createData } = require('../helpers/database_query')
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
  }
}
