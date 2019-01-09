import { Injectable } from '@nestjs/common';
import { ArticlesEntity } from './articles.entity';
import { ArticlesInterface } from './interfaces/articles.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/infrastructure/events/events.entity';
import { ArticleEvents } from './events/namespace';

const recreateEvent = (event: EventEntity) => {
  const payload = event.payload;
  try {
    const articleEvent = new (ArticleEvents as any)[event.className](payload);
    return articleEvent;
  } catch (error) {
    throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
  }
};

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
  ) {}

  async findById(aggregateId: string): Promise<ArticlesEntity> {
    const articleHistory: EventEntity[] = await this.EventRepository.find({
      where: { aggregateId },
    });
    const articleHistoryEvents = articleHistory.map(recreateEvent);

    const article = new ArticlesEntity();
    article.loadFromHistory(articleHistoryEvents);
    return article;
  }
}
