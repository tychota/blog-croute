import { Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { ModuleRef } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CQRSModule } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './articles.entity';

import { CreateArticleHandler } from './commands/handlers/create-article.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ArticlesEntity]), CQRSModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, CreateArticleHandler],
})
export class ArticlesModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler]);
  }
}
