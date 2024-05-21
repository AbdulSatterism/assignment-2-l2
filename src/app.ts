import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoutes } from './app/modules/product/product.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('', productRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Assignment bro!')
})

export default app
