import { NextFunction, Request, Response } from 'express'
import UserService from './user.service'
import { IUser } from './user.interface'
import ApiResponse from '@core/utils/apiResponse'
import AppError from '@core/utils/appError'

class UserController {
    private services: UserService
    private apiResponse: ApiResponse

    constructor() {
        this.services = new UserService()
        this.apiResponse = new ApiResponse()
    }

    public createUser = async (req: Request, res: Response) => {
        const user = req.body as IUser
        const createdUser = await this.services.create(user)
        this.apiResponse.success<IUser>(res, createdUser)
    }

    public readUser = async (req: Request, res: Response) => {
        const user = await this.services.read()
        this.apiResponse.success<IUser[]>(res, user)
    }

    public updateUser = async (req: Request, res: Response) => {
        const user = req.body as IUser
        const updatedUser = await this.services.update(user)
        this.apiResponse.success<IUser>(res, updatedUser)
    }

    public deleteUser = async (req: Request, res: Response) => {
        // next(new AppError(500,'User not found 123!'))
        const id = req.body.id
        const deletedUserId = await this.services.delete(id)
        this.apiResponse.success<number>(res, deletedUserId)
    }
}

export default UserController
