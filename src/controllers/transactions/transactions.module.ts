import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { ZitopayService } from '../../common/services/zitopay/zitopay.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule
  ],
  controllers: [TransactionsController],
  providers: [ZitopayService]
})
export class TransactionsModule {}
