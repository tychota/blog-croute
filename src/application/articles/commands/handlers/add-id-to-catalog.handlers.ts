import { IDAddedToCatalogCommand } from '../implementations/id-added-to-catalog';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogsEntity } from '../../catalogs.entity';
import { Repository } from 'typeorm';

@CommandHandler(IDAddedToCatalogCommand)
export class AddIdToCatalogHandler
  implements ICommandHandler<IDAddedToCatalogCommand> {
  constructor(
    @InjectRepository(CatalogsEntity)
    private readonly catalogRepository: Repository<CatalogsEntity>,
  ) {}
  async execute(command: IDAddedToCatalogCommand) {
    const catalog: CatalogsEntity = (await this.catalogRepository.findOne(
      command.entityName,
    )) || {
      entityName: command.entityName,
      idList: [],
    };
    catalog.idList.push(command.id);
    this.catalogRepository.save(catalog);
  }
}
