import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomBytes, randomUUID } from "crypto";
import { Account } from './account';
import mongoose from 'mongoose';
import { User } from './user-entity';
import { Currency } from 'src/common/constants/enums/Currencies';
import { Transactions } from '../../constants/enums/Transactions';
import { Beneficiary } from './beneficiary';
import { TransactionStatus } from 'src/common/constants/enums/TransactionStatus';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {

    @Prop({default: randomUUID()})
    _id: string;

    @Prop({required: true, default: randomBytes(4).toString('hex'), unique: true})
    transactionId: string;

    @Prop({required: true, default: new Date().toISOString()})
    dateCreated: string;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'Account'})
    account: Account;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'User'})
    user: User;

    @Prop({required: true})
    currency: Currency;

    @Prop({required: true})
    amount: number;

    @Prop({required: true})
    fee: number;

    @Prop({required: true})
    remainingBalance: number;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'Beneficiary'})
    beneficiary: Beneficiary;

    @Prop({required: true})
    type: Transactions;

    @Prop({required: true})
    status: TransactionStatus;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);