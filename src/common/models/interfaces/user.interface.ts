import { Roles } from "src/common/constants/enums/Roles";
import { Account } from "../entities/account";
import { Genders } from '../../constants/enums/Genders';

export interface IUser {
    _id: string;
    email: string;
    phoneNumber:string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    dateCreated: string;
    active: boolean;
    lastActivity: string;
    accounts: Account[];
    roles: Roles[];
    gender: Genders;
}
