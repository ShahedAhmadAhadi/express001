const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./public'))

app.get('/api', (req, res) => {
    res.json({result: 'success'})
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
