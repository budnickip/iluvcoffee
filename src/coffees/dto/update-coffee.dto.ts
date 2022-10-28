import { PartialType } from "@nestjs/mapped-types"
import { CreateCoffeeDto } from "./create-coffee.dto"

// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }
// zamiast tego u góry, wykorzystajmy PartialType(tak jest bardziej po Bozemu)
// PartialType zwraca typ klasy której przekazujemy, ze wszystkimi wartościami ustawionymi jako opcjonalne. równiez dziedziczy wszystkie reguły walidacji, które zostały
// ustawione przez dekoratory w klasie po której dziedziczy, z tym ze dodaje do kazdego pola regułe @IsOptional()
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}