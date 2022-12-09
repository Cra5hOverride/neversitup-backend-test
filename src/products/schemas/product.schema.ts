import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document;
@Schema({
  timestamps: true,
})
export class Product {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({default: 0})
  price: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
