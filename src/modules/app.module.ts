import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { Product, ProductSchema } from '../schemas/user.schema';
import { ProductService } from '../services/product.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ],
      controllers: [AppController],
      providers: [AppService, ProductService]
})
export class AppModule { }