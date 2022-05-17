import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty()
    text: string;
}

export const responseMessageSchema = {
    schema: {
        type: 'object',
        properties: {
            page: {
                type: 'number'
            },
            page_size: {
                type: 'number'
            },
            total: {
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
                        text: {
                            type: 'string'
                        },
                        owner: {
                            type: 'string'
                        },
                        room: {
                            type: 'string'
                        },
                        created: {
                            type: 'string'
                        },
                        __v: {
                            type: 'number'
                        }
                    }

                }
            }
        }
    }
}