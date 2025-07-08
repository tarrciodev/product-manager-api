import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../repositories/products/mongo/mongo-repository'
import { GetProductByIdService } from '../../../services/products/get-product-by-id-service'

export const getProductByIdController: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products/:id',
    {
      schema: {
        tags: ['Products'],
        description: 'Get product by id',
        summary: 'Retrieve a product by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().optional(),
            name: z.string(),
            price: z.number(),
            description: z.string().optional(),
            countInStock: z.number().min(0).optional(),
            model: z.string().optional(),
            image: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const productsRepository = new MongoProductsRepository()
      const getProductByIdService = new GetProductByIdService(
        productsRepository
      )
      const product = await getProductByIdService.execute(request.params.id)
      reply.status(200).send(product)
    }
  )
}
