const db = require('../helpers/db')

module.exports = {
  creteUserModel: (data, cb) => {
    db.query(`INSERT INTO users (name,email,password,phoneNumber) VALUES ('${data.name}','${data.email}','${data.password}','${data.phoneNumber}')`, (_err, result, _field) => {
      console.log(_err)
      cb(result)
    })
  },
  getUserModel: (data, cb) => {
    db.query(`SELECT * FROM users WHERE email = '${data}'`, (_err, result, _field) => {
      cb(result)
    })
  }

}
