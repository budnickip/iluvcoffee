import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  // bez tego utworzy mi obiekt, nawet jak nie podam pól które są wymagane, lub jesli jako name dam number
  // a dzięki temu zwróci nam błędy, które pola zostały źle podane.

  // dzieki apiproperty mozemy sami opisywać w swaggerze pola, ustawiać defaultowe wartości i duzo wiecej
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['carmel'] })
  @IsString({ each: true })
  readonly flavors: string[];
}
