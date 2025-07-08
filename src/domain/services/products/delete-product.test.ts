import { describe, expect, it, vi } from 'vitest'
import { InMemoryProductsRepository } from '../../repositories/products/in-memory/in-memory-products-repository'
import { DeleteProductUseCase } from './delete-product-service'

describe('DeleteProjectUseCase', () => {
  it('should call repository.delete with the correct ID', async () => {
    const productsRepository = new InMemoryProductsRepository()

    const deleteSpy = vi
      .spyOn(productsRepository, 'delete')
      .mockResolvedValue(undefined)

    const deleteProject = new DeleteProductUseCase(productsRepository)

    await deleteProject.execute('1')

    expect(deleteSpy).toHaveBeenCalledWith('1')
    expect(deleteSpy).toHaveBeenCalledTimes(1)

    deleteSpy.mockRestore()
  })

  it('should throw an error if product not found', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const deleteProduct = new DeleteProductUseCase(productsRepository)

    await expect(deleteProduct.execute('non-existent-id')).rejects.toThrow()
  })
})
