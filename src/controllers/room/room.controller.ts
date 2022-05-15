import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { Injectable, NestMiddleware, UnauthorizedException, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../../models/rooms.models';
import { Response, Request } from 'express';
import { User, UserDocument } from '../../models/users.model';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';

@Controller('/api/rooms')
export class RoomController {
    constructor(private userService: UserService, private roomService: RoomService) { }

    @Get()
    async get(@Query() query: any, @Res() res: Response) {

        let page = Number(query.page || 1)
        let page_size = Number(query.page_size > 50 ? 50 : query.page_size || 10)

        const rooms: {
            items: RoomDocument[],
            total: number
        } = await this.roomService.findAll(page, page_size)

        return res.status(HttpStatus.OK).json({
            items: rooms.items,
            total: rooms.total,
            page: page,
            page_size: page_size
        })

    }

    @Post()
    async signUp(@Req() req: Request, @Body() roomCredantials, @Res() res: Response) {

        if (!roomCredantials.name)
            throw new BadRequestException('Rooom name is required');

        const user = await this.userService.findById(req['user_id'])

        if (!user) throw new BadRequestException('User not found')

        roomCredantials.owner = user._id

        let room = await this.roomService.findOne(roomCredantials)

        if (room) throw new BadRequestException('Room name is already taken')

        room = await this.roomService.create(roomCredantials)

        await this.roomService.addUser(room.id, user.id)

        return res.status(HttpStatus.OK).json({
            message: 'Room created successfully'
        })

    }

}