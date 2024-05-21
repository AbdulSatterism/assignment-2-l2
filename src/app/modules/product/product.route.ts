import express from 'express'
import { productController } from './product.controller'

const router = express.Router()

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:productId', productController.getProductById)

export const productRoutes = router
