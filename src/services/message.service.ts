import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "../models/messages.models";

@Injectable()
export class ProductService {

    constructor(@InjectModel(Message.name) private productModel: Model<MessageDocument>) {}
    
    async create(message: Message): Promise<Message> {
        console.log(message);
        return await new this.productModel(message).save()
    }

    async readAll(): Promise<Message[]> {
        return await this.productModel.find().exec();
    }

    async readById(id): Promise<Message> {
        return await this.productModel.findById(id).exec();
    }

    async update(id, Message: Message): Promise<Message> {
        return await this.productModel.findByIdAndUpdate(id, Message, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.productModel.findByIdAndRemove(id);
    }
}