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
  }
}
