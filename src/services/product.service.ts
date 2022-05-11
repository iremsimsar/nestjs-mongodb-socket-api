import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "src/schemas/users.schema";

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
    
    async create(product: Product): Promise<Product> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async readAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async readById(id): Promise<Product> {
        return await this.productModel.findById(id).exec();
    }

    async update(id, Product: Product): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, Product, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.productModel.findByIdAndRemove(id);
    }
}