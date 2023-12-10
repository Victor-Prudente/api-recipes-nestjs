import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IUser } from 'src/shared/interfaces/user.interface';

export class CreateUserDto implements IUser {
  @IsString({ message: 'O id deve ser uma string' })
  @IsOptional()
  id?: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail()
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazio' })
  password: string;

  @IsOptional()
  @IsString({ message: 'O role deve ser uma string' })
  @IsIn(['user', 'admin'], { message: 'O role deve ser "user" ou "admin"' })
  role?: 'user' | 'admin';
}
