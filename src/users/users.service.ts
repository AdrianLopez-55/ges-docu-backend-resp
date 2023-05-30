import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}
	
	async create(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create(createUserDto);
	}

	async findAll(request: Request): Promise<User[]> {
		return this.userModel.find(request.query).setOptions({sanitizeFilter: true}).exec();
	}

	async findOne(id: string): Promise<User>{
		return this.userModel.findOne({_id: id}).exec();
	}

	async getUser(query: object): Promise<User>{
		return this.userModel.findOne(query);
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
			new: true,
		});
	}

	async remove(id: string) {
		return this.userModel.findByIdAndRemove({ _id: id}).exec();
	}


}
