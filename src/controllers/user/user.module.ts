import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from 'src/common/services/user/user.service';
import { MongoDbModule } from '../../common/database/mongo-db/mongo-db.module';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth-service/auth.service';
import { OtpService } from '../../common/services/otp/otp.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    MongoDbModule,
    AuthModule,
    ConfigModule
  ],
  controllers: [UserController],
  providers: [UserService, BcryptService, AuthService, OtpService, OtpService, TwilioService],
    exports:[]
})
export class UserModule {}
