const db = require('../helpers/db')
const table = 'category'

module.exports = {
  createCategoryModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (id,name) VALUES (${arr[0]},'${arr[2]}')`, (_err, result, _field) => {
      cb(result)
    })
  }
}
