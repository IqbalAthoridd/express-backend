const Joi = require('@hapi/joi')

const categorySchema = Joi.object({
  name: Joi.string().min(4).trim().replace("'", '\'').required()
})

const registerSchema = Joi.object({
  name: Joi.string().min(4).max(20).trim().replace("'", '\'').required(),
  email: Joi.string().lowercase().min(5).trim().email().replace("'", '\'').required(),
  password: Joi.string().min(8).trim().replace("'", '\'').required(),
  phoneNumber: Joi.string().max(13).min(10).trim().required()
})

const updateSchema = Joi.object({
  name: Joi.string().min(4).max(20).trim().replace("'", '\''),
  email: Joi.string().email().trim().lowercase().min(5).replace("'", '\''),
  phoneNumber: Joi.string().max(13).min(10).trim(),
  gender: Joi.string().trim(),
  birthDay: Joi.string().trim()

})

module.exports = {
  categorySchema,
  registerSchema,
  updateSchema
}
