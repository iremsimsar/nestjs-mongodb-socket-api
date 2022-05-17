import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "../models/messages.models";

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}
    
    async create(message): Promise<Message> {
        return await new this.messageModel(message).save()
    }

    async findAll(skip: number, limit:number): Promise<{total: number, items: Message[]}> {
        const messages = await this.messageModel.find({}).skip(skip).limit(limit).exec();
        const total = await this.messageModel.countDocuments().exec();
        return {
            total: total,
            items: messages
        }
    }

    async readById(id): Promise<Message> {
        return await this.messageModel.findById(id).exec();
    }

    async update(id, Message: Message): Promise<Message> {
        return await this.messageModel.findByIdAndUpdate(id, Message, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.messageModel.findByIdAndRemove(id);
    }
}