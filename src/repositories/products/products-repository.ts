import type { Product } from '../../entities/product-entity'

export interface ProductsRepository {
  create(product: Product): Promise<Product>
  findAll(): Promise<Product[]>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Product | null>
  update(id: string, product: Product): Promise<Product | null>
  findWithLowStock(): Promise<Product[]>
  findUnique({
    name,
    model,
  }: {
    name: string
    model: string
  }): Promise<Product | null>
}
