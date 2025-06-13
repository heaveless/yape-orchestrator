import { AxiosResponse } from "axios";

export type HttpResponse<T> = AxiosResponse & {
    data: T;
};