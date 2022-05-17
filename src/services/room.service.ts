import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Room, RoomDocument } from '../models/rooms.models';

interface RoomType {
    name: string;
    owner: ObjectId
}

@Injectable()
export class RoomService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async create(createRoom: RoomType) {
        return await this.roomModel.create(createRoom)
    }

    async findAll(skip: number, limit: number) {

        const rooms = await this.roomModel.find({})
            .skip(skip)
            .limit(limit).exec();

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

    async findById(id: string) {
        return await this.roomModel.findById(id).exec()
    }
}
