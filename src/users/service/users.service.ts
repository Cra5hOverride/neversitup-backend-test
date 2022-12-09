import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Model } from 'mongoose-delete';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

  ) {}

  async create(createUserDto: CreateUserDto) {

    const duplicateEmail = await this.checkDuplicateEmail(createUserDto.email);
    const duplicateUsername = await this.checkDuplicateUsername(createUserDto.username);

    if (duplicateEmail) {
      throw new HttpException(
        { status: false, message: 'Duplicate email' },
        HttpStatus.CONFLICT,
      );
    }

    if (duplicateUsername) {
      throw new HttpException(
        { status: false, message: 'Duplicate username' },
        HttpStatus.CONFLICT,
      );
    }
    createUserDto.username = createUserDto.username.toLowerCase();
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userModel.create(createUserDto);;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id, { password: 0 });
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({username: username});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    return  user.delete();
  }

  async checkDuplicateEmail(email: string) {
    const user = await this.userModel.findOneWithDeleted({
      email: email,
    });

    if (user) {
      return true;
    }
    return false;
  }

  async checkDuplicateUsername(username: string) {
    const user = await this.userModel.findOneWithDeleted({
      username: username,
    });

    if (user) {
      return true;
    }
    return false;
  }

}
