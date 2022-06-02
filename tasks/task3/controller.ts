import { RequestHandler } from 'express'
import joi from 'joi'
import { BadRequestError, NotfoundError } from './Errors'
import { userModel } from './models'
import api, { SuccessResponse } from './responseHandler'

export const listUsersHander: RequestHandler<
  unknown,
  SuccessResponse<Model.User[]>,
  unknown,
  { limit: string }
> = async (req, res) => {
  const { limit = '10' } = req.query
  const data = await userModel.listUsers(parseInt(limit))
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

type CreateBody = Omit<Model.User, 'id' | 'isDeleted'>
export const createUser: RequestHandler<
  unknown,
  SuccessResponse<Model.User>,
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
  SuccessResponse<Model.User>
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await getUserValidationSchema.validateAsync({ id })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const data = await userModel.getUser(parseInt(id))
  if (!data) {
    return next(new NotfoundError())
  }
  res.json(api.ok(data))
}

type UpdateBody = Partial<Omit<Model.User, 'id' | 'login' | 'isDeleted'>>
const updateUserValidationScheme = joi.object({
  id: joi.string().required(),
  password: joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])/),
  age: joi.number().min(4).max(130),
})
export const updateUser: RequestHandler<
  { id: string },
  SuccessResponse<Model.User>,
  UpdateBody
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await updateUserValidationScheme.validateAsync({ id, ...req.body })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const { password, age } = req.body
  const data = await userModel.updateUser(parseInt(id), { password, age })
  if (!data) {
    return next(new NotfoundError())
  }
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
  const succssed = await userModel.deleteUser(parseInt(id))
  if (!succssed) {
    return next(new NotfoundError())
  }
  res.json(api.ok(null))
}
