import { Response } from 'express'
import httpStatus from 'http-status'

class ApiResponse {
    constructor() {}

    public success<T>(res: Response, data: T | null = null, message: string = 'success') {
        return res.json({
            status: httpStatus.OK,
            message,
            data,
        })
    }

    public error(res: Response, statusCode: number, message: string) {
        return res.json({
            status: statusCode,
            message,
        })
    }
}

export default ApiResponse
