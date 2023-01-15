// It's example file with a lot of comments about different approaches
import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

// Our mock implementation
// if we want to use mock service, then we need to pass it in useValue property
// export class MockCoffeesService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Event, Flavor])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useValue: new MockCoffeesService(), // <-- mock implementation
  //   }
  // ],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // "useClass" syntax example
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    // String-valued token // ask someone from project, when we can use it
    // {
    //   provide: COFFEE_BRANDS, // 👈
    //   useValue: ['buddy brew', 'nescafe'], // array of coffee brands,
    // },
    // "useFactory" syntax example
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        // we can avoid in this way race conditions
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [Connection],
      // useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
      // inject: [CoffeeBrandsFactory]
    },
  ],
  exports: [CoffeesService], // bez tego nie mógłbym zaimportować tego serwisu w innym module
})
export class CoffeesModule {}
