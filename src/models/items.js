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
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE items SET name ='${arr[0]}',price=${arr[1]},description='${arr[2]}' WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePartialModel: (id, arr, cb) => {
    db.query(`UPDATE items SET ${arr} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM items WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
