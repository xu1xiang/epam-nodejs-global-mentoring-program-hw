export class BadRequestError extends Error {
  constructor(message = 'bad request') {
    super(message)
  }
}

export class NotfoundError extends Error {
  constructor(message = 'not found') {
    super(message)
  }
}

export class InternalServerError extends Error {
  constructor(message = 'internal server error') {
    super(message)
  }
}
