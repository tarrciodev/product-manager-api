import { Product } from '../../../entities/product-entity'
import { ProductModel } from '../../../models/product-model'
import { ProductsRepository } from '../products-repository'

export class MongoProductsRepository implements ProductsRepository {
  async create(product: Product): Promise<Product> {
    const parsedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      countInStock: product.countInStock,
      image: product.image,
    }

    const createdProduct = await ProductModel.create(parsedProduct)
    const productId = createdProduct.toObject()._id.toString()

    return new Product({
      id: productId,
      name: product.name,
      price: product.price,
      description: product.description as string,
      countInStock: product.countInStock,
      image: product.image as string,
      model: product?.model as string,
    })
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find().lean()
    const parsedProducts = products.map(product => {
      return new Product({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description as string,
        countInStock: product.countInStock,
        image: product.image as string,
        model: product?.model as string,
      })
    })

    return parsedProducts
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id)
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id).lean()

    if (!product) {
      return null
    }
    const parsedProduct = new Product({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description as string,
      countInStock: product.countInStock,
      image: product.image as string,
      model: product?.model as string,
    })
    return parsedProduct
  }

  async update(id: string, product: Product): Promise<Product | null> {
    const parsedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      countInStock: product.countInStock,
      image: product.image,
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: parsedProduct },
      { new: true }
    ).lean()

    const parseObject = updateProduct

    return new Product({
      id: parseObject?._id.toString(),
      name: parseObject?.name as string,
      price: parseObject?.price as number,
      description: parseObject?.description as string,
      countInStock: parseObject?.countInStock as number,
      image: parseObject?.image as string,
      model: parseObject?.model as string,
    })
  }

  async findWithLowStock(): Promise<Product[]> {
    const products = await ProductModel.find({
      countInStock: { $lt: 10 },
    }).lean()
    const parsedProducts = products.map(product => {
      return new Product({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description as string,
        countInStock: product.countInStock,
        image: product.image as string,
        model: product?.model as string,
      })
    })

    return parsedProducts
  }

  async findUnique({
    name,
    model,
  }: {
    name: string
    model: string
  }): Promise<Product | null> {
    const product = await ProductModel.findOne({ name, model }).lean()

    if (!product) {
      return null
    }

    const parsedProduct = new Product({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description as string,
      countInStock: product.countInStock,
      image: product.image as string,
      model: product?.model as string,
    })
    return parsedProduct
  }
}
