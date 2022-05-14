import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/users.model';
import jwt = require('jsonwebtoken');

@Controller('api/auth')
export class AuthController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  @Post('login')
  async login(@Body() credentials) {
    const user = await this.userModel.findOne({nickname: credentials.nickname}).exec();
    if (!user) throw new UnauthorizedException('The nickname/password combination is invalid');

    const isMatch = await compare(credentials.password, user.password);
    if (!isMatch) throw new UnauthorizedException('The nickname/password combination is invalid');

    user.loggedIn = true;

    await user.save();

    return {token: sign({_id: user._id, nickname: user.nickname},
        process.env.JWT_SECRET_PASSWORD,
        {expiresIn: '1h', algorithm: 'HS256'})};
  }

  @Get('logout')
  async logout(user) { 
    await this.userModel.findByIdAndUpdate(user._id, {loggedIn: false});
    return {message: 'Logout Successfully'};
  }

  @Post('sign-up')
  async signUp(@Body() signUpCredentials) { // <4>
    signUpCredentials.password = await hash(signUpCredentials.password, 10);
    await this.userModel.create(signUpCredentials);
    return {message: 'User Created Successfully'};
  }
}