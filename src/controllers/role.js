const { response } = require('../helpers/response')
const { createData, updateData, deleteDataById } = require('../helpers/database_query')
const { roleSchema } = require('../helpers/validation_schema')
const table = 'roles'

module.exports = {
  createRole: async (req, res) => {
    try {
      const data = await roleSchema.validateAsync({ ...req.body })
      const { affectedRows } = await createData(table, data)
      affectedRows
        ? response(res, `Role ${data.name} created`, { data })
        : response(res, 'Failed create role', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  editRole: async (req, res) => {
    try {
      const { id } = req.params
      const data = roleSchema.validateAsync({ ...req.body })
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Role apdated')
        : response(res, 'Failed updated Role', {}, false, 400)
    } catch (error) {
      error.isJoi === true && response(res, error.message, false, 400)
    }
  },
  deleteRole: async (req, res) => {
    try {
      const { id } = req.params
      const { affectedRows } = await deleteDataById(table, id)
      affectedRows
        ? response(res, 'Role deleted')
        : response(res, `Role with id ${id} does't exist`)
    } catch (error) {

    }
  }
}
