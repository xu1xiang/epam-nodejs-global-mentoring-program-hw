import { RequestHandler } from 'express'
import joi from 'joi'
import { BadRequestError, NotfoundError } from '../Errors'
import { groupModel } from '../models'
import api, { SuccessResponse } from '../responseHandler'

export const listGroupsHandler: RequestHandler<
  unknown,
  SuccessResponse<Model.Group[]>,
  unknown,
  { limit: string }
> = async (req, res) => {
  const { limit = '10' } = req.query
  const data = await groupModel.listGroups(parseInt(limit))
  res.json(api.ok(data))
}

const createGroupValidationSchema = joi.object({
  name: joi.string().required(),
  permissions: joi
    .array()
    .items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    .required(),
})

type CreateBody = Omit<Model.Group, 'id'>
export const createGroup: RequestHandler<
  unknown,
  SuccessResponse<Model.Group>,
  CreateBody
> = async (req, res, next) => {
  try {
    await createGroupValidationSchema.validateAsync(req.body)
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const { name, permissions } = req.body
  const data = await groupModel.createGroup({ name, permissions })
  res.json(api.ok(data))
}

const getGroupValidationSchema = joi.object({
  id: joi.string().required(),
})
export const getGroup: RequestHandler<
  { id: string },
  SuccessResponse<Model.Group>
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await getGroupValidationSchema.validateAsync({ id })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const data = await groupModel.getGroup(parseInt(id))
  if (!data) {
    return next(new NotfoundError())
  }
  res.json(api.ok(data))
}

type UpdateBody = Partial<Omit<Model.Group, 'id'>>
const updateGroupValidationScheme = joi.object({
  id: joi.string().required(),
  name: joi.string(),
  permissions: joi
    .array()
    .items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
})
export const updateGroup: RequestHandler<
  { id: string },
  SuccessResponse<Model.Group>,
  UpdateBody
> = async (req, res, next) => {
  const { id } = req.params
  try {
    await updateGroupValidationScheme.validateAsync({ id, ...req.body })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const { name, permissions } = req.body
  const data = await groupModel.updateGroup(parseInt(id), { name, permissions })
  if (!data) {
    return next(new NotfoundError())
  }
  res.json(api.ok(data))
}

const deleteGroupValidationSchema = joi.object({
  id: joi.string().required(),
})
export const deleteGroupHandler: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const { id } = req.params
  try {
    await deleteGroupValidationSchema.validateAsync({ id })
  } catch (err: any) {
    return next(new BadRequestError(err.message))
  }
  const succssed = await groupModel.deleteGroup(parseInt(id))
  if (!succssed) {
    return next(new NotfoundError())
  }
  res.json(api.ok(null))
}
