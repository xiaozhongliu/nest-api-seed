import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Logger } from '../_base/logger.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request, Response } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: Logger) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(map(data => {
            const request: Request = context.switchToHttp().getRequest()
            const response: Response = context.switchToHttp().getResponse()
            this.logger.request({
                '@duration': Date.now() - now,
                '@clientip': request.headers['x-forwarded-for'],
                controller: `${context.getClass().name}.${context.getHandler().name}`,
                method: request.method,
                url: request.url,
                metedata: request.headers,
                request: {
                    query: request.query,
                    body: request.body,
                },
                response: data,
                status: response.statusCode,
            })
            return data
        }))
    }
}
