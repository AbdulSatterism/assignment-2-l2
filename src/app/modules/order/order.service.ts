import { TOrder } from './order.interface'
import { Orders } from './order.model'

const createOrder = async (orderData: TOrder) => {
  const result = await Orders.create(orderData)
  return result
}

export const orderServices = {
  createOrder,
}
