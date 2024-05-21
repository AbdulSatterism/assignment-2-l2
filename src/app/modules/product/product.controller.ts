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
    const result = await productService.getAllProductsFromDB()
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
      message: 'something went wrong',
      error: err.message,
    })
  }
}

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
}