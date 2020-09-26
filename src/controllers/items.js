
const qs = require('querystring')
const { upload } = require('../helpers/init_multer')
const { createItemSchema } = require('../helpers/validation_schema')

const {
  getItemModel,
  createItemModel,
  updateItemModel,
  updatePartialModel,
  deleteItemModel,
  searchItemModel,
  countGetItemModel,
  createImageModel
} = require('../models/items')

module.exports = {
  createItem: async (req, res) => {
    upload(req, res, async (_err) => {
      if (_err) {
        res.send({
          success: false,
          message: _err.message
        })
      }
      try {
        const data = await createItemSchema.validateAsync({ ...req.body })
        // const result = await createImageModel(images)
        const result = await await createItemModel(data)

        if (result.affectedRows > 0) {
          const images = req.files.map(data => {
            return [result.insertId,data.path.replace(/\\/g, '/')]
          })
          console.log(images)
          const { affectedRows } = await createImageModel(images, result.insertId)

          if (affectedRows > 0) {
            res.status(201).send({
              success: true,
              message: 'Item has been created',
              data: {
                id: result.insertId,
                ...req.body,
              }
            })
          } else {
            res.send({
              success: false,
              message: 'Internal server Error'
            })
          }
        } else {
          res.send({
            success: false,
            messgae: 'Internal server Error'
          })
        }
      } catch (err) {
        res.send({
          success: false,
          message: err.message
        })
      }
    })
  },

  getDetailItem: async (req, res) => {
    const { id } = req.params

    const result = await getItemModel(id)
    if (result.length) {
      res.send({
        success: true,
        message: 'List of Data',
        data: result
      })
    } else {
      res.status(404).send({
        success: false,
        messgae: "Data does't exist"
      })
    }
  },
  getItem: async (req, res) => {
    let { page, limit, search, sortBy, sortTo = 'ASC', sortTime, price = 0 } = req.query
    let searchKey = ''
    let searchValue = ''
    let sortName = ''
    let sortValue = ''

    if (price === '') {
      price = 0
    }

    if (sortTime === undefined) {
      sortTime = ''
    } else {
      sortTime = `ORDER BY create_at ${sortTime}`
    }

    if (typeof sortBy === 'object') {
      sortName = Object.keys(sortBy)[0]
      sortValue = Object.values(sortBy)[0]
    }

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit

    let sort = `HAVING ${sortName} = ${sortValue}`
    if (sortBy === undefined) {
      sort = ''
    }

    const result = await searchItemModel([searchKey, searchValue], [limit, offset], sort, sortTo,
      sortTime, price)
    if (result) {
      const pageInfo = {
        count: 0,
        pages: 0,
        currentPage: page,
        limitPerPage: limit,
        nextLink: null,
        prevLink: null
      }
      if (result.length) {
        const data = await countGetItemModel([searchKey, searchValue], sort)
        const { count } = data[0]
        pageInfo.count = count
        pageInfo.pages = Math.ceil(count / limit)
        const { pages, currentPage } = pageInfo
        if (currentPage < pages) {
          pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
        }

        if (currentPage > 1) {
          pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
        }
        res.send({
          success: true,
          message: 'List of item',
          data: result,
          pageInfo
        })
      } else {
        res.send({
          success: false,
          message: 'Data not found'
        })
      }
    } else {
      res.status(500).send({
        success: false,
        messgae: 'Internal Server Error'
      })
    }
  },
  updateItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await createItemSchema.validateAsync({ ...req.body })
      const dataResult = await getItemModel(id)
      if (dataResult.length > 0) {
        const result = await updateItemModel(id, data)
        console.log(result)
        if (result.affectedRows) {
          res.send({
            success: true,
            message: 'data updated !',
            data: data
          })
        } else {
          res.status(500).send({
            success: false,
            message: 'Internal Server Error'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: `Data with id ${id} does't exist`
        })
      }
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  },
  updatePatrialItem: (req, res) => {
    const { id } = req.params
    let { name = '', price = '', description = '', category = '' } = req.body

    if (name.trim() || price.trim() || description.trim() || category.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1] > 0) ? `${item[0]} = ${item[1]}` : `${item[0]} = '${item[1]}'`
          })

          let coma = ''
          if (category !== '') {
            category = `category = ${category}`
            coma = ','
          }

          updatePartialModel(id, data, [coma, category], result => {
            if (result.affectedRows > 0) {
              res.send({
                success: true,
                message: `Item ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update data'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `There is no item with id ${id}`
          })
        }
      })
    }
  },

  deleteItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, dataResult => {
      if (dataResult.length > 0) {
        deleteItemModel(id, result => {
          if (result.affectedRows > 0) {
            res.send({
              success: true,
              message: 'data has been deleted',
              data: null
            })
          } else {
            res.status(500).send({
              success: false,
              message: 'Internal Server Error'
            })
          }
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data with id ${id} does't exist`
        })
      }
    })
  }
  // uploadItemImages:(req,res)=>
  // upload(req,res,err=>)

}
