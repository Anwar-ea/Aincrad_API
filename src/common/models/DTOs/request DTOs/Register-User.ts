import { Genders } from 'src/common/constants/enums/Genders';
import { IRegisterUser } from '../../request interfaces/register-user.interface';
import { IsString, IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';
export class RegisterUser implements IRegisterUser{
    @IsEmail()
    email?: string;

    @IsPhoneNumber()
    phoneNumber?: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    userName: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1})
    password: string;

    @IsString()
    gender: Genders;    
}