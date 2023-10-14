import { Module } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt-strategy/jwt.strategy';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

const getSecretKey = (configService: ConfigService) => configService.get('jwt_Secret_key');

@Module({
  imports:[
    ConfigModule,
    JwtModule.register({
      secret: getSecretKey(new ConfigService()),
      signOptions:{
        expiresIn: '30m'        
      }
    })
  ],
  exports:[
    JwtModule.register({
      secret: getSecretKey(new ConfigService()),
      signOptions:{
        expiresIn: '30m'        
      }
    })
  ],
  providers: [AuthService, JwtStrategy, LocalAuthGuard, JwtAuthGuard]
})
export class AuthModule {}
