import { Product } from '../../entities/product-entity'
import type { ProductsRepository } from '../../repositories/products/products-repository'
import type { CreateProductDTO } from './create-product-dto'

export class CreateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(request: CreateProductDTO): Promise<Product> {
    const data = new Product({
      id: request?.id,
      name: request.name,
      price: request.price,
      description: request.description,
      countInStock: request.countInStock,
      image: request.image as string,
    })

    const productAlreadyExists = await this.productsRepository.findUnique({
      name: data.name,
      model: data.model as string,
    })

    if (productAlreadyExists) {
      throw new Error(`Product with name ${data.name} already exists`)
    }

    const response = await this.productsRepository.create(data)
    return response
  }
}
