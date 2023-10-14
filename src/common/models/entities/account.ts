import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { AccountTypes } from '../../constants/enums/AccountTypes';
import { AccountStatus } from '../../constants/enums/AccountStatus';
import mongoose, { HydratedDocument } from "mongoose";
import { Currency } from '../../constants/enums/Currencies';
import { User } from "./user-entity";
import { Transaction } from "./transaction";

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {

    @Prop({default: randomUUID()})
    _id: string;

    @Prop({required: true, default: new Date().toISOString()})
    dateCreated: string;

    @Prop({required: true})
    type: AccountTypes;

    @Prop({required: true})
    status: AccountStatus;

    @Prop({required: true, unique: true})
    accountNumber: string;

    @Prop({required: true})
    balance: number;

    @Prop({required: true, type: mongoose.Schema.Types.String, ref: 'User', unique: true})
    accountAdmin: User;

    @Prop([{required: true, type: mongoose.Schema.Types.String, ref: 'User'}])
    users: User[];

    @Prop({required: true})
    currency: Currency;

    @Prop({required: true, unique: true})
    name: string;

    @Prop([{type: mongoose.Schema.Types.String, ref: 'Transaction'}])
    transactions: Transaction[];

}

export const AccountSchema = SchemaFactory.createForClass(Account);