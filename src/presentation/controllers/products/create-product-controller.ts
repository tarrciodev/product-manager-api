import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../repositories/products/mongo/mongo-repository'
import { CreateProductService } from '../../../services/products/create-product-service'

export const createProductController: FastifyPluginAsyncZod = async app => {
  app.post(
    '/products',
    {
      schema: {
        tags: ['Products'],
        body: z.object({
          id: z.string().optional(),
          name: z.string().min(1, 'Name is required'),
          price: z.number().min(0, 'Price must be a positive number'),
          description: z.string().optional(),
          countInStock: z
            .number()
            .min(0, 'Count in stock must be a positive number'),
          model: z.string().optional(),
          image: z.string().optional(),
        }),
      },
    },
    async (request, replay) => {
      const { name, price, description, countInStock, model, image } =
        request.body

      const productsRepository = new MongoProductsRepository()
      const createProductService = new CreateProductService(productsRepository)

      const product = await createProductService.execute({
        name,
        price,
        description,
        countInStock,
        model,
        image,
      })

      replay.status(201).send(product)
    }
  )
}
