import { Router } from 'express'

const router = Router()

router.get('/about', (req, res) => {
  res.render('user/about')
})

export default router
