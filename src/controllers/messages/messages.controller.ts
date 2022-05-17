import { Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { Message } from '../../models/messages.models';
import { Response, Request } from 'express';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { MessageService } from '../../services/message.service';
import { MessageGateway } from '../../gateways/event.gateway';
import { MessageDto } from '../../dtos/message.dto';
import { ApiHeader } from '@nestjs/swagger';
import { ApiResponse, ApiOkResponse ,ApiTags} from '@nestjs/swagger';
import { responseMessageSchema } from '../../dtos/message.dto';
@ApiTags('Messages')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
})
@Controller('/api/messages')
export class MessageController {
    constructor(private userService: UserService, private roomService: RoomService, private messageService: MessageService, private readonly messageGateway: MessageGateway) { }

    @ApiOkResponse(responseMessageSchema)
    @Get(':roomId')
    async get(@Query() query: any, @Res() res: Response) {

        let page = Number(query.page || 1)
        let page_size = Number(query.page_size > 50 ? 50 : query.page_size || 10)

        const messages: {
            total: number,
            items: Message[],
        } = await this.messageService.findAll(page, page_size)

        return res.status(HttpStatus.OK).json({
            items: messages.items,
            total: messages.total,
            page: page,
            page_size: page_size
        })

    }

    @Post(':roomId/send')
    @ApiResponse({ status: 200, description: 'Message created successfully' })
    async sendMessage(@Req() req: Request, @Body() messageCredatials: MessageDto, @Res() res: Response) {
        const room_id = req.params.roomId
        if (!messageCredatials.text)
            throw new BadRequestException('Message is required');

        const user = await this.userService.findById(req['user_id'])

        if (!user) throw new BadRequestException('User not found')

        const room = await this.roomService.findById(room_id)

        if (!room) throw new BadRequestException('Room not found')

        await this.messageService.create({
            text: messageCredatials.text,
            owner: user._id,
            room: room._id
        })

        this.messageGateway.server.emit('messages', {
            room_id: room_id,
            message: messageCredatials.text,
            owner: user.id
        });

        return res.status(HttpStatus.OK).json({
            message: 'Message created successfully'
        })
    }
}