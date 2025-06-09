import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import secrets from './config/secrets.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformRequestInterceptor } from './shared/interceptors/transform-request.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [secrets]
    }),
    AuthModule,
    TransactionModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformRequestInterceptor,
    },
  ]
})
export class AppModule { }
