import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'
import { Products } from '../product/product.model'

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

// check product valid or not
orderSchema.pre('save', async function (next) {
  const productId: string = this.productId

  const productData = await Products.findOne({ _id: productId })
  if (!productData) {
    throw new Error('product not found')
  }

  if (productData.inventory.quantity < this.quantity) {
    throw new Error('product quantity not available')
  }

  productData.inventory.quantity -= this.quantity
  if (productData.inventory.quantity <= 0) {
    productData.inventory.inStock = false
  }

  next()
})

//product quantity update
orderSchema.post('save', async function (doc, next) {
  const productId: string = doc.productId

  const productData = await Products.findOne({ _id: productId })
  if (!productData) {
    throw new Error('product not found')
  }

  if (productData.inventory.quantity < doc.quantity) {
    throw new Error('product quantity not available')
  }

  productData.inventory.quantity -= doc.quantity

  if (productData.inventory.quantity <= 0) {
    productData.inventory.inStock = false
  }

  next()
})

export const Orders = model<TOrder>('Orders', orderSchema)
