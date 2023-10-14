import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class GenerateService {
    constructor(){}

    generateOTP(): string{
        let otp = randomInt(100000, 999999);
        return otp.toString();
    }
}
