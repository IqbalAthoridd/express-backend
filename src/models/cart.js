const db = require('../helpers/db')
module.exports = {
  getCartModel: (data) => {
    return new Promise((resolve, reject) => {
      const subQuery = `SELECT c.userId,p.name,k.name as category,p.price,c.total,i.url,p.price*c.total as "subTotal",i.indexOf 
      FROM carts c INNER JOIN products p ON c.productId = p.id INNER JOIN product_picture i ON
      p.id = i.productId INNER JOIN categories k on p.category_id = k.id WHERE i.indexOf = 0`
      db.query(`SELECT * FROM (${subQuery}) as table_1 WHERE ? LIMIT ? OFFSET ?`
        , data, (_err, result, _field) => {
          console.log(_err)
          if (_err) {
            reject(_err)
          } else {
            resolve(result)
          }
        })
    })
  },
  countCartModel: (data) => {
    return new Promise((resolve, reject) => {
      const subQuery = 'SELECT c.userId,p.name,p.price,c.total FROM carts c INNER JOIN products p ON c.productId = p.id'
      db.query(`SELECT COUNT('*') as count FROM (${subQuery}) as table_1 WHERE ?`,
        data, (_err, result, _field) => {
          if (_err) {
            reject(_err)
          } else {
            resolve(result)
          }
        })
    })
  }

}
