import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto, role: 'user' });
  }

  @Post('admin')
  @UseGuards(AuthGuard)
  async createAdmin(@Body() createAdminDto: CreateUserDto, @Request() req) {
    // Verificar se o usuário autenticado é um administrador
    const authenticatedUser = req.user;

    if (authenticatedUser.role !== 'admin') {
      throw new UnauthorizedException(
        'Apenas administradores podem criar novos administradores.',
      );
    }

    return this.userService.createAdmin(createAdminDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
