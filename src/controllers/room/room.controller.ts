import { Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { RoomDocument } from '../../models/rooms.models';
import { Response, Request } from 'express';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { getRoomDto, createRoomDto , responseRoomSchema} from '../../dtos/room.dto';
import { ApiHeader, ApiResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token'
})
@Controller('/api/rooms')
export class RoomController {
    constructor(private userService: UserService, private roomService: RoomService) { }
    @Get()
    @ApiOkResponse(responseRoomSchema)
    async get(@Query() query: getRoomDto, @Res() res: Response) {

        let page = Number(query.page || 1)
        let page_size = Number(query.page_size > 50 ? 50 : query.page_size || 10)

        const rooms: {
            items: RoomDocument[],
            total: number
        } = await this.roomService.findAll((page - 1) * page_size, page_size)

        return res.status(HttpStatus.OK).json({
            items: rooms.items,
            total: rooms.total,
            page: page,
            page_size: page_size
        })

    }

    @Post()
    @ApiResponse({ status: 200, description: 'Room created successfully' })
    async createRoom(@Req() req: Request, @Body() roomCredantials: createRoomDto, @Res() res: Response) {


        if (!roomCredantials.name)
            throw new BadRequestException('Rooom name is required');

        const user = await this.userService.findById(req['user_id'])

        if (!user) throw new BadRequestException('User not found')

        let room = await this.roomService.findOne(roomCredantials)

        if (room) throw new BadRequestException('Room name is already taken')

        room = await this.roomService.create({
            name: roomCredantials.name,
            owner: user._id
        })

        await this.roomService.addUser(room.id, user.id)

        return res.status(HttpStatus.OK).json({
            message: 'Room created successfully'
        })

    }

}