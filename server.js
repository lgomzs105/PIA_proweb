const express = require('express')
const app = express()
const path = require('path')
const eventos = require('./data/eventos.json')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/evento/:slug', (req, res) => {
    const evento = eventos.find(e => e.slug === req.params.slug)
    if (!evento) return res.status(404).send('Evento no encontrado')
    res.render('event', { evento })
})

// Otras rutas
app.get('/calendario', (req, res) => {
    res.render('calendario', { eventos })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
