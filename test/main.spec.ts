import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';

describe('AppModule (integration)', () => {
    it('should compile without errors', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(module).toBeDefined();
    });
});