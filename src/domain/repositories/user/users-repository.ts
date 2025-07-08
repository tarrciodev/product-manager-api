import type { User, UserEntityProps } from '../../domain/entities/user-entity'

export interface UsersRepository {
  create(user: User): Promise<User>
  findAll(): Promise<UserEntityProps[]>
  delete(id: string): Promise<void>
  findByEmail(email: string): Promise<UserEntityProps>
  save(id: string, user: UserEntityProps): Promise<User>
}
