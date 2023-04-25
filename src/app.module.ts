import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { typeOrmAsyncConfig } from './lib/config';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
