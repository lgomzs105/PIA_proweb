import { Router } from 'express'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const router = Router()

// Emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ruta: /calendario
router.get('/calendario', async (req, res) => {
  try {
    const pathToJSON = join(__dirname, '../../data/eventos.json')
    const raw = await readFile(pathToJSON, 'utf-8')
    const eventos = JSON.parse(raw)

    res.render('user/calendario', { eventos }) // Asegúrate de tener esta vista
  } catch (err) {
    console.error('❌ Error cargando eventos:', err)
    res.status(500).send('Error interno al cargar el calendario')
  }
})

export default router
