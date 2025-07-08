import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../domain/repositories/products/mongo/mongo-repository'
import { UpdateProductService } from '../../../domain/services/products/update-product-service'

export const updateProductController: FastifyPluginAsyncZod = async app => {
  app.put(
    '/products/:id',
    {
      schema: {
        tags: ['Products'],
        description: 'Update product',
        summary: 'Update a product by id',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
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
    async (request, reply) => {
      const { id } = request.params
      const { name, price, description, countInStock, model, image } =
        request.body

      const productsRepository = new MongoProductsRepository()
      const updateProductService = new UpdateProductService(productsRepository)

      const product = await updateProductService.execute({
        id,
        product: {
          name,
          price,
          description,
          countInStock,
          model,
          image,
        },
      })

      reply.status(200).send(product)
    }
  )
}
