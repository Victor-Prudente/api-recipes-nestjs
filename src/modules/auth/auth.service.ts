import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from 'src/shared/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user: IUser = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
