import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleCreated } from './events/article-created.events';

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
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;
}
