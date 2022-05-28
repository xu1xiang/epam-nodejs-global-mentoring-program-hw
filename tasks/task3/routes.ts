import { Router } from 'express'
import * as controller from './controller'

const router = Router()

router.get('/users', controller.listUsersHander)

router.post('/users', controller.createUser)

router.get('/users/:id', controller.getUser)

router.patch('/users/:id', controller.updateUser)

router.delete('/users/:id', controller.deleteUserHandler)

export default router
