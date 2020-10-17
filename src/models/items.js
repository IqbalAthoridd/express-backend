
const db = require('../helpers/db')
const table = 'products'

module.exports = {
  getItemModel: (id) => {
    return new Promise((resolve, reject) => {
      const rowSubQuery = `i.id,i.name AS 'name',i.price,i.quantity,c.name AS 'condition' 
      ,ct.name AS 'category',p.url,i.description,FORMAT(AVG(r.rating),1) as ratings,i.create_at,i.update_at`
      const query = `SELECT ${rowSubQuery} FROM products i LEFT JOIN categories ct on i.category_id = ct.id 
      LEFT JOIN conditions c ON i.condition_id = c.id 
      LEFT JOIN product_picture p ON i.id = p.productId LEFT JOIN ratings r ON i.id = r.product_id WHERE i.id = ? GROUP BY i.id`
      db.query(`${query}`, id, (_err, result, _field) => {
        console.log(_err)
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
      db.query(`DELETE FROM ${table} WHERE id=?`, id, (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  searchItemModel: (searchKey, sort, data) => {
    return new Promise((resolve, reject) => {
      const rowSubQuery = `i.id as id,i.name AS 'name',p.url as picture,p.indexOf,i.price,i.quantity,c.name AS 'condition' 
      ,ct.name AS 'category',i.description,FORMAT(AVG(r.rating),1) as ratings,i.create_at,i.update_at`
      const subQuery = `SELECT ${rowSubQuery} FROM products i LEFT JOIN categories ct on i.category_id = ct.id 
      LEFT JOIN conditions c ON i.condition_id = c.id LEFT JOIN product_picture p ON i.id = p.productId 
      LEFT JOIN ratings r on i.id = r.product_id WHERE p.indexOf = 0 AND (r.rating > 0 or r.rating is null) GROUP BY i.id`
      db.query(`SELECT * 
      FROM (${subQuery}) as table_1 WHERE ${searchKey} LIKE ? 
      ORDER BY ${sort[0]} ${sort[1]} LIMIT ? OFFSET ?`, data, (_err, result, _field) => {
        console.log(_err)
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  countGetItemModel: (arr) => {
    return new Promise((resolve, reject) => {
      const rowSubQuery = `i.id,i.name AS 'name',i.price,i.description,i.quantity,c.name AS 'condition' 
      ,ct.name AS 'category',i.create_at,i.update_at`
      const subQuery = `SELECT ${rowSubQuery} FROM products i INNER JOIN categories ct on i.category_id = ct.id 
      INNER JOIN conditions c ON i.condition_id = c.id`
      db.query(`SELECT COUNT('*') as count FROM (${subQuery}) as table1 WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, result, _field) => {
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
      db.query('INSERT INTO product_picture (productId,url,indexOf) VALUES ?', [arr], (_err, result, _field) => {
        console.log(_err)
        if (!_err) {
          resolve(result)
        }
        reject(_err)
      })
    })
  }
}
