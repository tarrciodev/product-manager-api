import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { MongoProductsRepository } from '../../../repositories/products/mongo/mongo-repository'
import { DeleteProductUseCase } from '../../../services/products/delete-product-service'

export const deleteProductController: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/products/:id',
    {
      schema: {
        tags: ['Products'],
        description: 'Delete product',
        summary: 'Delete a product',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const productsRepository = new MongoProductsRepository()
      const deleteProductUseCase = new DeleteProductUseCase(productsRepository)
      const { id } = request.params
      await deleteProductUseCase.execute(id)
      replay.status(204).send()
    }
  )
}
