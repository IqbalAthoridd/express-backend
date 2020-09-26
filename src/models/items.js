
const db = require('../helpers/db')
const table = 'products'

module.exports = {
  getItemModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
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
  updateItemModel: (id, data, cb) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET name ="${data.name}",price=${data.price},description="${data.description},category=${data.category}" 
      WHERE id=${id}`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePartialModel: (id, arr, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table} SET ${arr}${data[0]}${data[1]} WHERE id=${id}`, (_err, result, _field) => {
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
      const rowSubQuery = 'i.id as id,i.name as name, i.price,i.description,c.name as category,image1,image2,image3,image4,create_at,update_at'
      const subQuery = `SELECT ${rowSubQuery} from ${table} i INNER JOIN imageitems on i.image=imageitems.imageId 
      INNER JOIN category c on i.category = c.id`
      db.query(`SELECT * FROM (${subQuery}) as table_1 WHERE ${Search[0]} LIKE "%${Search[1]}%" ORDER BY create_at DESC LIMIT ${arr[0]} OFFSET ${arr[0]}`, (_err, result, _field) => {
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
  createImageModel: (arr,id) => {
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
