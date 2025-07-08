import { expect, test } from 'vitest'
import { Product } from './product-entity'

test('Create a product', () => {
  const product = new Product({
    id: '1',
    name: 'Product 1',
    price: 100,
    description: 'This is a product',
    countInStock: 10,
    image: 'image-url',
  })

  expect(product).toBeInstanceOf(Product)

  expect(() => {
    return new Product({
      id: '1',
      name: 'Product 1',
      price: -1,
      description: 'This is a product',
      countInStock: 10,
      image: 'image-url',
    })
  }).toThrow()
})
