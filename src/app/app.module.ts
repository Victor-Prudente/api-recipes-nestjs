import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
