import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Req, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { OrdersService } from '../service/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  create(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
    const { user } = req;
    createOrderDto.user = user.userid;
    return this.ordersService.create(createOrderDto);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const { user } = req;
    const userid = user.userid;
    const { page, limit} = paginationDto;
    return this.ordersService.findAll(userid ,+page, +limit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.OK)
  findOne(@Req() req: any, @Param('id') id: string) {
    const { user } = req;
    const userid = user.userid;
    return this.ordersService.findOne(userid ,id);
  }

  @Get('cancel/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.OK)
  cancel(@Req() req: any, @Param('id') id: string) {
    const { user } = req;
    const userid = user.userid;
    return this.ordersService.cancel(userid ,id);
  }

}
