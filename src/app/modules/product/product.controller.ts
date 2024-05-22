import { Request, Response } from 'express'
import { productService } from './product.service'
import productValidationSchema from './product.validation'

//create product in database
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const zodValidData = productValidationSchema.parse(product)
    const result = await productService.createProductIntoDB(zodValidData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    })
  }
}

//get all product from database
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm: any = req.query.searchTerm 
    const result = await productService.getAllProductsFromDB(searchTerm)
    res.status(200).json({
      success: true,
      message: 'Products  Retrieve successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    })
  }
}

//get single product by productId

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await productService.getSingleProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'Product find by id successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong! product not found',
      error: err.message,
    })
  }
}

//update

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const data = req.body
    const result = await productService.updateProductInDB(productId, data)

    res.status(200).json({
      success: true,
      message: 'product price updated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong product not updated',
      error: err.message,
    })
  }
}

//delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await productService.deleteProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: 'product deleted successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong product not deleted',
      error: err.message,
    })
  }
}

// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const searchTerm: any = req.query.searchTerm

//     const result = await productService.searchProductFromDB(searchTerm)

//     res.status(200).json({
//       success: true,
//       message: 'search product retrive ok successfully!',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: 'something went wrong product available',
//       error: err.message,
//     })
//   }
// }

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
