const db = require('../helpers/db')

module.exports = {
  createCartModel: (user, produk, cb) => {
    db.query(`INSERT INTO cart (userId,itemId) VALUES (${user},${produk})`, (_err, result, _field) => {
      cb(result)
    })
  }

}
