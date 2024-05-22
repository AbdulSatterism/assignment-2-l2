import express from 'express'
import { orderControllers } from './order.controllers'

const router = express.Router()

router.post('/', orderControllers.createOrder)
router.get('/', orderControllers.getOrders)

export const orderRoutes = router
