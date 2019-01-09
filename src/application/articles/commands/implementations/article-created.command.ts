import { ICommand } from '@nestjs/cqrs';

import { ArticlesInterface } from 'src/application/articles/interfaces/articles.interface';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly articleDto: ArticlesInterface) {}
}
