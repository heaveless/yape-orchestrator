import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformRequestInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TransformRequestInterceptor.name);

    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const TransformClass = this.reflector.get<new (data: any) => any>(
            'transformRequestConfig',
            context.getHandler()
        );

        try {
            if (TransformClass && request.body) {
                request.body = new TransformClass(request.body);
            }
        } catch (err) {
            this.logger.error('[TransformRequestInterceptor] Error instantiating class:', err);
            throw new HttpException(
                {
                    message: err.message,
                    data: null,
                },
                err.status,
            );
        }

        return next.handle().pipe(
            map((data) => ({
                message: 'OK',
                data,
            })),
            catchError((err) => {
                this.logger.error('[TransformRequestInterceptor] Error in downstream logic:', err);
                throw new HttpException(
                    {
                        message: err.message,
                        data: null,
                    },
                    err.status,
                );
            })
        );
    }
}