import { beforeEach, describe, expect, it } from 'vitest'
import { Product } from '../../entities/product-entity'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { GetProductByIdService } from './get-product-by-id-service'

describe('Get product by id', () => {
  let productsRepository: InMemoryProductsRepository
  let getProductById: GetProductByIdService

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    getProductById = new GetProductByIdService(productsRepository)
  })

  it('should return a product', async () => {
    // Cria um produto primeiro
    const product = new Product({
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'Test description',
      countInStock: 10,
      model: 'Test Model',
      image: 'Test Image',
    })
    await productsRepository.create(product)

    const foundProduct = await getProductById.execute('1')
    expect(foundProduct).toBeInstanceOf(Product)
  })

  it('should throw an error if product not found', async () => {
    await expect(getProductById.execute('non-existent-id')).rejects.toThrow()
  })
})
