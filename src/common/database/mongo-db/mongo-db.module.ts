import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environment } from 'src/config/environment';
import { SchemaModule } from 'src/modules/schema/schema.module';

const connectionString = (configService:ConfigService): string => configService.get<string>(environment.production ? 'DB_prod_Connection' : 'DB_dev_Connection');

@Module({
    imports:[
        SchemaModule,
        ConfigModule.forRoot({ envFilePath: './src/config/.env' }),
        MongooseModule.forRoot(connectionString(new ConfigService()), {
            dbName: 'Upgarade-Banq-dev'            
        }),  
    ],
    exports:[
        MongooseModule.forRoot(connectionString(new ConfigService()), {
            dbName: 'Upgarade-Banq-dev'            
        }),
        SchemaModule
    ]
})
export class MongoDbModule {}
