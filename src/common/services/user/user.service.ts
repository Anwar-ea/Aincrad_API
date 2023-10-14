import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/models/entities/user-entity';
import { GenericService } from 'src/repositories/generic/generic.service';
import { Model } from 'mongoose';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { UserLogin } from '../../models/DTOs/request DTOs/login';
import { UserResponse } from 'src/common/models/DTOs/response DTOs/userResponse';
import { AuthService } from 'src/auth/auth-service/auth.service';
import { RegisterUser } from '../../models/DTOs/request DTOs/Register-User';

@Injectable()
export class UserService extends GenericService<User>  {
    constructor(
        @InjectModel('Users') private userModel: Model<User>, 
        private bcryptService: BcryptService, 
        private authService: AuthService){
        super(userModel)
    }

    // #region public methods

    async getAllUsers(){
        return await this.find();
    }

    async registerUser (user: RegisterUser): Promise<User | string>{
        let newUser = new User(); 
        Object.entries(user).forEach(entry => newUser[entry[0]] = entry[1]);
        let doUserExists = await this.exists({$or: [{email: {$eq: user.email}}, {phoneNumber: {$eq: user.phoneNumber}}]});
        
        if(doUserExists) return 'User already exists with this "Email" or "Phone#"';

        newUser.password = await this.bcryptService.hashPassword(newUser.password);
        let dbUser = await this.add(newUser);
        await this.save(dbUser);
        return  dbUser;               
    }

    async login(userCredentials: UserLogin): Promise<UserResponse>{
        let dbUser: User;
        let responseUser = new UserResponse();
        let passwordMatch = false;

        try {            
            if (userCredentials.email && userCredentials.email.length) {
                dbUser = await this.findOne({email: userCredentials.email});
                if (dbUser) passwordMatch = await this.bcryptService.comparePassword(userCredentials.password, dbUser.password);                
                if (!dbUser || !passwordMatch) throw new Error("Your email or password does not match");
                this.loginMapper(dbUser, responseUser);                                
                responseUser.token = await this.authService.generateAuthToken( userCredentials, responseUser._id);
            }

            if (userCredentials.phoneNumber && userCredentials.phoneNumber.length) {
                dbUser = await this.findOne({phoneNumber: userCredentials.phoneNumber});
                if (dbUser) passwordMatch = await this.bcryptService.comparePassword(userCredentials.password, dbUser.password);
                if (!dbUser || !passwordMatch) throw new Error("Your phone# or password does not match");
                this.loginMapper(dbUser, responseUser);                
                responseUser.token = await this.authService.generateAuthToken(userCredentials, responseUser._id);
            }

            return responseUser;
            
        } catch (error) {throw new Error(error);}
    }


    //#endregion

    // #region private methods

    private loginMapper(dbUser: User, responseUser: UserResponse){
        responseUser._id = dbUser._id;
        responseUser.accounts = dbUser.accounts;
        responseUser.active = dbUser.active;
        responseUser.dateCreated = dbUser.dateCreated;
        responseUser.email = dbUser.email;
        responseUser.firstName = dbUser.firstName;
        responseUser.gender = dbUser.gender;
        responseUser.lastActivity = dbUser.lastActivity;
        responseUser.lastName = dbUser.lastName;
        responseUser.phoneNumber = dbUser.phoneNumber;
        responseUser.roles = dbUser.roles;
        responseUser.userName = dbUser.userName;
    }

    // #endregion

}
