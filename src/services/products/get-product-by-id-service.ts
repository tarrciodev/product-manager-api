import type { Product } from '../../entities/product-entity'
import type { ProductsRepository } from '../../repositories/products/products-repository'

export class GetProductByIdService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  }
}
