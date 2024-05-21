import express from 'express'
import { productController } from './product.controller'

const router = express.Router()

router.post('/api/products', productController.createProduct)
router.get('/api/products', productController.getAllProducts)
// router.get('/api/products?searchTerm=Samsung', productController.searchProduct)
router.get('/api/products/:productId', productController.getProductById)
router.put('/api/products/:productId', productController.updateProduct)
router.delete('/api/products/:productId', productController.deleteProduct)

export const productRoutes = router
