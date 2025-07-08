import { User, type UserEntityProps } from '../../../entities/user-entity'
import type { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public users: User[] = []

  async create(user: UserEntityProps): Promise<User> {
    const userEntity = new User(user)
    this.users.push(userEntity)
    return userEntity
  }
  async findAll(): Promise<UserEntityProps[]> {
    return this.users
  }
  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
  }
  async findByEmail(email: string): Promise<UserEntityProps> {
    const user = this.users.find(user => user.email === email)
    return user as User
  }
  async save(id: string, user: UserEntityProps): Promise<User> {
    const userEntity = new User(user)
    this.users = this.users.map(user => {
      if (user.id === id) {
        return userEntity
      }
      return user
    })
    return userEntity
  }
}
