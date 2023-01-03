import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

//UsePipes() - w tym miejscu wywołany, będzie dla całego modułu
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  //UsePipes() - w tym miejscu wywołany, będzie dla danej metody/routy
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  // @Body(ValidationPipe) - w miejscu body jakbyśmy tak dali, to wtedy pipe jest tylko dla danego parametru
  // taki scope jest dostępny tylko dla pipeów
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
