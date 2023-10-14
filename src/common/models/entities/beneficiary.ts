import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import { Account } from './account';
import mongoose from 'mongoose';

export type BeneficiaryDocument = HydratedDocument<Beneficiary>;

@Schema()
export class Beneficiary {

    @Prop({default: randomUUID()})
    _id: string;

    @Prop({required: true, default: new Date().toISOString()})
    dateCreated: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    accountNumber: string;

    @Prop({required: true})
    bankName: string;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'Account'})
    account: Account;

}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);
