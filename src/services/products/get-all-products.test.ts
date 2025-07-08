import { describe, expect, it } from 'vitest'
import { Product } from '../../entities/product-entity'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { CreateProductService } from './create-product-service'
import { GetAllProductsService } from './get-all-products-service'

describe('Get products', () => {
  it('should be able to get a list of products', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const getAllProducts = new GetAllProductsService(productsRepository)
    const createProduct = new CreateProductService(productsRepository)

    await createProduct.execute({
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })

    await createProduct.execute({
      id: '2',
      name: 'Product 2',
      price: 100,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })

    const products = await getAllProducts.execute()
    expect(products).toHaveLength(2)
  })

  it('should return an empty array if no products exist', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const getAllProducts = new GetAllProductsService(productsRepository)
    const products = await getAllProducts.execute()

    expect(products).toEqual([])
    expect(products).toHaveLength(0)
  })

  it('should be of Product instance', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const getAllProducts = new GetAllProductsService(productsRepository)
    const createProduct = new CreateProductService(productsRepository)

    await createProduct.execute({
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })

    const products = await getAllProducts.execute()
    expect(products[0]).toBeInstanceOf(Product)
  })
})
