import { Injectable } from '@nestjs/common';
import type { Users } from '@prisma/client';
import type { CreateUserDto } from './dto/create-user-body';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto): Promise<Users> {
    return this.usersRepository.create(data);
  }

  async deleteUser(where: { id: string }): Promise<Users> {
    return this.usersRepository.delete(where.id);
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findByEmail(email);
  }
}
