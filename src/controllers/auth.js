const { registerSchema, updateSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { signAcessToken } = require('../middleware/auth')
const { upload2 } = require('../helpers/init_multer')
const { response } = require('../helpers/response')
const { createData, getDataById, updateData } = require('../helpers/database_query')
const table = 'users'

module.exports = {
  authRegister: async (req, res) => {
    upload2(req, res, async (_err) => {
      try {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        const { error, value } = await registerSchema.validate({ ...req.body })
        error && response(res, error.details[0].message, {}, false, 400)
        const salt = 10
        value.password = await bcrypt.hash(value.password, salt)
        let dataResult = await getDataById(table, { email: value.email })
        if (!dataResult.length) {
          dataResult = [{ email: '' }]
        }
        if (dataResult[0].email !== value.email) {
          const result = await createData(table, { ...value, picture: path })
          if (result.affectedRows) {
            response(res, 'User Created',
              {
                data: {
                  id: result.insertId,
                  ...value,
                  password: undefined,
                  avatar: path
                }
              })
          } else {
            response(res, 'Failed create user tyr again!', {}, false, 400)
          }
        } else {
          response(res, `Email ${value.email} already use, try another email`, {}, false, 400)
        }
      } catch (err) {
        console.log(err)
      }
    })
  },
  authLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      const result = await getDataById(table, { email })
      if (result.length) {
        const { userId, name, email } = result[0]
        const data = await bcrypt.compare(password, result[0].password)
        if (data) {
          const token = await signAcessToken(userId, name, email)
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
    upload2(req, res, async (_err) => {
      try {
        const { id } = req.params
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        const data = await updateSchema.validateAsync({ ...req.body })

        const { affectedRows } = await updateData(table, id, { ...data, picture: path })
        affectedRows
          ? response(res, 'Data updated')
          : response(res, 'Failed updated try again', {}, false, 400)
      } catch (err) {
        res.send({
          success: false,
          message: err.message
        })
      }
    })
  }
}
