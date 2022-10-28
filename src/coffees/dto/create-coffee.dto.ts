import { IsString } from 'class-validator'

export class CreateCoffeeDto {
    // bez tego utworzy mi obiekt, nawet jak nie podam pól które są wymagane, lub jesli jako name dam number
    // a dzięki temu zwróci nam błędy, które pola zostały źle podane.
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString({each: true})
    readonly flavors: string[];
  }