import { describe, expect, it } from 'vitest'
import { Product } from '../../entities/product-entity'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { CreateProductService } from './create-product-service'
import { UpdateProductService } from './update-product-service'

describe('Update product', () => {
  it('should update a product with valid data', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const updateProduct = new UpdateProductService(productsRepository)
    const createProduct = new CreateProductService(productsRepository)

    await createProduct.execute({
      id: '1',
      name: 'Product 1',
      price: 50,
      description: 'This is a product',
      countInStock: 5,
      image: 'image-url',
    })

    const product = await updateProduct.execute({
      id: '1',
      product: {
        name: 'Updated Product',
        price: 100,
        description: 'This is an updated product',
        countInStock: 10,
        image: 'image-url',
      },
    })

    expect(product).toBeInstanceOf(Product)
  })

  it('should throw an error if product not found', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const updateProduct = new UpdateProductService(productsRepository)

    await expect(
      updateProduct.execute({
        id: 'non-existent-id',
        product: {
          name: 'Updated Product',
          price: 100,
          description: 'This is an updated product',
          countInStock: 10,
          image: 'image-url',
        },
      })
    ).rejects.toThrow()
  })
})
