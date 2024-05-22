import { Request, Response } from 'express'
import { orderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const order = await orderServices.createOrderIntoDB(orderData)
    res.status(200).json({
      success: true,
      message: 'order create successfully!!',
      data: order,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err.message,
    })
  }
}

export const orderControllers = {
  createOrder,
}
