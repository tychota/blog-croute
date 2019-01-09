import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationModule } from './application/app.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
