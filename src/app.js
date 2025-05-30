import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import dashboardRoute from './routes/dashboard.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
// Vistas EJS
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Rutas
app.use(dashboardRoute)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`)
})
