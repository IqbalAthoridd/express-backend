const db = require('../helpers/db')
const table = 'users'
module.exports = {
  creteUserModel: async (data, image, cb) => {
    db.query(`INSERT INTO ${table} (name,email,password,phoneNumber,image) VALUES ("${data.name}","${data.email}","${data.password}"
    ,"${data.phoneNumber}","${image}")`, (_err, result, _field) => {
      console.log(_err)
      cb(result)
    })
  },
  getUserModel: (data, cb) => {
    db.query(`SELECT * FROM ${table} WHERE email = "${data}"`, (_err, result, _field) => {
      cb(result)
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
