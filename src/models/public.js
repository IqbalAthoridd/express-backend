const db = require('../helpers/db')

module.exports = {
  newProduct: (id) => {
    return new Promise((resolve, reject) => {
      const rowSubQuery = 'i.id as id,i.name as name, i.price,i.description,c.name as category,image1,image2,image3,image4,create_at,update_at'
      const subQuery = `SELECT ${rowSubQuery} from items i INNER JOIN imageitems on i.image=imageitems.imageId 
INNER JOIN category c on i.category = c.id ORDER BY create_at DESC`
      db.query(`${subQuery}`, (_err, result, _field) => {
        if (_err) {
          reject(_err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
