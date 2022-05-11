import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type Document = Product & Document;

@Schema()
export class Product {

    @Prop()
    name: string;

    @Prop()
    manufacturer: string;

    @Prop()
    manufactureYear: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);