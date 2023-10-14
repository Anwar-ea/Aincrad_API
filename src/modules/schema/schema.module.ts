import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../common/models/entities/user-entity';
import { AccountSchema } from '../../common/models/entities/account';
import { BeneficiarySchema } from '../../common/models/entities/beneficiary';
import { KycSchema } from '../../common/models/entities/kyc';
import { OtpSchema } from 'src/common/models/entities/otp';
import { TransactionSchema } from 'src/common/models/entities/transaction';
import { CredentialOtpSchema } from '../../common/models/entities/credential-otp';

@Module({
    imports:[
        MongooseModule.forFeature([{name: 'Users', schema: UserSchema}, {name: 'Accounts', schema: AccountSchema}, {name: 'Beneficiaries', schema: BeneficiarySchema}, {name: 'Transactions', schema: TransactionSchema}, {name: 'Kyc', schema: KycSchema}, {name: 'Otp', schema: OtpSchema}, {name: 'credentialOtp', schema: CredentialOtpSchema}])
    ],
    exports:[
        MongooseModule.forFeature([{name: 'Users', schema: UserSchema}, {name: 'Accounts', schema: AccountSchema}, {name: 'Beneficiaries', schema: BeneficiarySchema}, {name: 'Transactions', schema: TransactionSchema}, {name: 'Kyc', schema: KycSchema}, {name: 'Otp', schema: OtpSchema}, {name: 'credentialOtp', schema: CredentialOtpSchema}]),
    ]
})
export class SchemaModule {}
