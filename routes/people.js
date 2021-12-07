const express = require('express')
const router = express.Router()
const { products } = require('../data')

router.get('/', (req, res) => {
    res.send('<h1>Home Page</h1> <a href="/api/products">Products</a>')
})

router.get('/products', (req, res) => {
    const {search, limit} = req.query
    let queryProducts = products
    if (search) {
        if (search) {
            queryProducts = products.filter((product) => {
                return product.name.startsWith(search)
            })
        }
    }

    if (limit) {
        if (search) {
            queryProducts = queryProducts.slice(0, +limit)
        }
    }

    if (search && queryProducts.length < 1 && +limit !== 0) {
        return res.send('<h1>No product match with such query</h1>')
    }

    const newProducts = queryProducts.map((product) => {
        const { id, name, image } = product
        return {id, name, image}
    })
    res.json(newProducts )
})

router.get(`/products/:productId`, (req, res) => {
    const { productId } = req.params
    const product = products.find(item => item.id === +productId)
    if (!product) {
        return res.status(404).send('Product does not exitst')
    }
    console.log(product)
    res.json(product)
})

router.get('/query', (req, res) => {
    const {query} = req
    res.json({'req': 'Request for query params', data: query})
})

module.exports = router