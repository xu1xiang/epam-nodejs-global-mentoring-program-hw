abstract class BaseResponse {
  abstract code: number
  abstract message: string
  abstract data: unknown | undefined
}

export class SuccessResponse<T = unknown> implements BaseResponse {
  code = 200
  message = 'success'
  constructor(public data: T) {}
}

export class BadRequestResponse implements BaseResponse {
  code = 400
  data = undefined
  constructor(public message = 'bad request') {}
}

export class NotfoundResponse implements BaseResponse {
  code = 404
  message = '404 not found'
  data = undefined
}

export class InternalServerErrorResponse implements BaseResponse {
  code = 500
  data = undefined
  constructor(public message = 'bad request') {}
}

const ok = <T>(data: T) => new SuccessResponse(data)

const badRequest = (message: string) => new BadRequestResponse(message)

const notfound = () => new NotfoundResponse()

const serverError = (message: string) =>
  new InternalServerErrorResponse(message)

const api = {
  ok,
  badRequest,
  notfound,
  serverError,
}

export default api
