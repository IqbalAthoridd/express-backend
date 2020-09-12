const { registerSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')

const { creteUserModel, getUserModel } = require('../models/auth')

module.exports = {
  authRegister: async (req, res) => {
    try {
      const data = await registerSchema.validateAsync({ ...req.body })

      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      getUserModel(data.email, dataResult => {
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
  }
}
