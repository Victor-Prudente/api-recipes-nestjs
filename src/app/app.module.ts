import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RecipeModule } from 'src/modules/recipes/recipe.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    UserModule,
    AuthModule,
    RecipeModule,
    MulterModule.register({
      dest: './imagens', // ou o diretório desejado para salvar as imagens
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
