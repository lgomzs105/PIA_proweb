import { Router } from 'express'

const router = Router()

router.get('/calendario', (req, res) => {
  res.render('user/calendario')
})

export default router
