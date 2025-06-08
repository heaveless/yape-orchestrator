import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse, UserResendRequest, UserResendResponse } from "./auth.model";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("login")
    login(
        @Body() body: UserLoginRequest
    ): Promise<UserLoginResponse> {
        return this.authService.login(body);
    }

    @Post("register")
    register(
        @Body() body: UserRegisterRequest
    ): Promise<UserRegisterResponse> {
        return this.authService.register(body);
    }

    @Post("resend")
    resend(
        @Body() body: UserResendRequest
    ): Promise<UserResendResponse> {
        return this.authService.resend(body);
    }

    @Post("verify")
    verify(
        @Body() body: UserResendRequest
    ) {
        return this.authService.verify(body);
    }

    @Get("profile")
    profile(
        @Headers("authorization") authorization: string
    ) {
        return this.authService.profile({ accessToken: authorization });
    }
}