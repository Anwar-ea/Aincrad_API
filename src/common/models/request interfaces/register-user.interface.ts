import { Genders } from "src/common/constants/enums/Genders";

export interface IRegisterUser {
    email?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    gender: Genders;
}
