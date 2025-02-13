import { Router } from 'express'
import * as product from '../controllers/product.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth.jwt, auth.admin, product.create)

export default router
