import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  // dzięk temu będę mógł uzywac coffeesService w coffee-rating.service
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
