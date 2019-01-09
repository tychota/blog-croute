import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticlesEntity])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
