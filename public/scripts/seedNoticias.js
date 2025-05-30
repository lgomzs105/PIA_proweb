// public/scripts/seedNoticias.js
import pool from '../../src/db.js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const noticias = [

]

async function seedNoticias() {
  try {
    for (const noticia of noticias) {
      await pool.query(
        `INSERT INTO noticias 
          (titulo, fecha, id_categoria, id_autor, descripcion, contenido, portada, vistas, destacada, estado)
         VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          noticia.titulo,
          noticia.fecha,
          noticia.id_categoria,
          noticia.id_autor,
          noticia.descripcion,
          noticia.contenido,
          noticia.portada,
          noticia.vistas,
          noticia.destacada,
          noticia.estado
        ]
      )
    }

    console.log('✅ Noticias insertadas correctamente')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error al insertar noticias:', err)
    process.exit(1)
  }
}

seedNoticias()
