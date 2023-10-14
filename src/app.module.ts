import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './common/database/mongo-db/mongo-db.module';
import { UserModule } from './controllers/user/user.module';
import { TransactionsModule } from './controllers/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/config/.env'
    }),
    MongoDbModule,
    UserModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
