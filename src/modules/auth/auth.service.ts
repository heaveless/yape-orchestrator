import { Injectable } from "@nestjs/common";
import { AuthProvider } from "./auth.provider";
import { LoginArgs, LoginReturn, ProfileArgs, ProfileReturn, RegisterArgs, RegisterReturn, ResendArgs, ResendReturn, VerifyArgs, VerifyReturn } from "./auth.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly authProvider: AuthProvider
    ) { }

    login(args: LoginArgs): Promise<LoginReturn> {
        return this.authProvider.login(args);
    }

    register(args: RegisterArgs): Promise<RegisterReturn> {
        return this.authProvider.register(args);
    }

    resend(args: ResendArgs): Promise<ResendReturn> {
        return this.authProvider.resend(args);
    }

    verify(args: VerifyArgs): Promise<VerifyReturn> {
        return this.authProvider.verify(args);
    }

    profile(args: ProfileArgs): Promise<ProfileReturn> {
        return this.authProvider.profile(args);
    }
}