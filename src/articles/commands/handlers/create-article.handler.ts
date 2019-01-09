import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/article-created.command';
import { ArticlesEntity } from 'src/articles/articles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articleRepository: Repository<ArticlesEntity>,
  ) {}

  execute(command: CreateArticleCommand, resolve: (value?: any) => void) {
    const article = this.articleRepository.create(command.articleDto);
    resolve(this.articleRepository.save(article));
  }
}
