import { IsJWT, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

// LOGIN

export class UserLoginRequest {
    @IsString()
    @IsPhoneNumber()
    phone: number;

    @IsString()
    @IsNumberString()
    code: number;
};

export type UserLoginResponse = {
    accessToken: string;
    refreshToken: string;
};

// REGISTER

export class UserRegisterRequest {
    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNumberString()
    code: string;
}

export type UserRegisterResponse = void;

// RESEND

export class UserResendRequest {
    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNumberString()
    confirmationCode: string;
};

export type UserResendResponse = void;

// VERIFY

export class UserVerifyRequest {
    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNumberString()
    confirmationCode: string;
};

export type UserVerifyResponse = void;

// PROFILE

export class UserProfileRequest {
    @IsString()
    @IsJWT()
    accessToken: string;
};

export type UserProfileResponse = {
    username: string;
    exp: string;
    iat: string;
    sub: string;
}

// === INTERNAL ===

export type LoginArgs = UserLoginRequest;
export type LoginReturn = UserLoginResponse;

export type RegisterArgs = UserRegisterRequest;
export type RegisterReturn = UserRegisterResponse;

export type ResendArgs = UserResendRequest;
export type ResendReturn = UserResendResponse;

export type VerifyArgs = UserVerifyRequest;
export type VerifyReturn = UserVerifyResponse;

export type ProfileArgs = UserProfileRequest;
export type ProfileReturn = UserProfileResponse;

// === EXTERNAL ===

export type AuthLoginExternalRequest = LoginArgs;
export type AuthLoginExternalResponse = LoginReturn;

export type AuthRegisterExternalRequest = RegisterArgs
export type AuthRegisterExternalResponse = RegisterReturn;

export type AuthResendExternalRequest = ResendArgs;
export type AuthResendExternalResponse = ResendReturn;

export type AuthVerifyExternalRequest = VerifyArgs;
export type AuthVerifyExternalResponse = VerifyReturn;

export type AuthProfileExternalRequest = ProfileArgs;
export type AuthProfileExternalResponse = ProfileReturn;