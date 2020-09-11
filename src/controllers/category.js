const db = require('../helpers/db')
const { categorySchema } = require('../helpers/validation_schema')

module.exports = {
  createCategory: async (req, res) => {
    const { id, name } = await categorySchema.validate(req.body)
  }
}
