import { Router } from 'express'

const router = Router()

// Vista principal de consejos
router.get('/consejos', (req, res) => {
  res.render('user/consejos') // Asegúrate que views/user/advice.ejs exista
})

// Redirección si alguien accede a `/consejos/`
router.get('/', (req, res) => {
  res.redirect('/consejos')
})

export default router
