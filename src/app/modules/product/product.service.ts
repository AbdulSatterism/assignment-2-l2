import { TProduct } from './product.interface'
import { Products } from './product.model'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Products.create(productData)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Products.find()
  return result
}
// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findOne({ _id: id })
  return result
}

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
}
