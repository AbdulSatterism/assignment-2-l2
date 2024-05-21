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

const searchProductFromDB = async (searchTerm: any) => {
  const data = new RegExp(searchTerm, 'i')
  const result = await Products.find({ name: { $regex: data } })
  return result
}

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findOne({ _id: id })
  return result
}

// updat product
const updateProductInDB = async (id: string) => {
  const updatedDoc = {
    price: 1000,
  }
  const result = await Products.updateMany({ _id: id }, updatedDoc)
  return result
}
//delete from database
const deleteProductFromDB = async (id: string) => {
  const result = await Products.deleteOne({ _id: id })
  return result
}

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
  searchProductFromDB,
}
