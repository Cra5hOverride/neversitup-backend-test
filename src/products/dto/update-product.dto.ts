import { ApiProperty} from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;
}
