import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { HttpMapper } from "@/shared/decorators/http-mapper.decorator";
import { AuthLoginExternalRequest, AuthLoginExternalResponse, AuthProfileExternalRequest, AuthProfileExternalResponse, AuthRegisterExternalRequest, AuthRegisterExternalResponse, AuthResendExternalRequest, AuthResendExternalResponse, AuthVerifyExternalRequest, AuthVerifyExternalResponse } from "./auth.model";

@Injectable()
export class AuthProvider {
    constructor(
        private readonly httpService: HttpService
    ) { }

    @HttpMapper(res => res.data)
    async login(
        request: AuthLoginExternalRequest
    ): Promise<AuthLoginExternalResponse> {
        const response = await firstValueFrom(
            this.httpService.post("/api/login", request)
        );

        return response.data;
    }

    @HttpMapper(res => res.data)
    async register(
        request: AuthRegisterExternalRequest
    ): Promise<AuthRegisterExternalResponse> {
        await firstValueFrom(
            this.httpService.post("/api/register", request)
        );
    }

    @HttpMapper(res => res.data)
    async resend(
        request: AuthResendExternalRequest
    ): Promise<AuthResendExternalResponse> {
        await firstValueFrom(
            this.httpService.post("/api/resend", request)
        );
    }

    @HttpMapper(res => res.data)
    async verify(
        request: AuthVerifyExternalRequest
    ): Promise<AuthVerifyExternalResponse> {
        await firstValueFrom(
            this.httpService.post("/api/verify", request)
        );
    }

    @HttpMapper(res => res.data)
    async profile(
        request: AuthProfileExternalRequest
    ): Promise<AuthProfileExternalResponse> {
        const response = await firstValueFrom(
            this.httpService.get(
                "/api/profile",
                {
                    headers: {
                        authorization: request.accessToken
                    }
                })
        );

        return response.data;
    }
}