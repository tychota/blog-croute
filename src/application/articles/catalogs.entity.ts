import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class CatalogsEntity {
  @PrimaryColumn()
  entityName: string;

  @Column('json')
  idList: string[];
}
