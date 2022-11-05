import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor-entity';

// @Entity('coffees') sql table === 'coffees'
@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    // dzięki temu jak będziemy dodawać kawe ze smakiem który nie istnieje w tabeli, to zostanie on dodany do tabeli smaków
    cascade: true, // or optionally just insert or update ['insert']
  })
  flavors: Flavor[];
}
