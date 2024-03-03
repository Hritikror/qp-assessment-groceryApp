import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductQaunDto {

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    id: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    quantityAvailable: number;

  }