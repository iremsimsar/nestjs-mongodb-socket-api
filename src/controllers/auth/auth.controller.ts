import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { Injectable, NestMiddleware, UnauthorizedException, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/users.model';
import { UserService } from '../../services/user.service';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  @Post('/login',)
  async login(@Body() signinCredentials, @Res() res: Response) {

    const user = await this.userModel.findOne({ nickname: signinCredentials.nickname }).exec()

    if (!user) throw new UnauthorizedException('The nickname/password combination is invalid');

    const isMatch = await compare(signinCredentials.password, user.password)

    if (!isMatch) throw new UnauthorizedException('The nickname/password combination is invalid');

    user.loggedIn = true;

    await user.save();

    return res.status(HttpStatus.OK).json(
      {
        message: 'Login Successfully',
        token: sign({ _id: user._id},
          process.env.JWT_SECRET_PASSWORD,
          { expiresIn: '12h', algorithm: 'HS256' })
      }
    )
  }

  @Get('logout')
  async logout(user) {
    await this.userModel.findByIdAndUpdate(user._id, { loggedIn: false });
    return { message: 'Logout Successfully' };
  }
  
  @Post('sign-up')

  async signUp(@Body() signUpCredentials, @Res() res: Response) {

    signUpCredentials.password = await hash(signUpCredentials.password, 10)

    if (!signUpCredentials.nickname)
      throw new BadRequestException('Nickname is required');

    if (signUpCredentials.nickname.length < 5 || signUpCredentials.nickname.length > 20)
       throw new BadRequestException('The nickname must be between 5 and 20 characters')

    const user = await this.userModel.findOne({ nickname: signUpCredentials.nickname }).exec()

    if (user) throw new BadRequestException('The nickname is already taken');

    await this.userModel.create(signUpCredentials)

    return res.status(HttpStatus.OK).json({
      message: 'Sign up Successfully',
    })

  }

  }