const Joi = require('@hapi/joi')

const categorySchema = Joi.object({
  name: Joi.string().min(4).required()
})

const registerSchema = Joi.object({
  name: Joi.string.min(4).max(20).required(),
  email: Joi.string().lowercase().min(5).email().required(),
  password: Joi.string().min(8).required()
})

module.exports = {
  categorySchema
}
