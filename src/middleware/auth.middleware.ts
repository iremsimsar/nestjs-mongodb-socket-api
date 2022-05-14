import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/users.model';
import jwt = require('express-jwt');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    use(req, res, next) {
        jwt({
            secret: process.env.JWT_SECRET_PASSWORD,
            algorithms: ['HS256'],
            isRevoked: async (req1, payload, done) => {
                if (!payload._id) {
                    return done(new UnauthorizedException('Invalid Token'));
                }

                const user = await this.userModel.findById(payload._id);
                if (!user)
                    return done(new UnauthorizedException('The user not Found'))

                done(null, false);
            },
        }).unless({ path: ['/api/auth/login', '/api/auth/sign-up'] })(req, res, next);
    }
}