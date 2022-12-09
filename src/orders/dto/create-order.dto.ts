import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateOrderDto {
    
    @ApiProperty()
    @IsNotEmpty()
    product: string;
  
    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    user: any
}
