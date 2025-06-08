const placeholderPattern = /\{([0-9a-zA-Z_]+)\}/g;

export function template(str: string, args?: Record<string, any> | any[]): string {
    let values: Record<string, any>;

    if (args && typeof args === 'object' && !Array.isArray(args)) {
        values = args;
    } else if (arguments.length > 2 || Array.isArray(args)) {
        values = Array.isArray(args)
            ? args
            : Array.prototype.slice.call(arguments, 1);
    } else {
        values = {};
    }

    return str.replace(placeholderPattern, (match, key, index) => {
        const isEscaped = str[index - 1] === '{' && str[index + match.length] === '}';

        if (isEscaped) {
            return key;
        }

        const value = values.hasOwnProperty(key) ? values[key] : '';
        return value != null ? String(value) : '';
    });
}

export function queryString(params: Record<string, unknown>): string {
    const entries = Object.entries(params)

    if (!entries.length) {
        return ''
    }

    const queryStr = entries.filter(([, v]) => v != null && !Array.isArray(v))
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);

    return queryStr.join("&");
}