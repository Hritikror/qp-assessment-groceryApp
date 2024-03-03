import { ParseIntPipe, UsePipes, ValidationPipe  } from '@nestjs/common';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    imagePath: string;

    @IsString()
    decription: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    price: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    quantityAvailable: number;

  }