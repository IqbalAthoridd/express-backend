const db = require('../helpers/db')
const table = 'cart'
module.exports = {
  createCartModel: (user, item, total, cb) => {
    db.query(`INSERT INTO ${table} (userId,itemId,total) VALUES (${+(user)},${+item},${+total})`, (_err, result, _field) => {
      cb(result)
    })
  },
  getCartItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE itemId = ${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getCartModel: (id, cb) => {
    db.query(`SELECT name, total, price, price * total as Summary FROM items INNER JOIN ${table} ON items.id = cart.itemId WHERE userid =${id}`
      , (_err, result, _field) => {
        cb(result)
      })
  },
  deleteCartModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE cartId = ${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updateTotalModel: (id, total, cb) => {
    db.query(`UPDATE ${table} SET total = ${total} WHERE cartId=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }

}
