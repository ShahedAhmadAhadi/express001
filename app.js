const express = require('express')
const app = express()
const path = require('path')
const { products } = require('./data')

app.use(express.static('./public'))

app.get('/api', (req, res) => {
    res.send('<h1>Home Page</h1> <a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
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

app.get(`/api/products/:productId`, (req, res) => {
    const { productId } = req.params
    const product = products.find(item => item.id === +productId)
    if (!product) {
        return res.status(404).send('Product does not exitst')
    }
    console.log(product)
    res.json(product)
})

app.get('/api/query', (req, res) => {
    const {query} = req
    res.json({'req': 'Request for query params', data: query})
})

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page')
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resourse not Found, 404</h1>')
})

app.listen(5000, () => {
    console.log('server listening')
})
