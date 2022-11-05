import { Coffee } from "./src/coffees/entities/coffee.entity";
import { Flavor } from "./src/coffees/entities/flavor-entity";
import { CoffeeRefactor1667687109352 } from "./src/migrations/1667687109352-CoffeeRefactor";
import { DataSource } from "typeorm";
import { SchemaSync1667688202242 } from "src/migrations/1667688202242-SchemaSync";

// config for migrations
export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    // teraz dla tych encji będzie generował automatycznie migracje, nie trzeba bedzie ich recznie uzupelniac
    entities: [Coffee, Flavor],
    migrations: [CoffeeRefactor1667687109352, SchemaSync1667688202242],
  });
  