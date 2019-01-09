import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { ArticlesInterface } from './interfaces/articles.interface';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(): Promise<ArticlesInterface[]> {
    return this.articlesService.getAllArticles();
  }

  @Get(':id')
  getArticle(@Param() params: { id: string }): Promise<ArticlesInterface> {
    return this.articlesService.getArticle(params.id);
  }

  @Post()
  postArticle(
    @Body() articleDto: ArticlesInterface,
  ): Promise<ArticlesInterface> {
    return this.articlesService.store(articleDto);
  }
}
