const { registerSchema, updateSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { signAcessToken } = require('../middleware/auth')
const { response } = require('../helpers/response')
const { createData, getDataById, updateData } = require('../helpers/database_query')
const table = 'users'
const fs = require('fs')

module.exports = {
  authRegister: async (req, res) => {
    try {
      req.file === undefined && response(res, 'Image must be filled', {}, false, 400)
      var { path } = req.file
      path = path.replace(/\\/g, '/')
      const data = await registerSchema.validateAsync({ ...req.body })
      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      let dataResult = await getDataById(table, { email: data.email })
      if (!dataResult.length) {
        dataResult = [{ email: '' }]
      }
      if (dataResult[0].email !== data.email) {
        const result = await createData(table, { ...data, picture: path })
        if (result.affectedRows) {
          response(res, 'User Created',
            {
              data: {
                id: result.insertId,
                ...data,
                password: undefined,
                avatar: path
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
      fs.unlink(`${path}`, function (err) {
        if (err) throw err
      })
    }
  },
  authLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      const result = await getDataById(table, { email })
      if (result.length) {
        console.log(result)
        const { userId, name, email, role_id } = result[0]
        const data = await bcrypt.compare(password, result[0].password)
        if (data) {
          const token = await signAcessToken(userId, name, email, role_id)
          response(res, 'Login success', { token })
        } else {
          response(res, 'Invalid email or password', {}, false, 400)
        }
      } else {
        response(res, 'Invalid email or password', {}, false, 400)
      }
    } catch (err) {
      console.log(err)
    }
  },
  editUser: async (req, res) => {
    try {
      const { id } = req.params
      let data = await updateSchema.validateAsync({ ...req.body })
      if (req.file !== undefined) {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        data = {
          ...data,
          picture: path
        }
      }
      const { affectedRows } = await updateData(table, id, data)
      affectedRows
        ? response(res, 'Data updated')
        : response(res, 'Failed updated try again', {}, false, 400)
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  }
}
