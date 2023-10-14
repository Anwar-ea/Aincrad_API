import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';
import { environment } from '../../../config/environment';
import { Status } from '../../constants/enums/Status';

@Injectable()
export class TwilioService {

    constructor(private readonly configService: ConfigService){}


    async sendTwilioSMS(phoneNumber: string, otp: string): Promise<string>{
        let smsStatus = '';
        const client = Twilio(this.configService.get(environment.production ? 'twilio_sid_prod' : 'twilio_sid_dev'), this.configService.get(environment.production ? 'twilio_AuthToken_prod' : 'twilio_AuthToken_dev'));
        await client.messages.create({
            to: phoneNumber, 
            body: `Upgrade-Tackle: Warning! Do not share your account registration OTP with anyone.\n Your OTP is:${otp}`, 
            messagingServiceSid: this.configService.get(environment.production ? 'twilio_service_sid_prod' : 'twilio_service_sid_dev')
        }).then(message => {
            if (Status.Accepted.toLowerCase() !== message.status.toLowerCase()) throw new Error('Failed To send OTP message')
            console.log(message);
            smsStatus = message.status;
        }).catch(err => smsStatus = err);

        return smsStatus;        
    }
}
