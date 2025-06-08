import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthProvider } from '@/modules/auth/auth.provider';
import {
    LoginArgs,
    RegisterArgs,
    ResendArgs,
    VerifyArgs,
    ProfileArgs
} from '@/modules/auth/auth.model';

describe('AuthService', () => {
    let service: AuthService;
    let provider: AuthProvider;

    const mockAuthProvider = {
        login: jest.fn(),
        register: jest.fn(),
        resend: jest.fn(),
        verify: jest.fn(),
        profile: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: AuthProvider, useValue: mockAuthProvider }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        provider = module.get<AuthProvider>(AuthProvider);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should call authProvider.login with args', async () => {
            const args: LoginArgs = { phone: '999999999', code: '123456' };
            const response = { accessToken: 'token' };
            mockAuthProvider.login.mockResolvedValue(response);

            const result = await service.login(args);
            expect(result).toBe(response);
            expect(provider.login).toHaveBeenCalledWith(args);
        });
    });

    describe('register', () => {
        it('should call authProvider.register with args', async () => {
            const args: RegisterArgs = { phone: '999999999', code: '123456' };
            const response = { message: 'Registered' };
            mockAuthProvider.register.mockResolvedValue(response);

            const result = await service.register(args);
            expect(result).toBe(response);
            expect(provider.register).toHaveBeenCalledWith(args);
        });
    });

    describe('resend', () => {
        it('should call authProvider.resend with args', async () => {
            const args: ResendArgs = { phone: '999999999' } as ResendArgs;
            const response = { message: 'Code sent' };
            mockAuthProvider.resend.mockResolvedValue(response);

            const result = await service.resend(args);
            expect(result).toBe(response);
            expect(provider.resend).toHaveBeenCalledWith(args);
        });
    });

    describe('verify', () => {
        it('should call authProvider.verify with args', async () => {
            const args: VerifyArgs = { phone: '999999999' } as VerifyArgs;
            const response = { message: 'Verified' };
            mockAuthProvider.verify.mockResolvedValue(response);

            const result = await service.verify(args);
            expect(result).toBe(response);
            expect(provider.verify).toHaveBeenCalledWith(args);
        });
    });

    describe('profile', () => {
        it('should call authProvider.profile with args', async () => {
            const args: ProfileArgs = { accessToken: 'token' };
            const response = { phone: '999999999' };
            mockAuthProvider.profile.mockResolvedValue(response);

            const result = await service.profile(args);
            expect(result).toBe(response);
            expect(provider.profile).toHaveBeenCalledWith(args);
        });
    });
});