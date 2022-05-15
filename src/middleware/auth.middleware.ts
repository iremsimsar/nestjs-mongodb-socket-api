import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/users.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers["authorization"].split(" ")[1];

            const decoded_token: any = jwt.verify(token, process.env.JWT_SECRET_PASSWORD!)
            
            if (!decoded_token._id)
                throw new UnauthorizedException('Invalid token')

            req['user_id'] = decoded_token._id;

            next();
            
        } catch (error) {
            console.log("hiii", error);
            next(error);
        }

    }
} 