import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Room, RoomDocument } from '../models/rooms.models';

interface RoomType {
    name: string;
}

@Injectable()
export class RoomService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async create(createRoom: RoomType) {
        return await this.roomModel.create(createRoom)
    }

    async findAll(page: number, page_size: number) {

        const rooms = await this.roomModel.find({})
            .skip((page - 1) * page_size)
            .limit(page_size).exec();
 
        const total = await this.roomModel.countDocuments().exec();

        return {
            total: total,
            items: rooms
        }
    }

    async findOne(filter: object) {
        const room = await this.roomModel.findOne(filter).exec()
        return room
    }

    async addUser(room_id: string, user_id: string) {
        await this.roomModel.updateOne(
            { _id: room_id },
            { $addToSet: { connected_users: user_id } }
          )
    }

    findById(id: string) {
        return this.roomModel.findById(id).exec()
    }

    update(id: number, updateProductDto: Room) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
