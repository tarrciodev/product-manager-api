import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../domain/repositories/products/mongo/mongo-repository'
import { GetAllProductsService } from '../../../domain/services/products/get-all-products-service'

export const getAllProductsController: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products',
    {
      schema: {
        tags: ['Products'],
        description: 'Get all products',
        summary: 'Retrieve a list of all products',
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
      const getAllProductsService = new GetAllProductsService(
        productsRepository
      )
      const products = await getAllProductsService.execute()
      reply.status(200).send(products)
    }
  )
}
