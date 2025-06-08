import { HttpResponse } from '@/shared/types/http.type';
import { AxiosResponse } from 'axios';

describe('HttpResponse Type', () => {
    it('should match expected Axios shape with typed data', () => {
        type MyData = { ok: boolean };
        const response: HttpResponse<MyData> = {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: { ok: true },
        } as AxiosResponse;

        expect(response.data.ok).toBe(true);
    });
});