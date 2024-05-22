import { TOrder } from './order.interface'
import { Orders } from './order.model'

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Orders.create(orderData)
  return result
}

const getAllOrdersFromDB = async (email: any) => {
  const query = email ? { email: { $regex: email } } : {}
  const result = await Orders.find(query)
  return result
}

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
