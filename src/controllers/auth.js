const { registerSchema, updateSchema, sellerregisterSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { signAcessToken } = require('../middleware/auth')
const { response } = require('../helpers/response')
const { createData, getDataById, updateData, updateDataPart } = require('../helpers/database_query')
const table = 'users'
const fs = require('fs')

module.exports = {
  authRegister: async (req, res) => {
    try {
      const data = await registerSchema.validateAsync({ ...req.body })
      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      let dataResult = await getDataById(table, { email: data.email })
      if (!dataResult.length) {
        dataResult = [{ email: '' }]
      }
      if (dataResult[0].email !== data.email) {
        const result = await createData(table, { ...data })
        if (result.affectedRows) {
          const detailUser = await createData('user_details', { user_id: result.insertId })
          detailUser.affectedRows &&
          response(res, 'User Created',
            {
              data: {
                id: result.insertId,
                ...data,
                password: undefined
              }
            })
        } else {
          response(res, 'Failed create user tyr again!', {}, false, 400)
        }
      } else {
        response(res, `Email ${data.email} already use, try another email`, {}, false, 400)
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  },
  sellerRegister: async (req, res) => {
    try {
      const data = await sellerregisterSchema.validateAsync({ ...req.body })
      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      let dataResult = await getDataById(table, { email: data.email })
      if (!dataResult.length) {
        dataResult = [{ email: '' }]
      }
      if (dataResult[0].email !== data.email) {
        const result = await createData(table, { ...data })
        if (result.affectedRows) {
          const detailUser = await createData('user_details', { user_id: result.insertId })
          detailUser.affectedRows &&
          response(res, 'User Created',
            {
              data: {
                id: result.insertId,
                ...data,
                password: undefined
              }
            })
        } else {
          response(res, 'Failed create user tyr again!', {}, false, 400)
        }
      } else {
        response(res, `Email ${data.email} already use, try another email`, {}, false, 400)
      }
    } catch (err) {
      err.isJoi === true && response(res, err.message, false, 400)
    }
  },
  authLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      const result = await getDataById(table, { email })
      if (result.length) {
        const { id, role_id } = result[0]
        const data = await bcrypt.compare(password, result[0].password)
        if (data) {
          const token = await signAcessToken(id, role_id)
          response(res, 'Login success', { token })
        } else {
          response(res, 'Invalid email or password', {}, false, 400)
        }
      } else {
        response(res, 'Invalid email or password', {}, false, 400)
      }
    } catch (err) {

    }
  },
  editUser: async (req, res) => {
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
      } else {
        response(res, 'At least one filled', {}, false, 400)
        fs.unlink(`${path}`, function (err) {
          if (err) throw err
        })
      }
    } catch (err) {
      fs.unlink(`${path}`, function (err) {
        console.log(err)
        if (err) throw err
        console.log('File deleted!')
      })
      err.isJoi === true && response(res, err.message, false, 400)
    }
  }
}
