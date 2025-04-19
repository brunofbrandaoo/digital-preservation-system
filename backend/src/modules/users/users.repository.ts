import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { Users, Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  async delete(id: string): Promise<Users> {
    return this.prisma.users.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }
}
