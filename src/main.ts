import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
//import { UserService } from './modules/user/user.service';
//import { CreateUserDto } from './modules/user/dto/create-user.dto';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  /*
  const userService = app.get(UserService);

  const adminDto: CreateUserDto = {
    name: 'adm',
    email: 'adm@gmail.com',
    password: 'adm',
    role: 'admin',
  };

  await userService.create(adminDto);

  await app.close();
  */
}
bootstrap();
