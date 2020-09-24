const { registerSchema, updateSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt')
const { upload2 } = require('../helpers/init_multer')

const { creteUserModel, getUserModel, updateUserModel } = require('../models/auth')

module.exports = {
  authRegister: async (req, res) => {
    try {
      const { path } = req.file
      console.log(path)
      const data = await registerSchema.validateAsync({ ...req.body })
      const salt = 10
      data.password = await bcrypt.hash(data.password, salt)
      let dataResult = await getUserModel(data.email)
      if (!dataResult.length) {
        dataResult = [{ email: '' }]
      }
      if (dataResult[0].email !== data.email) {
        const result = creteUserModel(data, path)
        if (result.affectedRows > 0) {
          res.send({
            success: true,
            message: 'User Created',
            data: { id: result.insertId, ...data, avatar: path }
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
          message: `Email ${data.email} already use, try another email`
        })
      }
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
