import pool from '../../src/db.js'
import fs from 'fs/promises'

try {
  const file = await fs.readFile('./public/scripts/eventos.json', 'utf-8')
  const eventos = JSON.parse(file)

  for (const ev of eventos) {
    await pool.query(
      `INSERT INTO eventos (slug, titulo, icono, portada, fecha, duracion, horario, lugar, descripcion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (slug) DO NOTHING`,
      [
        ev.slug,
        ev.titulo,
        ev.icono,
        ev.portada,
        ev.fecha,
        ev.duracion,
        ev.horario,
        ev.lugar,
        ev.descripcion
      ]
    )
  }

  console.log('✅ Eventos insertados correctamente')
} catch (err) {
  console.error('❌ Error insertando eventos:', err)
} finally {
  await pool.end()
}
