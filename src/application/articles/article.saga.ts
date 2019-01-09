import { Injectable } from '@nestjs/common';
import { EventObservable, ICommand, AggregateRoot } from '@nestjs/cqrs';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleCreated } from './events/article-created.events';
import { EventEntity } from 'src/infrastructure/events/events.entity';

import { getRepository } from 'typeorm';

@Injectable()
export class EventSaga {
  eventPublished = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$.ofType(ArticleCreated).pipe(
      map((event: ArticleCreated) => {
        const storedEvent = new EventEntity();
        storedEvent.payload = event;
        storedEvent.aggregateId = event.aggregateId;
        const { constructor } = Object.getPrototypeOf(event);
        storedEvent.className = constructor.name;
        getRepository(EventEntity).save(storedEvent);
        return null;
      }),
    );
  };
}
