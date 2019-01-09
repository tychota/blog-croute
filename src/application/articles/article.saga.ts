import { Injectable } from '@nestjs/common';
import { EventObservable, ICommand, AggregateRoot } from '@nestjs/cqrs';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleCreated } from './events/article-created.event';
import { EventEntity } from 'src/infrastructure/events/events.entity';

import { getRepository } from 'typeorm';
import { IDAddedToCatalogCommand } from './commands/implementations/id-added-to-catalog';

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
    // tslint:disable-next-line:semicolon
  };

  entityCreated = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$.ofType(ArticleCreated).pipe(
      map(event => {
        return new IDAddedToCatalogCommand('article', event.aggregateId);
      }),
    );
    // tslint:disable-next-line:semicolon
  };
}
