import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from "src/common/constants/enums/Status";
import { IKYC } from "../interfaces/kyc.interface";
import { User } from "./user-entity";
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type KycDocument = HydratedDocument<Kyc>;

@Schema()
export class Kyc implements IKYC {

    @Prop({required: true})
    _id: string;

    @Prop({required: true})
    firstName: string; 

    @Prop({required: true})
    lastName: string;

    @Prop({required: true, default: new Date().toISOString()})
    createdDate: string;

    @Prop({required: true})
    dateOfBirth: string;

    @Prop({required: true, unique: true, sparse: true})
    NICNumber: string;

    @Prop({required: true, unique: true, sparse: true})
    passportNumber: string;

    @Prop({required: true})
    documentExpiryDate: string;

    @Prop({required: true})
    status: Status;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'User'})
    user: User;
}
 export const KycSchema = SchemaFactory.createForClass(Kyc);