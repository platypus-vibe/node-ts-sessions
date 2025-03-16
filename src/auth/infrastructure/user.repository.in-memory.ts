import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private idCounter = 1;

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(user: User): Promise<User> {
    user.id = this.idCounter++;
    this.users.push(user);
    return user;
  }
}
