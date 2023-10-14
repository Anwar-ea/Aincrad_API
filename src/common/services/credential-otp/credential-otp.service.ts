import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/repositories/generic/generic.service';
import { CredentialOtp } from '../../models/entities/credential-otp';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwilioService } from '../twilio/twilio.service';

@Injectable()
export class CredentialOtpService extends GenericService<CredentialOtp> {
    constructor(@InjectModel('credentialOtp') private readonly credenOtp: Model<CredentialOtp>, private readonly twilioService: TwilioService){
        super(credenOtp)
    }

}
