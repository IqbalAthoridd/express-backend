const Joi = require('joi')

const categorySchema = Joi.object({
  name: Joi.string().min(4).trim().replace("'", '\'').required(),
  description: Joi.string().min(5).trim().replace("'", '\'').required()
})

const registerSchema = Joi.object({
  name: Joi.string().min(4).max(20).trim().replace("'", '\'').required(),
  email: Joi.string().lowercase().min(5).trim().email().replace("'", '\'').required(),
  password: Joi.string().min(8).trim().replace("'", '\'').required()
})
const sellerregisterSchema = Joi.object({
  name: Joi.string().min(4).max(20).trim().replace("'", '\'').required(),
  email: Joi.string().lowercase().min(5).trim().email().replace("'", '\'').required(),
  password: Joi.string().min(8).trim().replace("'", '\'').required(),
  phone_number: Joi.string().trim().required(),
  store_name: Joi.string().trim().required()
})

const updateSchema = Joi.object({
  name: Joi.string().min(4).max(20).trim().replace("'", '\''),
  email: Joi.string().email().trim().lowercase().min(5).replace("'", '\''),
  phone_number: Joi.number(),
  gender: Joi.string().trim(),
  birthDay: Joi.string().trim()

})

const updateSellerSchema = Joi.object({
  store_name: Joi.string().min(4).max(20).trim().replace("'", '\''),
  email: Joi.string().email().trim().lowercase().min(5).replace("'", '\''),
  phone_number: Joi.number(),
  description: Joi.string().trim()

})

const createItemSchema = Joi.object({
  name: Joi.string().min(2).trim().replace("'", '\'').required(),
  price: Joi.number().required(),
  description: Joi.string().trim().replace("'", '\'').required(),
  quantity: Joi.number().required(),
  condition_id: Joi.number().required(),
  category_id: Joi.number().required(),
  colorName: Joi.string().trim().required(),
  hexcode: Joi.string().trim().required()
})

const updatePartialsSchema = Joi.object({
  name: Joi.string().min(2).trim().replace("'", '\''),
  price: Joi.number(),
  description: Joi.string().trim().replace("'", '\''),
  quantity: Joi.number(),
  condition_id: Joi.number(),
  category_id: Joi.number(),
  colorName: Joi.string().trim(),
  hexcode: Joi.string().trim()
})

const conditionSchema = Joi.object({
  name: Joi.string().trim().required()
})

const colorSchema = Joi.object({
  colorName: Joi.string().trim(),
  hexcode: Joi.string().trim()
})

const roleSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required()
})

const adreSchema = Joi.object({
  recipient: Joi.string().trim().required(),
  phone_number: Joi.string().trim().required(),
  adress: Joi.string().trim().required(),
  postal_code: Joi.string().trim().required(),
  city: Joi.string().trim().required()
})
const ratingSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().trim()
})
const updateRatingSchema = Joi.object({
  rating: Joi.number(),
  comment: Joi.string().trim()
})

const createPaymentSchema = Joi.object({
  name: Joi.string().trim().required(
  )
})

module.exports = {
  categorySchema,
  registerSchema,
  updateSchema,
  createItemSchema,
  updatePartialsSchema,
  conditionSchema,
  colorSchema,
  roleSchema,
  adreSchema,
  sellerregisterSchema,
  ratingSchema,
  updateRatingSchema,
  updateSellerSchema,
  createPaymentSchema
}
