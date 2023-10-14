import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOTP } from "../interfaces/otp.interface";
import { randomUUID } from "crypto";
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema()
export class Otp implements IOTP {

    @Prop({default: randomUUID()})
    _id: string = randomUUID();
    
    @Prop({required: true})
    userId: string;
    
    @Prop({required: true})
    otp: string;

    @Prop({default: new Date().toISOString()})
    createdDate: string = new Date().toISOString();
}

export const OtpSchema = SchemaFactory.createForClass(Otp);