const Joi = require('joi')

const categorySchema = Joi.object({
  name: Joi.string().min(4).trim().replace("'", '\'').required(),
  description: Joi.string().min(5).trim().replace("'", '\'').required()
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

const createItemSchema = Joi.object({
  name: Joi.string().min(2).trim().replace("'", '\'').required(),
  price: Joi.number().required(),
  description: Joi.string().trim().replace("'", '\'').required(),
  quantity: Joi.number().required(),
  condition_id: Joi.number().required(),
  category_id: Joi.number().required()
})

const updatePartialsSchema = Joi.object({
  name: Joi.string().min(2).trim().replace("'", '\''),
  price: Joi.number(),
  description: Joi.string().trim().replace("'", '\''),
  quantity: Joi.number(),
  condition_id: Joi.number(),
  category_id: Joi.number()
})

module.exports = {
  categorySchema,
  registerSchema,
  updateSchema,
  createItemSchema,
  updatePartialsSchema
}
