import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { sub: user.id, email: user.email };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Criar o usuário com a senha hash
    const newUser = await this.usersService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    // Gerar o token JWT
    const payload = { sub: newUser.id, email: newUser.email };

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(email: string, password: string) {
    try {
      // Buscar o usuário pelo email no banco de dados
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Verificar se a senha fornecida corresponde à senha hash armazenada
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
