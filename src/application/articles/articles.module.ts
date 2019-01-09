import { Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { ModuleRef } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CQRSModule, EventBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './articles.entity';
import { EventSaga } from './article.saga';
import { ArticleRepository as CustomArticleRepository } from './article.repository';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { EventEntity } from 'src/infrastructure/events/events.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticlesEntity]),
    TypeOrmModule.forFeature([EventEntity]),
    CQRSModule,
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    CreateArticleHandler,
    EventSaga,
    CustomArticleRepository,
  ],
})
export class ArticlesModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly eventBus$: EventBus,
    private readonly moduleRef: ModuleRef,
    private readonly eventSaga: EventSaga,
  ) {}

  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler]);

    this.eventBus$.setModuleRef(this.moduleRef);
    this.eventBus$.combineSagas([this.eventSaga.eventPublished]);
  }
}
