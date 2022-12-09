import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose-delete';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);;
  }

  async findAll(page: number, limit: number, query: string) {
    const total = await this.productModel
      .count({
         name: new RegExp(query, 'i'),
      })
      .exec();
    const items = await this.productModel
      .find({
        name: new RegExp(query, 'i'),
      })
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      items,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    Object.assign(product, updateProductDto);
    await product.save();
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id);
    return  product.delete();
  }
}
