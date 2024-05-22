import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoutes } from './app/modules/product/product.route'
import { orderRoutes } from './app/modules/order/order.router'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello next level developer good journey with assignment-2!')
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
