import { ICommand } from '@nestjs/cqrs';

import { ArticlesInterface } from 'src/articles/interfaces/articles.interface';

class CreateArticleCommand implements ICommand {
  constructor(public readonly articleDto: ArticlesInterface) {}
}
