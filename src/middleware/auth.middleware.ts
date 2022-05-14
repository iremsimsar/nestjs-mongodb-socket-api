import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/users.model';
import jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    use(req, res, next) {
        const decodedKey: any = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_PASSWORD);
        if (!decodedKey) {
            throw new UnauthorizedException();
        }
        if (!decodedKey._id) {
            throw new UnauthorizedException();
        }
        this.userModel.findById(decodedKey._id).then(user => {
            if (!user) {
                throw new UnauthorizedException();
            }
            req.user = user;
            next();
        });
    }
}