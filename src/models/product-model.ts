import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: String,
    countInStock: {
      type: Number,
      default: 0,
    },
    model: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const ProductModel = mongoose.model('Product', productSchema)
