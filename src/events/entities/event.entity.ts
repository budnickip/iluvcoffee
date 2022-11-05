import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// Composite index that contains Multiple columns
@Index(['name', 'type']) // <--
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
