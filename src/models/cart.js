const db = require('../helpers/db')
module.exports = {
  getCartModel: (data) => {
    return new Promise((resolve, reject) => {
      const subQuery = 'SELECT c.userId,p.name,p.price,c.picture,c.total,p.price*c.total as "summary" FROM carts c INNER JOIN products p ON c.productId = p.id'
      db.query(`SELECT * FROM (${subQuery}) as table_1 WHERE ? LIMIT ? OFFSET ?`
        , data, (_err, result, _field) => {
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
      const subQuery = 'SELECT c.userId,p.name,p.price,c.picture,c.total FROM carts c INNER JOIN products p ON c.productId = p.id'
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
