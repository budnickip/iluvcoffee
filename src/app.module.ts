import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // forRoot tylko raz, forFeatures za kazdym razem jak importujemy entity do modułu
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
    host: 'localhost', // database host
    port: 5433, // database host
    username: 'postgres', // username
    password: 'pass123', // user password
    database: 'postgres', // name of our database,
    autoLoadEntities: true, // models will be loaded automatically 
    // let's typeorm automatically generate a SQL table from all classes with the @Entity() decorator, and the metadata they contain
    // this automatic synchronization saves us a lot of manual coding that we'd have to do otherwise while actively developing our applications
    synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
