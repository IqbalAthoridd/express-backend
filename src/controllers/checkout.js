const { response } = require('../helpers/response')
const { createData } = require('../helpers/database_query')
const table = 'checkouts'

module.exports = {
  createCheckout: async (req, res) => {
    const { userid } = req.payload
    const { affectedRows } = await createData(table, { ...req.body, user_id: userid })
    affectedRows
      ? response(res, 'added to checkout', { ...req.body, userid })
      : response(res, 'Failed', {}, false, 400)
  }
}
