import { Router } from 'express'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const router = Router()

// Emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getEventos = async () => {
  const raw = await readFile(join(__dirname, '../../data/eventos.json'), 'utf-8')
  return JSON.parse(raw)
}

// Página principal de calendario
router.get('/calendario', async (req, res) => {
  const eventos = await getEventos()
  res.render('user/calendario', { eventos })
})

// Página individual por slug
router.get('/calendario/:slug', async (req, res) => {
  const eventos = await getEventos()
  const evento = eventos.find(e => e.slug === req.params.slug)

  if (!evento) return res.status(404).render('errors/404')

  res.render('user/evento', { evento })
})

export default router