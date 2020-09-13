const { registerSchema, updateSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')

const { creteUserModel, getUserModel, updateUserModel } = require('../models/auth')

module.exports = {
  authRegister: async (req, res) => {
    try {
      const data = await registerSchema.validateAsync({ ...req.body })

      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      getUserModel(data.email, dataResult => {
        if (!dataResult.length) {
          dataResult = [{ email: '', phoneNumber: '' }]
        }
        if (dataResult[0].phoneNumber === data.phoneNumber) {
          res.send({
            success: false,
            message: 'Phone number already use'
          })
        }
        if (dataResult[0].email !== data.email) {
          creteUserModel(data, result => {
            if (result.affectedRows > 0) {
              res.send({
                success: true,
                message: 'User Created',
                data: data
              })
            } else {
              res.send({
                success: false,
                message: 'Interal Server Error'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Email ${data.email} already use, try another email`
          })
        }
      })
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  },
  authLogin: (req, res) => {
    const { email, password } = req.body
    getUserModel(email, async (result) => {
      if (result.length) {
        const { userId, name, email } = result[0]
        const data = await bcrypt.compare(password, result[0].password)
        if (data) {
          res.send({
            success: true,
            message: 'Login Succes',
            data: {
              userId,
              name,
              email
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Invalid email or password'
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Invalid email or password'
        })
      }
    })
  },
  editUser: async (req, res) => {
    try {
      const { id } = req.params
      let data = await updateSchema.validateAsync({ ...req.body })
      data = Object.entries(data).map(data => {
        return data[1] > 0 ? `${data[0]} = '${data[1]}'` : `${data[0]} = '${data[1]}'`
      })

      updateUserModel(id, data, result => {
        if (result === undefined) {
          result = { affectedRows: 0 }
        }
        if (result.affectedRows > 0) {
          res.send({
            success: true,
            message: 'Data updated'
          })
        } else {
          res.send({
            success: false,
            message: 'Data not updated'
          })
        }
      })
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  }
}
