import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // we don't need type because of transformOptions: {
  //     enableImplicitConversion: true,
  // }, in main.ts
  // @Type(() => Number)
  @IsOptional()
  // greater than 0
  @IsPositive()
  limit: number;

  // @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
