import { ICommand } from '@nestjs/cqrs';

export class IDAddedToCatalogCommand implements ICommand {
  constructor(public readonly entityName: string, public readonly id: string) {}
}
