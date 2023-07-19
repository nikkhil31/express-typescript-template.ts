import AppError from '@core/utils/appError'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { AnyZodObject, ZodError } from 'zod'

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req)
        return next()
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessage = JSON.parse(error.message)[0].message
            return next(new AppError(httpStatus.BAD_REQUEST, errorMessage))
        }
    }
}

export default validate
