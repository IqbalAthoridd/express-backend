
const db = require('./db')

module.exports = {
  createData: (table, data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO ?? SET ?', [table, data], (_err, result, _field) => {
        console.log(_err)
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  },
  getDataById: (table, id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ?? WHERE id = ?', [table, id], (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  },
  deleteDataById: (table, id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ?? WHERE id=?', [table, id], (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
