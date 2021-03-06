
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
      db.query('SELECT * FROM ?? WHERE ?', [table, id], (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  },
  getDataByIdTwo: (table, id1, id2) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ?? WHERE ? AND ?', [table, id1, id2], (_err, result, _field) => {
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
  },
  updateData: (table, id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ?? SET ? WHERE id= ?', [table, data, id], (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  listData: (data, sortTo) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ?? WHERE name LIKE ? ORDER BY name ${sortTo} LIMIT ? OFFSET ?`,
        data, (_err, result, _field) => {
          if (_err) {
            reject(_err)
          } else {
            resolve(result)
          }
        })
    })
  },
  countData: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT("*") as count FROM ?? WHERE name LIKE ?', data, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateDataPart: (table, id, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ?? SET ? WHERE ?', [table, data, id], (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  listDataDymc: (data, sortBy, sortTo) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ?? WHERE name LIKE ? ORDER BY ${sortBy} ${sortTo} LIMIT ? OFFSET ?`,
        data, (_err, result, _field) => {
          if (_err) {
            reject(_err)
          } else {
            resolve(result)
          }
        })
    })
  },
  updateTwoCondst: (table, id1, id2, data) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE ?? SET ? WHERE ? AND ?', [table, data, id1, id2], (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteData: (table, id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ?? WHERE ?', [table, id], (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getAllData: (table) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, name, picture FROM ??', [table], (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  listAdress: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user_adress WHERE user_id = ? ORDER BY primary_adress DESC LIMIT ? OFFSET ?',
        data, (_err, result, _field) => {
          console.log(_err)
          if (_err) {
            reject(_err)
          } else {
            resolve(result)
          }
        })
    })
  }
}
