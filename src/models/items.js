const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO items (name,price,description) VALUES ('${arr[0]}',${arr[1]},'${arr[2]}')`, (_err, result, _field) => {
      cb(result)
    })
  }
}
