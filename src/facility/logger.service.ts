import * as log4js from 'log4js'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { LoggerService } from '@nestjs/common'
import { ConfigService } from './config.service'

export class Logger implements LoggerService {
    private commonLogger: log4js.Logger
    private requestLogger: log4js.Logger
    private cacheLogger: log4js.Logger

    constructor(private readonly config: ConfigService) {
        this.config = config

        const layout = { type: 'pattern', pattern: '%m' }
        const commonLevel = config.DEBUG ? 'debug' : 'info'
        const appenders = {
            console: undefined,
            common: getAppender('common'),
            request: getAppender('request'),
            cache: getAppender('cache'),
        }
        const categories = {
            default: { appenders: ['common'], level: commonLevel },
            request: { appenders: ['request'], level: 'info' },
            cache: { appenders: ['cache'], level: 'info' },
        }
        // output logs to console in debug mode
        if (this.config.DEBUG) {
            appenders.console = { type: 'console', layout }
            categories.default.appenders.push('console')
            categories.request.appenders.push('console')
            categories.cache.appenders.push('console')
        }

        log4js.configure({
            appenders,
            categories,
            disableClustering: true,
        })
        this.commonLogger = log4js.getLogger('common')
        this.requestLogger = log4js.getLogger('request')
        this.cacheLogger = log4js.getLogger('cache')

        function getAppender(type: string) {
            return {
                type: 'dateFile',
                category: type,
                alwaysIncludePattern: true,
                pattern: `.yyyyMMdd.log`,
                filename: config.get(`${type}LogPath`),
                layout,
            }
        }
    }

    cache(event: string, controller: string, url: string, value?: string) {
        this.cacheLogger.info(this.mergeData({
            event,
            appname: this.config.APP_NAME,
            controller,
            url,
            value,
        }))
    }
    request(data: object) {
        this.requestLogger.info(this.mergeData(data))
    }
    debug(data: object) {
        this.commonLogger.debug(this.mergeData(this.preproccess(data), 'DEBUG'))
    }
    log(data: object) {
        this.commonLogger.info(this.mergeData(this.preproccess(data), 'INFO'))
    }
    warn(data: object) {
        this.commonLogger.warn(this.mergeData(this.preproccess(data), 'WARN'))
    }
    error(data: object) {
        this.commonLogger.error(this.mergeData(this.preproccess(data), 'ERROR'))
    }
    fatal(data: object) {
        this.commonLogger.fatal(this.mergeData(this.preproccess(data), 'FATAL'))
    }

    private preproccess(data: object) {
        return data === undefined
            || data === null
            || typeof data === 'symbol'
            || typeof data === 'boolean'
            || typeof data === 'string'
            || typeof data === 'number'
            || data instanceof Array
            || data instanceof Map
            || data instanceof Set
            ? { message: data } : data
    }

    private mergeData(data: object, level?: string) {
        return JSON.stringify({
            '@env': process.env.NODE_ENV,
            '@region': process.env.REGION,
            '@servername': this.config.SERVER_NAME,
            '@serverip': this.config.SERVER_IP,
            '@timestamp': dayjs().toISOString(),
            'level': level,
            ...data,
        })
    }
}
