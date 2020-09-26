const db = require('../helpers/db')
const table = 'users'
module.exports = {
  creteUserModel: async (data, image) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} (name,email,password,phoneNumber,picture) VALUES ("${data.name}","${data.email}","${data.password}"
    ,"${data.phoneNumber}","${image}")`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getUserModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE email = "${data}"`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getUserByidModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE userId = ${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updateUserModel: (id, arr, data, cb) => {
    db.query(`UPDATE ${table} SET ${arr}${data[1]}${data[0]} WHERE userId=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }

}
