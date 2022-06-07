import { Router } from 'express'
import * as controller from '../controllers'

const router = Router()

router.get('/users', controller.listUsersHandler)

router.post('/users', controller.createUser)

router.get('/users/:id', controller.getUser)

router.patch('/users/:id', controller.updateUser)

router.delete('/users/:id', controller.deleteUserHandler)

router.get('/groups', controller.listGroupsHandler)

router.post('/groups', controller.createGroup)

router.get('/groups/:id', controller.getGroup)

router.patch('/groups/:id', controller.updateGroup)

router.delete('/groups/:id', controller.deleteGroupHandler)

export default router
