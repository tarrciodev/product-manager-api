import { describe, expect, it } from 'vitest'
import { Product } from '../../entities/product-entity'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { CreateProductService } from './create-product-service'

const productsRepository = new InMemoryProductsRepository()
describe('Create product use case', () => {
  it('should create a product with valid data', () => {
    const createProduct = new CreateProductService(productsRepository)
    const product = createProduct.execute({
      name: 'Product 2',
      price: 100,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })
    expect(product).resolves.toBeInstanceOf(Product)
  })

  it('should throw an error if product already exists', async () => {
    const createProduct = new CreateProductService(productsRepository)
    await createProduct.execute({
      name: 'Product 1',
      price: 1,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })
    const product = createProduct.execute({
      name: 'Product 1',
      price: 100,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })
    await expect(product).rejects.toThrow()
  })
})
