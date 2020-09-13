const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  createItemModel: (data, imageId, cb) => {
    db.query(`INSERT INTO ${table} (name,price,description,image,category) VALUES 
    ("${data.name}",${data.price},"${data.description}",${imageId},${data.category})`, (_err, result, _field) => {
      console.log(_err)
      cb(result)
    })
  },
  updateItemModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET name ="${data.name}",price=${data.price},description="${data.description},category=${data.category}" 
    WHERE id=${id}`, (_err, result, _field) => {
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
    db.query(`SELECT * FROM (SELECT * FROM ${table} WHERE ${Search[0]} LIKE "%${Search[1]}%" ${sort} 
    ORDER BY price ${sortTo} LIMIT ${arr[0]} OFFSET ${arr[1]}) AS tabel HAVING price >= ${price} ${sortTime} `
    , (_err, result, _field) => {
      cb(result)
    })
  },
  countGetItemModel: (arr, sort, cb) => {
    db.query(`SELECT COUNT('*') as count FROM (SELECT * FROM ${table} WHERE ${arr[0]} 
      LIKE '%${arr[1]}%' ${sort}) as table1`, (_err, result, _field) => {
      cb(result)
    })
  },
  createImageModel: (arr, cb) => {
    db.query(`INSERT INTO imageItems (image1,image2,image3,image4) VALUES
    ("${arr[0]}","${arr[1]}","${arr[2]}","${arr[3]}")`, (_err, result, _field) => {
      cb(result)
    })
  }
}
