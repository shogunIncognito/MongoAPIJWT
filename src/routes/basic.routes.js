import { Router } from 'express'
import { dashboard, notFound } from '../controllers/basic.controller.js'
const router = Router()

router.get('/', dashboard)
      .use(notFound)

export default router