// import logger from '@core/utils/logger';

import AppError from './appError'
import Logger from './logger'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleError", "isTrustedError"] }] */
class ErrorHandler {
    public handleError(error: Error): void {
        Logger.error(error)
    }

    public isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational
        }
        return false
    }
}

export default new ErrorHandler()
