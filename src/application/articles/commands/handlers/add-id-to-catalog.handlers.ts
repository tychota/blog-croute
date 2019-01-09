import { AddIdToCatalogCommand } from '../implementations/add-id-to-catalog.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogsEntity } from '../../catalogs.entity';
import { Repository } from 'typeorm';

@CommandHandler(AddIdToCatalogCommand)
export class AddIdToCatalogHandler
  implements ICommandHandler<AddIdToCatalogCommand> {
  constructor(
    @InjectRepository(CatalogsEntity)
    private readonly catalogRepository: Repository<CatalogsEntity>,
  ) {}
  async execute(command: AddIdToCatalogCommand) {
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
