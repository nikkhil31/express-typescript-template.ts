import AppError from '@core/utils/appError'
import { User } from './user.entity'
import { IUser } from './user.interface'
import { UserRepository } from './user.repository'
import httpStatus from 'http-status'
class UserService {
    constructor() {}

    public async create(data: IUser) {
        const user = new User()
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.type = data.type

        return await UserRepository.save(user)
    }

    public async read() {
        return await UserRepository.find()
    }

    public async update(data: IUser) {
        const user = await UserRepository.findOneBy({
            id: data.id,
        })

        if (!user) {
            throw new Error('User not found!')
        }
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.type = data.type

        await UserRepository.save(user)
        return user
    }

    public async delete(id: number) {
        const user = await UserRepository.findOneBy({
            id,
        })

        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User not found!')
        }

        await UserRepository.remove(user)
        return id
    }
}

export default UserService
