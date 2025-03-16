import { Injectable, BadRequestException } from '@nestjs/common';
import { InMemoryUserRepository } from '../infrastructure/user.repository.in-memory';
import { User } from '../domain/user.entity';

@Injectable()
export class AuthService {
  private userRepository = new InMemoryUserRepository();

  async signUp(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new User(0, username, password);
    return this.userRepository.create(user);
  }

  async signIn(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || user.password !== password) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
