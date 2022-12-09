import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty, 
    Length,
  } from 'class-validator';
export class CreateProductDto {
    
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

}
