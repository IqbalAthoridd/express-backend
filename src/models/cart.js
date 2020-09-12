const db = require('../helpers/db')

module.exports = {
  createCartModel: (user, item, total, cb) => {
    db.query(`INSERT INTO cart (userId,itemId,total) VALUES (${+(user)},${+item},${+total})`, (_err, result, _field) => {
      cb(result)
    })
  },
  getCartItemModel: (id, cb) => {
    db.query(`SELECT * FROM cart WHERE itemId = ${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getCartModel: (cb) => {
    db.query('SELECT name, total, price, price * total as Summary FROM items INNER JOIN cart ON items.id = cart.itemId '
      , (_err, result, _field) => {
        cb(result)
      })
  }

}
