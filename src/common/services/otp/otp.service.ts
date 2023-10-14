import { Injectable } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { GenericService } from 'src/repositories/generic/generic.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from '../../models/entities/otp';
import { GenerateService } from '../generate/generate.service';

@Injectable()
export class OtpService extends GenericService<Otp>{
  
    constructor(private readonly twilioService: TwilioService, @InjectModel('Otp') private readonly otpModel: Model<Otp>, private readonly generateService: GenerateService){
        super(otpModel)
    }

    async sendOtp(userId: string, phoneNumber?: string, email?: string): Promise<string>{
        let otpAuth = new Otp();
        let otp = this.generateService.generateOTP();
        otpAuth.otp = otp;
        otpAuth.userId = userId;
        if (email){
            try {
                await this.twilioService.sendTwilioSMS(phoneNumber, otp);    
                this.save(await this.add(otpAuth));
                return 'OTP sent to your email'
            } catch (error) {
                return 'There was an error sending OTP please again try later';
            } 
        }

        if (phoneNumber){
            try {
                await this.twilioService.sendTwilioSMS(phoneNumber, otp);    
                this.save(await this.add(otpAuth));
                return 'OTP sent to your number';
            } catch (error) {
                return 'There was an error sending OTP please again try later';
            }        
        }

    }


}
