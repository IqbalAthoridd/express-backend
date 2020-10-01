const { response } = require('../helpers/response')
const { createData, updateData, updateDataPart } = require('../helpers/database_query')
const { updateSchema } = require('../helpers/validation_schema')
const fs = require('fs')
const table = 'users'

module.exports = {
  myaccount: async (req, res) => {
    try {
      const { userid } = req.payload
      let data = await updateSchema.validateAsync({ ...req.body })
      if (req.file !== undefined) {
        var { path } = req.file
        path = path.replace(/\\/g, '/')
        data = {
          ...data,
          avatar: path
        }
      }
      const { birt_day, gender, avatar, ...dataUser } = data
      const { name, email, phone_number, ...updateDetail } = data
      if (Object.keys(dataUser).length && Object.keys(updateDetail).length) {
        const { affectedRows } = await updateData(table, userid, dataUser)
        const updateDetails = await updateDataPart('user_details', { user_id: userid }, updateDetail)
        affectedRows && updateDetails.affectedRows
          ? response(res, 'Data updated')
          : response(res, 'Failed updated try again', {}, false, 400)
      } else if (Object.keys(dataUser).length) {
        const { affectedRows } = await updateData(table, userid, dataUser)
        affectedRows
          ? response(res, 'Data updated')
          : response(res, 'Failed updated try again', {}, false, 400)
      } else if (Object.keys(updateDetail).length) {
        const updateDetails = await updateDataPart('user_details', { user_id: userid }, updateDetail)
        updateDetails.affectedRows
          ? response(res, 'Data updated')
          : response(res, 'Failed updated try again', {}, false, 400)
      } else {
        response(res, 'At least one filled', {}, false, 400)
        req.file !== undefined && fs.unlink(`${path}`, function (err) {
          if (err) throw err
        })
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  }
}
