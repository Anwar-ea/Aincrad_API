import { Injectable } from '@nestjs/common';
import { request } from 'undici';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZitopayService {

    constructor(private configService: ConfigService){}
    /**
     * Zitopay accept payment api.
     * @param {number} amount Amount of currency.
     * @param {string} currency Currency type you want to pay in.
     * @return {HTMl} Response is Html Page for zitopay payment.
     */
    async acceptPaymentApi(amount: number, currency: string = 'XAF'): Promise<string>{
        let response: string;
        const receiver = this.configService.get('zitopay_account');    

        let res = await request(`https://zitopay.africa/sci?receiver=${receiver}&amount=${amount}&currency=${currency}`);

        response = await res.body.text();
        return response;
    }

    /**
     * Zitopay Withdraw  api.
     * @param {string} email your email on zitopay
     * @param {string} password your password on zitopay
     * @param {string} transaction_pin your transaction-Pin for zitopay
     * @param {number} amount Amount of currency.
     * @param {string} currency Currency type you want to pay in.
     * @param {string} destination_account Currency wallet address where you want to withdraw.
     * @return {unConfirmed} Response is Html Page for zitopay payment.
     */
    async zitopayWithdrawlApi(email: string, password: string, transaction_pin: string, amount: number, currency: string, destination_account?: string) {
        let response;
        const token_key = Math.floor(new Date().getTime()/1000);
        const token = createHash('md5').update(`${(createHash('sha512').update(password + email).digest())}${token_key}`).digest().toString('hex');
        const transaction_pin_hash = createHash('md5').update(`${(createHash('md5').update(transaction_pin + email).digest())}${token_key}`).digest().toString('hex');

        let res = await request(`https://zitopay.africa/api_v1?action=withdraw&proceed=confirm&payment_currency=${currency}&email=${email}&token_key=${token_key}&token=${token}&transaction_pin_hash=${transaction_pin_hash}&amount=${amount}`
        + (destination_account != null || destination_account == '') ? `` : `&destination_account=${destination_account}`);

        response = await res.body.json();
        return response;
    }
}
