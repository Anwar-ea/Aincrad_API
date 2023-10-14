import { ILogin } from "../../request interfaces/login.interface";

export class UserLogin implements ILogin{
    email?: string;
    password: string;
    phoneNumber?: string;   
}