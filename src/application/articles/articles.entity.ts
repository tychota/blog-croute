import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleCreated } from './events/article-created.event';

import * as uuidv4 from 'uuid/v4';

export const createArticle = ({
  name,
  content,
}: {
  name: string;
  content: string;
}) => {
  const newArticle = new ArticlesEntity();
  const articleCreatedEvent = new ArticleCreated({
    aggregateId: uuidv4(),
    name,
    content,
  });
  newArticle.apply(articleCreatedEvent);
  return newArticle;
};

@Entity()
export class ArticlesEntity extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  content: string;

  onArticleCreated(event: ArticleCreated) {
    this.id = event.aggregateId;
    this.name = event.name;
    this.content = event.content;
  }
}
