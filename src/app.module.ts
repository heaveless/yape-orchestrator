import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import secrets from './config/secrets.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [secrets]
    }),
    AuthModule,
    TransactionModule
  ],
})
export class AppModule { }
