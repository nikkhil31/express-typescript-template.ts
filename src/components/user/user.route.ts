import { Router } from 'express'
import UserController from '@components/user/user.controller'
import asyncHandler from 'express-async-handler'
import validate from '@core/middlewares/validate.middleware'
import { createUser, editUser } from './user.validation'

const router: Router = Router()

const user = new UserController()

router.post('/user', validate(createUser), asyncHandler(user.createUser))
router.get('/user', asyncHandler(user.readUser))
router.put('/user', validate(editUser), asyncHandler(user.updateUser))
router.delete('/user', asyncHandler(user.deleteUser))

export default router
