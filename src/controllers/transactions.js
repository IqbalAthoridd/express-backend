const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const { createData } = require('../helpers/database_query')
const table = 'transaction'
module.exports = {
  createTransaction: async (req, res) => {
    try {
      const result = await createData(table, { ...req.body })
      result
        ? response(res, 'Transaction created')
        : response(res, 'Failed to created')
    } catch (error) {

    }
  }
}
