export interface CreateProductDTO {
  id?: string
  name: string
  price: number
  description?: string
  countInStock: number
  model?: string
  image?: string
}
