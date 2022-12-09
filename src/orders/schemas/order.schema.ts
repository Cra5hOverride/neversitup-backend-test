import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & mongoose.Document;
@Schema({
  timestamps: true,
})
export class Order {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  product: Product;

  @Prop()
  quantity: number;

  @Prop()
  status: string

  @Prop()
  total_price: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
