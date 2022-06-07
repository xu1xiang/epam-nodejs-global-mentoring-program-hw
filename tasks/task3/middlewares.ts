import { ErrorRequestHandler } from 'express'
import { BadRequestError, InternalServerError, NotfoundError } from './Errors'
import api from './responseHandler'
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof BadRequestError) {
    const json = api.badRequest(err.message)
    return res.status(json.code).json(json)
  }
  if (err instanceof NotfoundError) {
    const json = api.notfound()
    return res.status(json.code).json(json)
  }
  if (err instanceof InternalServerError) {
    const json = api.serverError(err.message)
    return res.status(json.code).json(json)
  }
  console.log(err)

  next()
}
