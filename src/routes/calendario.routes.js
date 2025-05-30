import { Router } from 'express'
import db from '../db.js'
import pool from '../db.js'

const router = Router()

router.get('/calendario', async (req, res) => {
  try {
    const { rows: eventos } = await pool.query(
      'SELECT slug, titulo, fecha, icono FROM eventos ORDER BY fecha'
    )
    res.render('user/calendario', { eventos })
  } catch (err) {
    console.error('Error al cargar eventos:', err)
    res.status(500).send('Error al cargar eventos')
  }
})


// Calendario general
router.get('/calendario', async (req, res) => {
  try {
    const { rows: eventos } = await db.query('SELECT slug, titulo, fecha, icono FROM eventos')
    res.render('user/calendario', { eventos })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al cargar los eventos')
  }
})

// Vista individual de evento
router.get('/calendario/:slug', async (req, res) => {
  const { slug } = req.params
  try {
    const { rows } = await pool.query(
      'SELECT * FROM eventos WHERE slug = $1',
      [slug]
    )
    if (rows.length === 0) return res.status(404).send('Evento no encontrado')

    res.render('user/evento', { evento: rows[0] })
  } catch (err) {
    console.error('Error al cargar evento:', err)
    res.status(500).send('Error al cargar evento')
  }
})


export default router
