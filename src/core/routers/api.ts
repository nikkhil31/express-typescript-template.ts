import { Router } from 'express'

import user from '@components/user/user.route'

const router: Router = Router()
router.use(user)

export default router
