import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor-entity';

// Composite index that contains Multiple columns
// @Index(['name', 'type']) // <--
// @Entity('coffees') sql table === 'coffees'
@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Index() // jeśli bardzo częstym przypadkiem będzie wyszukiwanie kawy po name, to warto dodac index decorator - to przyspieszy wyszukiwanie po tej kolumnie
  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    // dzięki temu jak będziemy dodawać kawe ze smakiem który nie istnieje w tabeli, to zostanie on dodany do tabeli smaków
    cascade: true, // or optionally just insert or update ['insert']
  })
  flavors: Flavor[];
}
