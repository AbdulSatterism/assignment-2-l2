import { Request, Response } from 'express'
import { orderServices } from './order.service'
import orderValidationSchema from './order.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body

    const zodValidOrder = orderValidationSchema.parse(orderData)
    const order = await orderServices.createOrderIntoDB(zodValidOrder)
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const email: any = req.query.email
    const result = await orderServices.getAllOrdersFromDB(email)
    const message = email
      ? `Orders fetched successfully for user ${email}!`
      : 'order get successfully!!'

    res.status(200).json({
      success: true,
      message: message,
      data: result,
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
  getOrders,
}
