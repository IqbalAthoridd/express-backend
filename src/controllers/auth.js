const { registerSchema, sellerregisterSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { signAcessToken } = require('../middleware/auth')
const { response } = require('../helpers/response')
const { createData, getDataById, updateData } = require('../helpers/database_query')
const table = 'users'

module.exports = {
  customerRegister: async (req, res) => {
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
  authResetPassword: async (req, res) => {
    try {
      let { email, password, newPassword, otp } = req.body
      const data = await getDataById(table, { email })
      const fakeOtp = 12345
      if (data.length) {
        fakeOtp !== +otp && response(res, 'Invalid OTP code', {}, false, 400)
        password !== newPassword && response(res, 'Password not match')
        const salt = 10
        password = await bcrypt.hash(password, salt)
        const { affectedRows } = await updateData(table, { id: data[0].id }, { password })
        affectedRows
          ? response(res, 'password updated')
          : response(res, 'Failed', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error')
    }
  }
}
