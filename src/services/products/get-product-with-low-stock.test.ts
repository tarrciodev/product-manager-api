import { describe, expect, it } from 'vitest'
import { Product } from '../../entities/product-entity'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { CreateProductService } from './create-product-service'
import { GetProductsWithLowStockService } from './get-products-with-low-stock-service'

describe('Get product with low stock', () => {
  it('it should get products', async () => {
    // i have defined that low stock is when countInStock is less than 10
    const productsRepository = new InMemoryProductsRepository()
    const createProduct = new CreateProductService(productsRepository)
    const getProductWithLowStock = new GetProductsWithLowStockService(
      productsRepository
    )

    await createProduct.execute({
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'This is a product',
      countInStock: 9,
      image: 'image-url',
    })

    await createProduct.execute({
      id: '2',
      name: 'Product 2',
      price: 100,
      description: 'This is a product',
      countInStock: 8,
      image: 'image-url',
    })

    const products = await getProductWithLowStock.execute()
    expect(products).toHaveLength(2)
    expect(products[0]).toBeInstanceOf(Product)
  })

  it('should return an empty array if no products exist', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const getProductWithLowStock = new GetProductsWithLowStockService(
      productsRepository
    )
    const products = await getProductWithLowStock.execute()
    expect(products).toHaveLength(0)
  })
})
