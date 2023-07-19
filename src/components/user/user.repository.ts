import { createConnection } from '@config/db'
import { User } from '@components/user/user.entity'

export const UserRepository = createConnection.getRepository(User)
