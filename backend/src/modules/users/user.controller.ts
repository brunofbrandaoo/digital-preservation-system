import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import type { Users } from '@prisma/client';
import type { CreateUserDto } from './dto/create-user-body';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserBody: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserBody);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Users> {
    return this.usersService.deleteUser({ id });
  }
}
