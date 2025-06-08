import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthProvider } from "./auth.provider";
import { AuthController } from "./auth.controller";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                baseURL: configService.get<string>('auth.BASE_URL')
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        AuthProvider
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }