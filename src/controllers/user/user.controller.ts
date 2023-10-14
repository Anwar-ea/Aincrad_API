import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/models/entities/user-entity';
import { UserService } from 'src/common/services/user/user.service';
import { LocalAuthGuard } from '../../auth/auth-guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { UserLogin } from '../../common/models/DTOs/request DTOs/login';
import { OtpService } from '../../common/services/otp/otp.service';
import { RegisterUser } from 'src/common/models/DTOs/request DTOs/Register-User';
import { ICredentialConfirmOtp } from 'src/common/models/request interfaces/credential-confirm-otp.interface';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService, private readonly otpService: OtpService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Post('/sendMessage')
  async sendSMS(@Body() body: { number: string, userId: string }): Promise<string>{
    const { number, userId } = body;

    return this.otpService.sendOtp("", number);
  }

  @Post('/register')
  async addUser(@Body() registerUser: RegisterUser){
    return await this.userService.registerUser(registerUser);
  }

  @Post('/login')
  async login(@Body() credentials: UserLogin){    
      return await this.userService.login(credentials);      
  }

  @Get('/confirmPhoneOrEmailOtp')
  async confirmPhoneOrEmail(@Query('email') email: string, @Query('phoneNumber') phoneNumber: string, @Query('otp') otp: string){

  }

  @Post('/genPhoneOrEmailConfirmOtp')
  async genPhoneOrEmailConfirmOtp(@Body() body: ICredentialConfirmOtp){

  }
}
