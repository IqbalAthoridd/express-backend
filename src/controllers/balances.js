const { response } = require('../helpers/response')
const { updateDataPart } = require('../helpers/database_query')
const table = 'user_balances'

module.exports = {
  updateBalance: async (req, res) => {
    try {
      const { id } = req.params
      const { balance } = req.body
      const result = await updateDataPart(table, { user_id: id }, { balance })
      result
        ? response(res, `Top up ${balance} succesfully`)
        : response(res, 'Top up Failed', {}, false, 400)
    } catch (error) {

    }
  }
}
