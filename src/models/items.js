
const db = require('../helpers/db')
const table = 'products'

module.exports = {
  getItemModel: (id) => {
    return new Promise((resolve, reject) => {
      const rowSubQuery = `i.id,i.name AS 'name',i.price,i.description,i.quantity,c.name AS 'condition' 
      ,ct.name AS 'category',i.create_at,i.update_at`
      const query = `SELECT ${rowSubQuery} FROM products i INNER JOIN categories ct on i.category_id = ct.id 
      INNER JOIN conditions c ON i.condition_id = c.id WHERE i.id = ?`
      db.query(`${query}`, id, (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  },
  createItemModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, data, (_err, result, _field) => {
        console.log(_err)
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  },
  updateItemModel: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ? 
      WHERE id= ?`, [data, id], (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteItemModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  searchItemModel: (Search, arr, sort, sortTo, sortTime, price = 0) => {
    // db.query(`SELECT * FROM (SELECT * FROM ${table} WHERE ${Search[0]} LIKE "%${Search[1]}%" ${sort}
    // ORDER BY price ${sortTo} LIMIT ${arr[0]} OFFSET ${arr[1]}) AS tabel HAVING price >= ${price} ${sortTime} `
    // , (_err, result, _field) => {
    //   cb(result)
    // })
    return new Promise((resolve, reject) => {
      const rowSubQuery = `i.id,i.name AS 'name',i.price,i.description,i.quantity,c.name AS 'condition' 
      ,ct.name AS 'category',i.create_at,i.update_at`
      const subQuery = `SELECT ${rowSubQuery} FROM products i INNER JOIN categories ct on i.category_id = ct.id 
      INNER JOIN conditions c ON i.condition_id = c.id`
      db.query(`SELECT * FROM (${subQuery}) as table_1 WHERE ${Search[0]} LIKE "%${Search[1]}%" 
      ORDER BY create_at DESC LIMIT ${arr[0]} OFFSET ${arr[0]}`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  countGetItemModel: (arr, sort) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT('*') as count FROM (SELECT * FROM ${table} WHERE ${arr[0]} 
        LIKE '%${arr[1]}%' ${sort}) as table1`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createImageModel: (arr) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO product_picture (produkId,url) VALUES ?', [arr], (_err, result, _field) => {
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  }
}
