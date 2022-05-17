import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string;
}


export const responseLoginSchema = {
    schema: {
        type: 'object',
        properties: {
            message: {
                type: 'string'
                },
            token: {
                type: 'string'
            }
        }
    }
}