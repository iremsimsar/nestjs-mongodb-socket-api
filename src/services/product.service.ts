import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat, CatDocument } from "../schemas/users.schema";

@Injectable()
export class ProductService {

    constructor(@InjectModel(Cat.name) private productModel: Model<CatDocument>) {}
    
    async create(product: Cat): Promise<Cat> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async readAll(): Promise<Cat[]> {
        return await this.productModel.find().exec();
    }

    async readById(id): Promise<Cat> {
        return await this.productModel.findById(id).exec();
    }

    async update(id, Cat: Cat): Promise<Cat> {
        return await this.productModel.findByIdAndUpdate(id, Cat, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.productModel.findByIdAndRemove(id);
    }
}