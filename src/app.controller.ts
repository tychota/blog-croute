import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/articles')
  getArticle(): ArticleDto {
    return { name: 'Flow > TS 😶', content: 'Croute' };
  }
}
