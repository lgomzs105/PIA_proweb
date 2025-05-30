import { Router } from 'express'

const router = Router()

router.get('/dashboard', (req, res) => {
  res.render('user/dashboard')
})

export default router

router.get('/', (req, res) => {
  res.redirect('/dashboard')
})
