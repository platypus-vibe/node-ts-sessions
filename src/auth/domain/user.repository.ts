import { User } from './user.entity';

export interface UserRepository {
  findByUsername(username: string): Promise<User | undefined>;
  create(user: User): Promise<User>;
}
