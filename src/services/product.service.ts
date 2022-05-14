import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../models/users.model";

@Injectable()
export class ProductService {

    constructor(@InjectModel(User.name) private productModel: Model<UserDocument>) {}
    
    async create(product: User): Promise<User> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async readAll(): Promise<User[]> {
        return await this.productModel.find().exec();
    }

    async readById(id): Promise<User> {
        return await this.productModel.findById(id).exec();
    }

    async update(id, User: User): Promise<User> {
        return await this.productModel.findByIdAndUpdate(id, User, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.productModel.findByIdAndRemove(id);
    }
}