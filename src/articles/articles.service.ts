import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { ArticlesInterface } from './interfaces/articles.interface';

import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/article-created.command';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articleRepository: Repository<ArticlesEntity>,
    private readonly commandBus: CommandBus,
  ) {}

  async store(articleDto: ArticlesInterface): Promise<ArticlesEntity> {
    const articleCommand = new CreateArticleCommand(articleDto);
    return this.commandBus.execute(articleCommand);
  }

  async getAllArticles(): Promise<ArticlesEntity[]> {
    const articles = this.articleRepository.find();
    return articles;
  }

  async getArticle(id: string): Promise<ArticlesInterface> {
    const article = this.articleRepository.findOne(id);
    return article;
  }
}
