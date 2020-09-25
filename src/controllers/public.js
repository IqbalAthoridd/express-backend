const model = require('../models/public')

module.exports = {
  newProducts: async (req, res) => {
    const data = await model.newProduct()
    if (data) {
      res.send({ succes: true, message: 'New Items', data: data })
    }
  }
}
