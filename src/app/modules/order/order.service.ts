import { TOrder } from './order.interface'
import { Orders } from './order.model'

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Orders.create(orderData)
  return result
}

const getAllOrdersFromDB = async (email: any) => {
  const query = { email: { $regex: email } }
  if (email) {
    return await Orders.find(query)
  } else {
    return await Orders.find()
  }
}

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
