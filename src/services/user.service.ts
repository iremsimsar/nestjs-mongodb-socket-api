import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User, UserDocument } from '../models/users.model';

interface UserType {
    nickname: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    create(createUser: UserType) {
        return 'This action adds a new product';
    }

    findAll() {
        return `This action returns all products`;
    }

    async findOne(nickname: string) {
        const user = await this.userModel.findOne({ nickname: nickname }).exec()
        if (!user) throw new NotFoundError('User not found')
        return user
    }

    findById(id: string) {
        return  this.userModel.findById(id).exec()
    }

    update(id: number, updateProductDto: User) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
