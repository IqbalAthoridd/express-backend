
const { response } = require('../helpers/response')
const { createPaymentSchema } = require('../helpers/validation_schema')
const { createData, updateDataPart, deleteData, getAllData } = require('../helpers/database_query')
const table = 'payments'

module.exports = {
  createPayment: async (req, res) => {
    try {
      req.file === undefined && response(res, 'Image is required', {}, false, 400)
      let { path } = req.file
      path = path.replace(/\\/g, '/')
      const data = await createPaymentSchema.validateAsync({ ...req.body })
      const result = await createData(table, { ...data, picture: path })
      if (result) {
        response(res, 'payment created')
      } else {
        response(res, 'Vailed to created', {}, false, 400)
      }
    } catch (error) {

    }
  },
  updatePayment: async (req, res) => {
    try {
      const { id } = req.params
      let data = req.body
      if (req.file !== undefined) {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        data = { ...req.body, picture: path }
      }
      const result = await updateDataPart(table, data, { id })
      result
        ? response(res, 'Payment Updated !', data)
        : response(res, 'Failed to Update!', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  deletePayment: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteData(table, { id })
      result
        ? response(res, 'Payment deleted')
        : response(res, 'Failed to delete', {}, false, 400)
    } catch (error) {

    }
  },
  getPayment: async (req, res) => {
    const result = await getAllData(table)
    console.log(result)
    result
      ? response(res, 'Payment list', { data: result })
      : response(res, 'Internal server error', {}, false, 500)
  }
}
