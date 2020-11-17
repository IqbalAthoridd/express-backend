const { response } = require('../helpers/response')
const { createData, updateData, deleteDataById, getDataByIdTwo, listAdress, updateDataPart } = require('../helpers/database_query')
const { adreSchema } = require('../helpers/validation_schema')
const table = 'user_adress'

module.exports = {
  createAdress: async (req, res) => {
    try {
      const { userid } = req.payload
      const data = await adreSchema.validateAsync({ ...req.body })
      const { affectedRows } = await createData(table, { ...data, user_id: userid })
      affectedRows
        ? response(res, 'adress created', { data: { ...data, userid } })
        : response(res, 'Failed to created', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  updateAdress: async (req, res) => {
    try {
      const { id } = req.params
      const data = await adreSchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Adress updated', { data: { id, ...data } })
        : response(res, 'Failed updated', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  updatePartAdress: async (req, res) => {
    try {
      const { userid } = req.payload
      const { id } = req.params
      const { primary_adress } = req.body
      console.log(primary_adress)
      if (+primary_adress === 1) {
        const dataPrimary = await getDataByIdTwo(table, { primary_adress: 1 }, { user_id: userid })
        if (id !== dataPrimary[0].id) {
          await updateDataPart(table, { id: dataPrimary[0].id }, { primary_adress: 0 })
          const { affectedRows } = await updateData(table, id, { ...req.body })
          affectedRows
            ? response(res, 'Adress updated', { data: { id, ...req.body } })
            : response(res, 'Failed updated', {}, false, 400)
        }
      } else {
        const { affectedRows } = await updateData(table, id, { ...req.body })
        affectedRows
          ? response(res, 'Adress updated', { data: { id, ...req.body } })
          : response(res, 'Failed updated', {}, false, 400)
      }
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  deleteAdress: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await deleteDataById(table, id)
      affectedRows
        ? response(res, 'Adress deleted')
        : response(res, 'Failed to delete', {}, false, 400)
    } catch (error) {

    }
  },
  getAdress: async (req, res) => {
    try {
      const { limit = 3, page = 1 } = req.params
      const offset = (page - 1) * limit
      const { userid } = req.payload
      const data = [
        userid,
        +limit,
        +offset
      ]
      const result = await listAdress(data)
      result.length
        ? response(res, 'list adress', { data: result })
        : response(res, 'You dont\'t have adress yet', {}, false, 400)
    } catch (error) {
      console.log(error)
    }
  },
  getById: async (req, res) => {
    try {
      const { userid } = req.payload
      const { id } = req.params

      const result = await getDataByIdTwo(table, { id: id }, { user_id: userid })
      result.length
        ? response(res, 'Adress', { data: result })
        : response(res, 'Adress not found', {}, false, 404)
    } catch (error) {
    }
  }
}
