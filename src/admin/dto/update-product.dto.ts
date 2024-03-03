import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateProductDto {

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    id: number;

    title: string;

    imagePath: string;

    decription: string;

    @Transform(({ value }) => parseInt(value))
    price: number;

    @Transform(({ value }) => parseInt(value))
    quantityAvailable: number;

  }