import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/article-created.command';
import { ArticlesEntity, createArticle } from '../../articles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  execute(command: CreateArticleCommand, resolve: (value?: any) => void) {
    const articleAggregate = createArticle(command.articleDto);
    const article: ArticlesEntity = this.publisher.mergeObjectContext(
      articleAggregate,
    );
    article.commit();
    resolve(article);
  }
}
