const Joi = require('@hapi/joi')

const categorySchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
})

module.exports = {
  categorySchema
}
