const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name,price,description,category) VALUES ('${arr[0]}',${arr[1]},'${arr[2]}',${arr[3]})`, (_err, result, _field) => {
      cb(result)
    })
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name ='${arr[0]}',price=${arr[1]},description='${arr[2]}' WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePartialModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  searchItemModel: (Search, arr, sort, sortTo, sortTime, price = 0, cb) => {
    db.query(`SELECT * FROM (SELECT * FROM ${table} WHERE ${Search[0]} LIKE '%${Search[1]}%' ${sort} ORDER BY price ${sortTo} LIMIT ${arr[0]} OFFSET ${arr[1]}) AS tabel HAVING price >= ${price} ${sortTime} `, (_err, result, _field) => {
      cb(result)
    })
  },
  countGetItemModel: (arr, sort, cb) => {
    db.query(`SELECT COUNT('*') as count FROM (SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ${sort}) as table1`, (_err, result, _field) => {
      cb(result)
    })
  }
}
