import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { UnauthorizedException, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto, responseLoginSchema } from '../../dtos/auth.dto';
import { UserService } from '../../services/user.service';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private userService: UserService,) { }

  @ApiOkResponse(responseLoginSchema)
  @Post('login',)
  async login(@Body() signinCredentials: AuthDto, @Res() res: Response) {
    //Todo userservice
    const user = await this.userService.findOne(signinCredentials.nickname)

    if (!user) throw new UnauthorizedException('The nickname/password combination is invalid');

    const isMatch = await compare(signinCredentials.password, user.password)

    if (!isMatch) throw new UnauthorizedException('The nickname/password combination is invalid');

    await this.userService.update(user._id, { loggedIn: true })

    user.loggedIn = true;

    await user.save();

    return res.status(HttpStatus.OK).json(
      {
        message: 'Login Successfully',
        token: sign({ _id: user._id },
          process.env.JWT_SECRET_PASSWORD,
          { expiresIn: '12h', algorithm: 'HS256' })
      }
    )
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {

    const user = await this.userService.findById(req['user_id'])

    await this.userService.update(user._id, { loggedIn: false })
    
    return res.status(HttpStatus.OK).json({
      message: 'Logout Successfully',
    })

  }

  @Post('sign-up')
  @ApiResponse({ status: 200, description: 'Sign up Successfully' })
  async signUp(@Body() signUpCredentials: AuthDto, @Res() res: Response) {

    signUpCredentials.password = await hash(signUpCredentials.password, 10)

    if (!signUpCredentials.nickname)
      throw new BadRequestException('Nickname is required');

    if (signUpCredentials.nickname.length < 5 || signUpCredentials.nickname.length > 20)
      throw new BadRequestException('The nickname must be between 5 and 20 characters')

    const user = await this.userService.findOne(signUpCredentials.nickname)

    if (user) throw new BadRequestException('The nickname is already taken');

    await this.userService.create({
      nickname: signUpCredentials.nickname,
      password: signUpCredentials.password,
      loggedIn: false
    })

    return res.status(HttpStatus.OK).json({
      message: 'Sign up Successfully',
    })

  }

}