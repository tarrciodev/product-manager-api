interface ProductEntityProps {
  id?: string
  name: string
  price: number
  description?: string
  countInStock: number
  image: string
  model?: string
}

export class Product {
  private props: ProductEntityProps

  set id(id: string) {
    this.props.id = id
  }
  get id() {
    return this.props.id as string
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
  }

  get countInStock() {
    return this.props.countInStock
  }

  get image() {
    return this.props.image
  }

  get model() {
    return this.props.model
  }

  constructor(props: ProductEntityProps) {
    if (props.price < 0) {
      throw new Error('Invalid price: must be greater than 0')
    }
    this.props = props
  }
}
