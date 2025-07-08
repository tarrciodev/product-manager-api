import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../repositories/products/mongo/mongo-repository'
import { GetProductsWithLowStockService } from '../../../services/products/get-products-with-low-stock-service'

export const getProductsWithLowStockController: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/products/low-stock',
      {
        schema: {
          tags: ['Products'],
          description: 'Get products with low stock',
          summary: 'Retrieve a list of products with low stock',
          response: {
            200: z.array(
              z.object({
                id: z.string().optional(),
                name: z.string(),
                price: z.number(),
                description: z.string().optional(),
                countInStock: z.number().min(0).optional(),
                model: z.string().optional(),
                image: z.string().optional(),
              })
            ),
          },
        },
      },
      async (request, reply) => {
        const productsRepository = new MongoProductsRepository()
        const getProductsWithLowStockService =
          new GetProductsWithLowStockService(productsRepository)
        const products = await getProductsWithLowStockService.execute()
        reply.status(200).send(products)
      }
    )
  }
