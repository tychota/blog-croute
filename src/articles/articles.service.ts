import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticlesEntity } from './articles.entity';
import { ArticlesInterface } from './interfaces/articles.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articleRepository: Repository<ArticlesEntity>,
  ) {}

  async store(articleDto: ArticlesInterface): Promise<ArticlesEntity> {
    const article = this.articleRepository.create(articleDto);
    await this.articleRepository.save(article);
    return article;
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
