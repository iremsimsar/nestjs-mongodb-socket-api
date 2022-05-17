import { Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { getRoomDto , createRoomDto} from '../dtos/room.dto';

@Controller('/api/rooms')
export class AppController {
 

    @Get()
    async getHello(@Query() query:getRoomDto , @Res() res: Response) {
        return 'hello world '
    }



}