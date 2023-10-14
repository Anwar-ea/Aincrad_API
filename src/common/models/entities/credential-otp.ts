import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICredentialOtp } from "../interfaces/credential-otp.interface";
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type CredentialOtpDocument = HydratedDocument<CredentialOtp>;

@Schema()
export class CredentialOtp implements ICredentialOtp{
    
    @Prop({required: true, default: randomUUID()})
    _id: string = randomUUID();

    @Prop({required: true, default: new Date().toISOString()})
    dateCreated: string = new Date().toISOString();

    @Prop()
    email?: string;

    @Prop()
    phoneNumber?: string;

    @Prop({required: true})
    otp: string;
}

export const CredentialOtpSchema = SchemaFactory.createForClass(CredentialOtp);
