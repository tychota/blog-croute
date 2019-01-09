import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { ArticlesInterface } from './interfaces/articles.interface';

import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { ArticleRepository as CustomArticleRepository } from './articles.repository';
import { AddIdToCatalogCommand } from './commands/implementations/add-id-to-catalog.command';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articleRepository: Repository<ArticlesEntity>,
    private readonly customArticleRepository: CustomArticleRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async store(articleDto: ArticlesInterface): Promise<ArticlesEntity> {
    const articleCommand = new CreateArticleCommand(articleDto);
    const article = this.commandBus.execute(articleCommand);
    return article;
  }

  async getAllArticles(): Promise<ArticlesEntity[]> {
    const articles = this.customArticleRepository.find();
    return articles;
  }

  async getArticle(id: string): Promise<ArticlesInterface> {
    const article = this.customArticleRepository.findById(id);
    return article;
  }
}
