const Joi = require('@hapi/joi')

const categorySchema = Joi.object({
  name: Joi.string().min(4).required()
})

module.exports = {
  categorySchema
}
