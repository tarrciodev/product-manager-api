import { Product } from '../../entities/product-entity'
import type { ProductsRepository } from '../../repositories/products/products-repository'
import type { UpdateProductDTO } from './update-product-dto'

interface UpdateProductRequest {
  id: string
  product: UpdateProductDTO
}
export class UpdateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async execute(request: UpdateProductRequest): Promise<Product | null> {
    const productExists = await this.productsRepository.findById(request.id)
    if (!productExists) {
      throw new Error(`Product with id ${request.id} not found`)
    }

    const productData = request.product

    const updatedProduct = new Product({
      id: productExists.id,
      name: productData.name ?? productExists.name,
      price: productData.price ?? productExists.price,
      description: productData.description ?? productExists.description,
      countInStock: productData.countInStock ?? productExists.countInStock,
      image: productData.image ?? productExists.image,
      model: productData.model ?? productExists.model,
    })
    await this.productsRepository.update(request.id, updatedProduct)
    return updatedProduct
  }
}
