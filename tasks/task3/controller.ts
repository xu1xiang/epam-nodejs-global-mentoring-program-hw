import { RequestHandler } from 'express'
import joi from 'joi'
import { BadRequestError, InternalServerError } from './Errors'
import type { CreateBody, UpdateBody, User } from './model'
import * as userModel from './model'
import api, { SuccessResponse } from './responseHandler'

joi.string().validate({}).error

export const listUsersHander: RequestHandler<
  unknown,
  SuccessResponse<User[]>,
  unknown,
  { limit: string }
> = async (req, res) => {
  const { limit = '10' } = req.query
  const data = await userModel.listUser(parseInt(limit))
  res.json(api.ok(data))
}

const createUserValidationSchema = joi.object({
  login: joi.string().required(),
  password: joi
    .string()
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])/)
    .required(),
  age: joi.number().min(4).max(130).required(),
})

export const createUser: RequestHandler<
  unknown,
  SuccessResponse<User>,
  CreateBody
> = async (req, res, next) => {
  try {
    await createUserValidationSchema.validateAsync(req.body)
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const { login, password, age } = req.body
  const data = await userModel.createUser({ login, password, age })
  res.json(api.ok(data))
}

const getUserValidationSchema = joi.object({
  id: joi.string().required(),
})
export const getUser: RequestHandler<
  { id: string },
  SuccessResponse<User>
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await getUserValidationSchema.validateAsync({ id })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const data = await userModel.getUser(id)
  if (!data) {
    return res.status(404).json()
  }
  res.json(api.ok(data))
}

const updateUserValidationScheme = joi.object({
  id: joi.string().required(),
  password: joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])/),
  age: joi.number().min(4).max(130),
})
export const updateUser: RequestHandler<
  { id: string },
  SuccessResponse<User | undefined>,
  UpdateBody
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await updateUserValidationScheme.validateAsync(req.body)
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const { password, age } = req.body
  const data = await userModel.updateUser(id, { password, age })
  res.json(api.ok(data))
}

const deleteUserValidationSchema = joi.object({
  id: joi.string().required(),
})
export const deleteUserHandler: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const { id } = req.params
  try {
    await deleteUserValidationSchema.validateAsync({ id })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  try {
    const data = await userModel.deleteUser(id)
    res.json(api.ok(data))
  } catch (err: any) {
    next(new InternalServerError(err.message))
  }
}
