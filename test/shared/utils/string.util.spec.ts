import { template, queryString } from '@/shared/utils/string.util';

describe('template()', () => {
    it('should replace placeholders with object values', () => {
        const result = template('Hello, {name}!', { name: 'Alice' });
        expect(result).toBe('Hello, Alice!');
    });

    it('should replace placeholders with array values by index', () => {
        const result = template('Hi {0}, welcome to {1}', ['Bob', 'NestJS']);
        expect(result).toBe('Hi Bob, welcome to NestJS');
    });

    it('should skip missing values and replace with empty string', () => {
        const result = template('Hello {name}, you are {age}', { name: 'Charlie' });
        expect(result).toBe('Hello Charlie, you are ');
    });

    it('should handle escaped placeholders like {key}', () => {
        const result = template('This is a real {key}, not a placeholder.', { key: 'VALUE' });
        expect(result).toBe('This is a real VALUE, not a placeholder.');
    });

    it('should return input if no placeholders are found', () => {
        const result = template('Static string with no placeholders', { foo: 'bar' });
        expect(result).toBe('Static string with no placeholders');
    });
});

describe('queryString()', () => {
    it('should generate query string from flat object', () => {
        const result = queryString({ page: 1, search: 'term' });
        expect(result).toBe('page=1&search=term');
    });

    it('should skip null and undefined values', () => {
        const result = queryString({ a: 1, b: null, c: undefined, d: 'ok' });
        expect(result).toBe('a=1&d=ok');
    });

    it('should return empty string if object is empty', () => {
        expect(queryString({})).toBe('');
    });

    it('should skip array values', () => {
        const result = queryString({ foo: [1, 2], bar: 'baz' });
        expect(result).toBe('bar=baz');
    });

    it('should encode keys and values', () => {
        const result = queryString({ 'na me': 'Jo hn', 'q@ry': 'va lue' });
        expect(result).toBe('na%20me=Jo%20hn&q%40ry=va%20lue');
    });
});