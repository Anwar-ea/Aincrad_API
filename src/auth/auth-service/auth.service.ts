import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from '../../common/models/DTOs/request DTOs/login';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService ) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === pass) {
        //   const { password, ...result } = user;
        //   return result;
        // }
        // return null;
    }
    
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async generateAuthToken(userCredentials: UserLogin, userId: string): Promise<string>{
        let token:string;
        if (userCredentials.email) token = await this.jwtService.signAsync({email: userCredentials.email, userId: userId});
        if (userCredentials.phoneNumber) token = await this.jwtService.signAsync({email: userCredentials.phoneNumber, userId: userId});
        return 'Bearer '+ token;
    }
}
