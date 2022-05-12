import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { Cat, CatSchema } from '../schemas/users.schema';
import { ProductService } from '../services/product.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])
    ],
      controllers: [AppController],
      providers: [AppService, ProductService]
})
export class AppModule { }