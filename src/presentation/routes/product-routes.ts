import type { FastifyPluginAsync } from 'fastify'
import { createProductController } from '../controllers/products/create-product-controller'
import { deleteProductController } from '../controllers/products/delete-product-controller'
import { getAllProductsController } from '../controllers/products/get-all-products-controller'
import { getProductByIdController } from '../controllers/products/get-product-by-id-controller'
import { getProductsWithLowStockController } from '../controllers/products/get-products-with-low-stock-controller'
import { updateProductController } from '../controllers/products/update-product-controller'

export const productRoutes: FastifyPluginAsync = async app => {
  app.register(createProductController)
  app.register(getAllProductsController)
  app.register(getProductByIdController)
  app.register(getProductsWithLowStockController)
  app.register(deleteProductController)
  app.register(updateProductController)
}
