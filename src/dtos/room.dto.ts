import { ApiProperty } from '@nestjs/swagger';

export class createRoomDto {
    @ApiProperty()
    name: string;
}

export class getRoomDto {
    @ApiProperty()
    page: number;
    @ApiProperty()
    page_size: number;
}

export const responseRoomSchema = {
    schema: {
        type: 'object',
        properties: {
            total: {
                type: 'number'
            },
            page: {
                type: 'number'
            },
            page_size: {
                type: 'number'
            },
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        owner: {
                            type: 'string'
                        },
                        connected_users: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    }
}