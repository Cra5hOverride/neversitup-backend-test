import { ApiPropertyOptional} from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiPropertyOptional()
    name: string;
  
    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    price: number;

    @ApiPropertyOptional()
    stock: number;
}
