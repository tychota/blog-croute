import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ArticlesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;
}
