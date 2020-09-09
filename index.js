const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('./src/helpers/db')
const qs = require('querystring')

app.use(bodyParser.urlencoded({
    extended: false
}))


app.post('/item', (req, res) => {
    const { name, price, description } = req.body
    if (name && price && description) {
        db.query(`INSERT into items (name,price,description) VALUES ('${name}',${price},'${description}')`, (err, result, field) => {
            if (err) throw err
            res.status(201).send({
                succes: true,
                messgae: 'item has been created',
                item: req.body
            })
        })

    } else {
        res.status(500).send({
            success: false,
            messgae: 'All field must be filed'
        })
    }
})


app.get('/item', (req, res) => {
    let { page, limit, search } = req.query;
    let searchKey = ''
    let searchValue = ''

    console.log(typeof search)
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
    page = (page - 1) * limit
    db.query(`SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${page}`, (err, result, fields) => {
        if (!err) {
            let pageInfo = {
                count: 0,
                pages: 0,
                currentPage: page,
                limitPerPage: limit,
                nextLink: null,
                prevLink: null
            }
            if (result.length) {
                db.query(`SELECT COUNT (*) as count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`, (err, data, field) => {
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
                        message: "List of item",
                        data: result,
                        pageInfo
                    })
                })

            } else {
                res.send({
                    success: false,
                    message: "tidak ada item"
                })
            }

        } else {
            res.status(500).send({
                success: false,
                messgae: "Internal Server Error"
            })
        }
    })
})

app.put('/item/:id', (req, res) => {
    const { name, price, description } = req.body
    const { id } = req.params
    if (name && price && description) {
        db.query(`SELECT * FROM ITEMS WHERE id=${id}`, (req, dataItems, field) => {
            if (dataItems.length > 0) {
                db.query(`UPDATE items SET name ='${name}',price=${price},description='${description}' WHERE id=${id}`, (err, result, field) => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: "data updated !",
                            data: dataItems
                        })
                    } else {
                        console.log(err.message)
                        res.status(500).send({
                            success: false,
                            message: "Internal Server Error"
                        })
                    }
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: `Data with id ${id} does't exist`
                })
            }
        })
    } else {
        res.status(400).send({
            success: false,
            message: "All data must be filled"
        })
    }

})

app.get('/item/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM items WHERE id=${id}`, (err, result, field) => {
        if (!err) {

            if (result.length > 0) {
                res.send({
                    success: true,
                    message: "List of Data",
                    data: result
                })
            } else {
                res.status(404).send({
                    success: false,
                    messgae: "Data does't exist"
                })
            }

        } else {
            console.log(err.message)
            res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
    })
})



app.listen(8080, () => {
    console.log("port is running at port:8080")
})