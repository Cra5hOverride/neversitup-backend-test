import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Model } from 'mongoose-delete';
import { UsersService } from 'src/users/service/users.service';
import { ProductsService } from 'src/products/service/products.service';
import { OrderStatus } from '../enum/order.enum';


@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,

  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const product = await this.productService.findOne(createOrderDto.product);

    if(product.stock < createOrderDto.quantity){
      throw new HttpException(
        { status: false, message: 'Not enough product' },
        HttpStatus.CONFLICT,
      );
    }
    
    let order = new Order();
    Object.assign(order, createOrderDto);
    order.product = product;
    order.status = OrderStatus.Waiting;
    order.total_price = (product.price * order.quantity);

    product.stock -= order.quantity;
    product.save();

    return await this.orderModel.create(order);
  }

  async findAll(userid: any, page: number, limit: number) {
    const total = await this.orderModel
      .count({
        user: userid
      })
      .exec();
    const items = await this.orderModel
      .find({
        user: userid
      })
      .populate({
        path: 'product',
        options: { withDeleted: true },
        select: 'name price'
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

  async findOne(userid: any, id: string) {
    return await this.orderModel.findOne({
      _id: id,
      user: userid
    })
    .populate({
      path: 'product',
      options: { withDeleted: true },
    })
    .exec();
  }

  async cancel(userid: any, id: string) {
    const order = await this.orderModel.findOne({
      _id: id,
      user: userid
    })
    order.status = OrderStatus.Cancel;
    return await order.save();
  }
}
