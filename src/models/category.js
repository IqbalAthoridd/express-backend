const db = require('../helpers/db')
const table = 'category'

module.exports = {
  createCategoryModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name) VALUES ('${arr.name}')`, (_err, result, _field) => {
      cb(result)
    })
  },
  getCategorModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getAllCategoryModel: (name, arr, cb) => {
    db.query(`SELECT * FROM category WHERE name LIKE '%${name}%' LIMIT ${arr[0]} OFFSET ${arr[1]}`
      , (_err, result, _field) => {
        cb(result)
      })
  },
  countGetCategoryModel: (name, cb) => {
    db.query(`SELECT COUNT('*') as count FROM ${table} WHERE name LIKE '%${name}%'`
      , (_err, result, _field) => {
        cb(result)
      })
  },
  updateCategoryModel: (id, name, cb) => {
    db.query(`UPDATE ${table} SET name ='${name}' WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
