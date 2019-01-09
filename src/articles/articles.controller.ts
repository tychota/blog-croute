import { Get, Controller } from '@nestjs/common';
import { ArticlesInterface } from './interfaces/articles.interface';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticle(): ArticlesInterface {
    return { name: 'Flow > TS 😶', content: 'Croute' };
  }
}
