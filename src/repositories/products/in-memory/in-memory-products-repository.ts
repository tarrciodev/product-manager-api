import { Product } from '../../../entities/product-entity'

export class InMemoryProductsRepository {
  public products: Product[] = []
  async create(product: Product): Promise<Product> {
    this.products.push(product)
    return product
  }
  async findAll(): Promise<Product[]> {
    return this.products
  }
  async delete(id: string): Promise<void> {
    const findInDatabase = this.products.find(product => product.id === id)
    if (!findInDatabase) {
      throw new Error(`Product with id ${id} not found`)
    }
    this.products = this.products.filter(product => product.id !== id)
  }
  async findById(id: string): Promise<Product> {
    const product = this.products.find(product => product.id === id)
    return product as Product
  }
  async update(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      return null
    }

    const currentProduct = this.products[index]
    const updatedProduct = new Product({
      id: currentProduct.id,
      name: productData.name ?? currentProduct.name,
      price: productData.price ?? currentProduct.price,
      description: productData.description ?? currentProduct.description,
      countInStock: productData.countInStock ?? currentProduct.countInStock,
      image: productData.image ?? currentProduct.image,
      model: productData.model ?? currentProduct.model,
    })

    this.products[index] = updatedProduct
    return updatedProduct
  }

  async findUnique({
    name,
    model,
  }: {
    name: string
    model: string
  }): Promise<Product | null> {
    const product = this.products.find(
      product => product.name === name && product.model === model
    )
    return product as Product | null
  }
  async findWithLowStock(): Promise<Product[]> {
    return this.products.filter(product => product.countInStock < 10)
  }
}
