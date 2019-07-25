import { Injectable } from '@nestjs/common'

@Injectable()
export class HomeService {
    index(): string {
        return 'Hello World!'
    }
}
