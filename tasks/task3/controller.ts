import { Request, Response } from 'express'
import type { CreateBody, UpdateBody, User } from './model'
import * as userModel from './model'

export const listUsersHander = async (
  req: Request<unknown, unknown, unknown, { limit: string }>,
  res: Response<User[]>
) => {
  const { limit = '10' } = req.query
  const data = await userModel.listUser(parseInt(limit))
  res.json(data)
}

export const createUser = async (
  req: Request<unknown, unknown, CreateBody>,
  res: Response<User>
) => {
  const { login, password, age } = req.body
  const data = await userModel.createUser({ login, password, age })
  res.json(data)
}

export const getUser = async (
  req: Request<{ id: string }>,
  res: Response<User | null>
) => {
  const { id } = req.params
  const data = await userModel.getUser(id)
  res.json(data)
}

export const updateUser = async (
  req: Request<{ id: string }, unknown, UpdateBody>,
  res: Response<{ id: string }>
) => {
  const { id } = req.params
  const { password, age } = req.body
  const data = await userModel.updateUser(id, { password, age })
  res.json(data)
}

export const deleteUserHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params
  const data = await userModel.deleteUser(id)
  res.json(data)
}
