import { IEvent } from '@nestjs/cqrs';

export class ArticleCreated implements IEvent {
  aggregateId: string;
  name: string;
  content: string;

  constructor(payload: { aggregateId: string; name: string; content: string }) {
    this.aggregateId = payload.aggregateId;
    this.name = payload.name;
    this.content = payload.content;
  }
}
