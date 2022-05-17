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

    async find(skip: number, limit:number, filter: object): Promise<{total: number, items: Message[]}> {
        const messages = await this.messageModel.find(filter).skip(skip).limit(limit).exec();
        const total = await this.messageModel.countDocuments(filter).exec();
        return {
            total: total,
            items: messages
        }
    }

    async readById(id: string): Promise<Message> {
        return await this.messageModel.findById(id).exec();
    }

    async update(id: string, Message: Message): Promise<Message> {
        return await this.messageModel.findByIdAndUpdate(id, Message, {new: true})
    }

    async delete(id: string): Promise<any> {
        return await this.messageModel.findByIdAndRemove(id);
    }
}