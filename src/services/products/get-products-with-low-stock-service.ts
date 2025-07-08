import type { Product } from '../../entities/product-entity'
import type { ProductsRepository } from '../../repositories/products/products-repository'

export class GetProductsWithLowStockService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findWithLowStock()
    return products
  }
}
