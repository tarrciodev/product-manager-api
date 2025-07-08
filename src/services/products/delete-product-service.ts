import type { ProductsRepository } from '../../repositories/products/products-repository'

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async execute(id: string): Promise<void> {
    await this.productsRepository.delete(id)
    return
  }
}
