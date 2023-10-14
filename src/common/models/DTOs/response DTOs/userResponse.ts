import { Roles } from "src/common/constants/enums/Roles";
import { Account } from "../../entities/account";
import { Genders } from "src/common/constants/enums/Genders";
import { IUserResponse } from "../../response interfaces/user-response.interface";

export class UserResponse implements IUserResponse{
    _id: string;
    email?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    userName: string;
    dateCreated: string;
    active: boolean;
    lastActivity: string;
    accounts?: Account[];
    roles: Roles[];
    dateOfBirth: string;
    gender: Genders;
    token: string;    
}