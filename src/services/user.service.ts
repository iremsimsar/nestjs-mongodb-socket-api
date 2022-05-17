import { Injectable,  UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User, UserDocument } from '../models/users.model';
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface UserType {
    nickname: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(nickname: string) {
        const user = await this.userModel.findOne({ nickname: nickname }).exec()
        if (!user) throw new NotFoundError('User not found')
        return user
    }

    async findById(id: string) {
        return await this.userModel.findById(id).exec()
    }

    async verify (token) {
        const decoded_token: any = jwt.verify(token, process.env.JWT_SECRET_PASSWORD!)
        if (!decoded_token._id)
            throw new UnauthorizedException('Invalid token')
        return decoded_token._id
    }

}
