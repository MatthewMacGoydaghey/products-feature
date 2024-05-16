import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {

  log(message: any, context?: string) {
    const entry = `${message}, ${context}`

    super.log(message, context)
  }
}
