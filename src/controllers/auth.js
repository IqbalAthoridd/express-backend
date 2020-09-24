const { registerSchema, updateSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { upload2 } = require('../helpers/init_multer')

const { creteUserModel, getUserModel, updateUserModel } = require('../models/auth')

module.exports = {
  authRegister: async (req, res) => {
    try {
      let { path } = req.file
      path = path.replace(/\\/g, '/')
      const { error, value } = await registerSchema.validate({ ...req.body })
      if (error) {
        res.send({
          success: false,
          message: error.details[0].message
        })
      }
      const salt = 10
      value.password = await bcrypt.hash(value.password, salt)
      let dataResult = await getUserModel(value.email)
      if (!dataResult.length) {
        dataResult = [{ email: '' }]
      }
      if (dataResult[0].email !== value.email) {
        const result = await creteUserModel(value, path)
        if (result.affectedRows > 0) {
          res.send({
            success: true,
            message: 'User Created',
            data: { id: result.insertId, ...value, password: undefined, avatar: path }
          })
        } else {
          res.send({
            success: false,
            message: 'Interal Server Error'
          })
        }
      } else {
        res.send({
          success: false,
          message: `Email ${value.email} already use, try another email`
        })
      }
    } catch (err) {
      console.log(err)
    }
  },
  authLogin: async (req, res) => {
    const { email, password } = req.body
    const result = await getUserModel(email)
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
  },
  editUser: async (req, res) => {
    upload2(req, res, async (_err) => {
      try {
        const { id } = req.params
        let image = ''
        let coma = ''
        if (req.file === undefined) {
          image = ''
        } else {
          image = `image = "${req.file.filename}"`
          coma = ','
        }
        let data = await updateSchema.validateAsync({ ...req.body })
        data = Object.entries(data).map(data => {
          return data[1] > 0 ? `${data[0]} = '${data[1]}'` : `${data[0]} = '${data[1]}'`
        })

        updateUserModel(id, data, [image, coma], result => {
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
    })
  }
}
