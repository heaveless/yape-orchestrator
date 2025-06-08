import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import {
    UserLoginRequest,
    UserRegisterRequest,
    UserResendRequest
} from '@/modules/auth/auth.model';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn(),
        resend: jest.fn(),
        verify: jest.fn(),
        profile: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService }
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should call authService.login with body', async () => {
            const body: UserLoginRequest = { phone: '999999999', code: '123456' };
            const mockResponse = { accessToken: 'token' };
            mockAuthService.login.mockResolvedValue(mockResponse);

            const result = await controller.login(body);
            expect(result).toBe(mockResponse);
            expect(service.login).toHaveBeenCalledWith(body);
        });
    });

    describe('register', () => {
        it('should call authService.register with body', async () => {
            const body: UserRegisterRequest = { phone: '999999999', code: '123456' };
            const mockResponse = { message: 'Registered' };
            mockAuthService.register.mockResolvedValue(mockResponse);

            const result = await controller.register(body);
            expect(result).toBe(mockResponse);
            expect(service.register).toHaveBeenCalledWith(body);
        });
    });

    describe('resend', () => {
        it('should call authService.resend with body', async () => {
            const body: UserResendRequest = { phone: '999999999' } as UserResendRequest;
            const mockResponse = { message: 'Code sent' };
            mockAuthService.resend.mockResolvedValue(mockResponse);

            const result = await controller.resend(body);
            expect(result).toBe(mockResponse);
            expect(service.resend).toHaveBeenCalledWith(body);
        });
    });

    describe('verify', () => {
        it('should call authService.verify with body', async () => {
            const body: UserResendRequest = { phone: '999999999' } as UserResendRequest;
            const mockResponse = { message: 'Verified' };
            mockAuthService.verify.mockResolvedValue(mockResponse);

            const result = await controller.verify(body);
            expect(result).toBe(mockResponse);
            expect(service.verify).toHaveBeenCalledWith(body);
        });
    });

    describe('profile', () => {
        it('should call authService.profile with token', async () => {
            const token = 'Bearer abc.def.ghi';
            const mockResponse = { phone: '999999999' };
            mockAuthService.profile.mockResolvedValue(mockResponse);

            const result = await controller.profile(token);
            expect(result).toBe(mockResponse);
            expect(service.profile).toHaveBeenCalledWith({ accessToken: token });
        });
    });
});