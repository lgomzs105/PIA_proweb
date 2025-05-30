// src/routes/noticias.routes.js
import { Router } from 'express'
import pool from '../db.js'

const router = Router()

// Lista de noticias
router.get('/noticias', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id_noticia, titulo, fecha, descripcion, portada
      FROM noticias
      WHERE estado = 'publicado'
      ORDER BY fecha DESC
    `)
    res.render('user/noticias', { noticias: rows })
  } catch (error) {
    console.error('Error al cargar noticias:', error.message)
    res.status(500).send('Error al cargar noticias')
  }
})

// Detalle de una noticia
router.get('/noticias/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await pool.query(`
      SELECT n.*, u.nombre AS autor
      FROM noticias n
      JOIN usuarios u ON n.id_autor = u.id_usuario
      WHERE n.id_noticia = $1
    `, [id])

    if (rows.length === 0) return res.status(404).send('Noticia no encontrada')

    res.render('user/noticia', { noticia: rows[0] })
  } catch (error) {
    console.error('Error al cargar la noticia:', error.message)
    res.status(500).send('Error al cargar la noticia')
  }
})

export default router
