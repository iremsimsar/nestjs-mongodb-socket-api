import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../models/users.model';
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface UserType {
    nickname: string;
    password: string;
    loggedIn?: boolean;
}

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(nickname: string) {
        return await this.userModel.findOne({ nickname: nickname }).exec()
    }

    async findById(id: string) {
        return await this.userModel.findById(id).exec()
    }

    async verify(token) {
        const decoded_token: any = jwt.verify(token, process.env.JWT_SECRET_PASSWORD!)
        if (!decoded_token._id)
            throw new UnauthorizedException('Invalid token')
        return decoded_token._id
    }

    async update(id: string, data: Partial<UserType>) {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec()
    }

    async create(user: UserType) {
        return await new this.userModel(user).save()
    }

}
