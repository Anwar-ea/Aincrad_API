import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import { Roles } from '../../constants/enums/Roles';
import mongoose from 'mongoose';
import { Account } from './account';
import { IUser } from "../interfaces/user.interface";
import { Genders } from "src/common/constants/enums/Genders";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
    
    @Prop({default: randomUUID()})
    _id: string = randomUUID();

    @Prop({unique: true, sparse: true})
    email: string;
    
    @Prop({unique: true, sparse: true})
    phoneNumber:string;
    
    @Prop({required: true})
    firstName: string;
    
    @Prop({required: true})
    lastName: string;
    
    @Prop({required: true, unique: true})
    userName: string;

    @Prop({required: true, minlength: 8, maxlength: 60})
    password: string;

    @Prop({required: true, default: new Date().toISOString()})
    dateCreated: string = new Date().toISOString();
    
    @Prop({required: true, default: true})
    active: boolean = false;
    
    @Prop({required: true, default: new Date().toISOString()})
    lastActivity: string = new Date().toISOString();
    
    @Prop({type: mongoose.Schema.Types.String, ref: 'Account', unique: true, sparse: true})
    accounts: Account[];

    @Prop()
    roles: Roles[];

    @Prop({required: true})
    gender: Genders;
}

export const UserSchema = SchemaFactory.createForClass(User);