const { response } = require('../helpers/response')
const { updateData, updateDataPart, getDataById } = require('../helpers/database_query')
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
  },
  profile: async (req, res) => {
    const { userid } = req.payload
    const data = await getDataById('users', { id: userid })
    if (data.length > 0) {
      const details = await getDataById('user_details', { user_id: userid })
      details.length
        ? response(res, 'user Info', { data: { id: data[0].id, name: data[0].name, email: data[0].email, phone_number: data[0].phone_number, birt_day: details[0].birt_day, gender: details[0].gender, avatar: details[0].avatar } })
        : response(res, 'error')
    }
  }
}
