import { TProduct } from './product.interface'
import { Products } from './product.model'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Products.create(productData)
  return result
}

const getAllProductsFromDB = async (searchTerm: any) => {
  const query = {
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ],
  }
  if (searchTerm) {
    return await Products.find(query)
  } else {
    return await Products.find()
  }
}

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findOne({ _id: id })
  return result
}

// update product
const updateProductInDB = async (id: string, data: TProduct) => {
  const result = await Products.findByIdAndUpdate(id, data, { new: true })
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
}
