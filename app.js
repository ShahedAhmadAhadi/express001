const express = require('express')
const app = express()
const path = require('path')
const peopleR = require('./routes/people')
const { products, people } = require('./data')

app.use('/api', peopleR)

app.use(express.static('./public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/users', (req, res) => {
    res.json(people)
})

app.post('/users/add/', (req, res) => {
    const { name } = req.body
    if (name) {
        people.push({id: people.length + 1, name: name})
        return res.status(201).json(people)
    }
    res.status(400).json({error: 'No Credentials added'})
})

app.post('/users', (req, res) => {
    res.json(req.body)
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
