export class Logger {
    loggerName: string;
    constructor(loggerName: string) {
        this.loggerName = loggerName;
    }

    debug(message: string) : void {
        console.log(`[ ${new Date().toISOString()} ] [ ${this.loggerName} / DEBUG ] : ${message}`)
    }

    info(message: string) : void {
        console.log(`[ ${new Date().toISOString()} ] [ ${this.loggerName} / INFO ] : ${message}`)
    }

    warn(message: string) : void {
        console.log(`[ ${new Date().toISOString()} ] [ ${this.loggerName} / WARNING ] : ${message}`)
    }

    error(message: string) : void {
        console.log(`[ ${new Date().toISOString()} ] [ ${this.loggerName} / ERROR ] : ${message}`)
    }

    fatal(message: string) : void {
        console.log(`[ ${new Date().toISOString()} ] [ ${this.loggerName} / FATAL ] : ${message}`)
    }
}